document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('backButton');
    const testInfo = document.getElementById('testInfo');
    const systemLogs = document.getElementById('systemLogs');
    const userPassword = document.getElementById('userPassword');
    const newTestButton = document.getElementById('newTest');
    const downloadReportButton = document.getElementById('downloadReport');
    
    // 获取测试数据
    const testData = JSON.parse(localStorage.getItem('wechatPayTestData') || '{}');
    
    // 填充测试信息
    if (testInfo) {
        const startTime = new Date(testData.startTime).toLocaleString('zh-CN');
        const paymentTime = new Date(testData.paymentTime).toLocaleString('zh-CN');
        
        testInfo.innerHTML = `
            <li>测试开始时间: ${startTime}</li>
            <li>支付完成时间: ${paymentTime}</li>
            <li>测试状态: ${testData.status || '完成'}</li>
            <li>测试结果: 成功</li>
        `;
    }
    
    // 填充系统日志
    if (systemLogs) {
        systemLogs.innerHTML = `
            <p>[${new Date(testData.startTime).toLocaleString('zh-CN')}] 测试开始</p>
            <p>[${new Date(testData.startTime).toLocaleString('zh-CN')}] 跳转到支付页面</p>
            <p>[${new Date(testData.paymentTime).toLocaleString('zh-CN')}] 用户输入支付密码</p>
            <p>[${new Date(testData.paymentTime).toLocaleString('zh-CN')}] 支付验证成功</p>
            <p>[${new Date().toLocaleString('zh-CN')}] 生成测试报告</p>
        `;
    }
    
    // 显示用户输入的密码
    if (userPassword) {
        userPassword.textContent = testData.password || '未记录';
    }
    
    // 返回按钮
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.history.back();
        });
    }
    
    // 开始新测试按钮
    if (newTestButton) {
        newTestButton.addEventListener('click', function() {
            localStorage.removeItem('wechatPayTestData');
            window.location.href = 'index.html';
        });
    }
    
    // 下载报告按钮
    if (downloadReportButton) {
        downloadReportButton.addEventListener('click', function() {
            downloadReport();
        });
    }
    
    // 下载报告功能
    function downloadReport() {
        const reportContent = `
微信支付模拟测试报告
========================

测试信息:
---------
测试开始时间: ${new Date(testData.startTime).toLocaleString('zh-CN')}
支付完成时间: ${new Date(testData.paymentTime).toLocaleString('zh-CN')}
测试状态: ${testData.status || '完成'}
测试结果: 成功

系统运行记录:
-----------
[${new Date(testData.startTime).toLocaleString('zh-CN')}] 测试开始
[${new Date(testData.startTime).toLocaleString('zh-CN')}] 跳转到支付页面
[${new Date(testData.paymentTime).toLocaleString('zh-CN')}] 用户输入支付密码
[${new Date(testData.paymentTime).toLocaleString('zh-CN')}] 支付验证成功
[${new Date().toLocaleString('zh-CN')}] 生成测试报告

用户输入:
--------
支付密码: ${testData.password || '未记录'}

报告生成时间: ${new Date().toLocaleString('zh-CN')}
        `;
        
        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `微信支付测试报告_${new Date().toISOString().slice(0, 10)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});
