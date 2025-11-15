document.addEventListener('DOMContentLoaded', function() {
    const paymentAmount = document.getElementById('paymentAmount');
    const merchantName = document.getElementById('merchantName');
    const paymentTime = document.getElementById('paymentTime');
    const passwordUsed = document.getElementById('passwordUsed');
    const viewReportButton = document.getElementById('viewReport');
    const backToHomeButton = document.getElementById('backToHome');
    
    // 显示支付信息
    const testData = JSON.parse(localStorage.getItem('wechatPayTestData') || '{}');
    
    if (paymentTime) {
        const time = new Date(testData.paymentTime);
        paymentTime.textContent = time.toLocaleString('zh-CN');
    }
    
    // 查看报告按钮
    if (viewReportButton) {
        viewReportButton.addEventListener('click', function() {
            window.location.href = 'report.html';
        });
    }
    
    // 返回首页按钮
    if (backToHomeButton) {
        backToHomeButton.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
});
