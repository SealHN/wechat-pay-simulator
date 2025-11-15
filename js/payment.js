document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    const passwordDots = document.querySelectorAll('.password-dots .dot');
    const keys = document.querySelectorAll('.key:not(.empty)');
    const deleteKey = document.getElementById('deleteKey');
    const backButton = document.getElementById('backButton');
    
    let password = '';
    
    // 键盘按键处理
    keys.forEach(key => {
        key.addEventListener('click', function() {
            if (password.length < 6) {
                password += this.getAttribute('data-key');
                updatePasswordDots();
                
                // 如果密码输入完成，自动提交
                if (password.length === 6) {
                    processPayment();
                }
            }
        });
    });
    
    // 删除键处理
    deleteKey.addEventListener('click', function() {
        if (password.length > 0) {
            password = password.slice(0, -1);
            updatePasswordDots();
        }
    });
    
    // 更新密码点显示
    function updatePasswordDots() {
        passwordDots.forEach((dot, index) => {
            if (index < password.length) {
                dot.style.backgroundColor = '#09BB07';
            } else {
                dot.style.backgroundColor = '#333';
            }
        });
    }
    
    // 处理支付
    function processPayment() {
        // 记录支付信息
        const testData = JSON.parse(localStorage.getItem('wechatPayTestData') || '{}');
        testData.paymentTime = new Date().toISOString();
        testData.password = password;
        testData.status = '支付完成';
        localStorage.setItem('wechatPayTestData', JSON.stringify(testData));
        
        // 跳转到结果页面
        window.location.href = 'result.html';
    }
    
    // 返回按钮
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.history.back();
        });
    }
});
