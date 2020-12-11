$.validator.addMethod('Login', function (value, ele, param) {
     

    const reg = /^.+@(qq|163)\.com$/
    if (reg.test(value)) {
      return true
    } else {
      return false
    }

  }, '请输入正确的账号')


  $('#login').validate({
    rules: {
     
      username: 'Login',
  
      password: {
        required: true,
        minlength: 5,
        maxlength: 12
      },
      repeat: {
        
        equalTo: "#password"
      }
    },
   
    messages: {
      
      password: {
        required: '请填写您的密码信息 -_-',
        minlength: '最少需要填写 5 个字符'
      }
      
    },
    
    submitHandler (form) {
     
      const info = $(form).serialize()

// 2-2. 发送请求到后端, 准备接受结果
      $.post('./server/login.php', info, null, 'json').then(res => {
// res 就是后端给我的结果
      console.log(res)

  // 3. 登录成功以后的操作
       if (res.code === 0) {
  // 登录失败
  $('.login_error').removeClass('hide')
} else if (res.code === 1) {
  // 3-2. 登录成功, 跳转页面, 存储 cookie
  // 为了在首页还需要使用
  setCookie('nickname', res.nickname,10)
  // 跳转页面
  window.location.href = './index.html'
}
})
      
      
      
    }
  })