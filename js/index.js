// 轮播图
    const b = new Banner('.cennerLb')

// 倒计时
    function timeDiff(t1, t2) {
      var t1Time = t1.getTime()
      var t2Time = t2.getTime()

    
      var sub = Math.round((t2Time - t1Time) / 1000)
      var day = Math.floor(sub / (60 * 60 * 24))
      var hours = Math.floor(sub % (60 * 60 * 24) / (60 * 60))
      var minutes = Math.floor(sub % (60 * 60) / 60)
      var seconds = sub % 60
      var obj = {
        day: day,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      }

      return obj
    }
   
    setInterval(function () {
     
      var time1 = new Date(2020, 11, 15, 00, 00, 00)
      var time2 = new Date()
      var sub = timeDiff(time2, time1)
      var str = '倒计时: ' + sub.day + ' 天 ' + sub.hours + ' 小时 ' + sub.minutes + ' 分钟 ' + sub.seconds + ' 秒'
    
      box.innerText = str
    }, 1000)



    
  $(function () {

  const nickname = getCookie('nickname')

  if (nickname) {
   
    $('.off').addClass('hide')
    $('.on').removeClass('hide').text(`欢迎您: ${nickname}`)

    setCartNum()
  } else {
 
    $('.off').removeClass('hide')
    $('.on').addClass('hide')
  }

  function setCartNum() {

    const cart = JSON.parse(window.localStorage.getItem('cart')) || []

    if (!cart.length) {
      $('.cartNum').html('0')
      return
    }

    
    let count = 0
    cart.forEach(item => count += item.cart_number - 0)
    $('.cartNum').html(count)
  }
})

