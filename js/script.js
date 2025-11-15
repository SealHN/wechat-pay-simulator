// 主页面逻辑
document.addEventListener('DOMContentLoaded', function() {
    const startPaymentButton = document.getElementById('startPayment');
    
    if (startPaymentButton) {
        startPaymentButton.addEventListener('click', function() {
            // 记录测试开始时间
            const testData = {
                startTime: new Date().toISOString(),
                status: '测试开始'
            };
            localStorage.setItem('wechatPayTestData', JSON.stringify(testData));
            
            // 跳转到支付页面
            window.location.href = 'payment.html';
        });
    }
});
