
$(function () {

  const nickname = getCookie('nickname')
  if (!nickname) return window.location.href = './login.html'

  
  const cart = JSON.parse(window.localStorage.getItem('cart')) || []

 
  if (!cart.length) {
    
    $('.on').addClass('hide')
    $('.off').removeClass('hide')
    return
  }

  
  $('.off').addClass('hide')
  $('.on').removeClass('hide')

  
  bindHtml()
  function bindHtml() {
    
    const selectAll = cart.every(item => item.is_select === '1')
    
    let total = 0
    let totalMoney = 0
    cart.forEach(item => {
      if (item.is_select === '1') {
        total += item.cart_number - 0
        totalMoney += item.cart_number * item.goods_price
      }
    })

    let str = `
    <div class="cart-table-header cenner">
    <input type="checkbox">全选
    <p>商品信息</p>
    <p>规格</p>
    <p>单价(元)</p>
    <p>数量</p>
    <p>小计</p>
    <p>操作</p>
</div>
    `

    cart.forEach(item => {
      str += `
        <li class="cartBox cenner">
          <div class="select">
            <input  class="checkbox"    data-id="${ item.goods_id }" type="checkbox" ${ item.is_select === '0' ? '' : 'checked' }>
            </div>
          <div class="goodsImg goods">
            <img src="${ item.goods_small_logo }" alt="">
            <p>${ item.goods_name }</p>
          </div>
          <div class="goodsDesc  goodsSize">
          ${ item.cat_id }
          </div>
          <div class="price goodsMoney">
            ￥ <span class="text-danger">${ item.goods_price }</span>
          </div>
          <div class="count goodsNub">
            <button class="subNum" data-id="${ item.goods_id }">-</button>
            <input type="text" value="${ item.cart_number }">
            <button class="addNum" data-id="${ item.goods_id }">+</button>
          </div>
          <div class="xiaoji goodsMoneys">
            ￥ <span class="text-danger">${ (item.goods_price * item.cart_number).toFixed(2) }</span>
          </div>

          <div class="operate">
            <button class="btn btn-danger del" data-id="${ item.goods_id }">删除</button>
          </div>
        </li>
      `
    })

    str += `
          </ul>
        </div>
        

      <div class="goodsFoot cenner">
        
        <div class="Checkout">去结算</div>
        <div class="Checkout" style="background-color: rebeccapurple;" ><a href="./list.html" style="color: white;">购物</a></div>
        <div class="CheckoutNum">总价 (含运费):¥<span>${ totalMoney.toFixed(2) }</span>
            <p>运费（以结算页为准）：¥0.00</p>
            <a>已选${ total }件</a>
        </div>
    </div>
    `

   
    $('.on').html(str)
  }

  
  $('.on').on('click', '.select > input', function () {
    
    const type = this.checked
   
    const id = $(this).data('id')
    
    const info = cart.filter(item => item.goods_id == id)[0]
    info.is_select = type ? '1' : '0'
   
    bindHtml()
   
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })


  $('.on').on('click', '.addNum', function () {

    const id = $(this).data('id')

    const info = cart.filter(item => item.goods_id == id)[0]

    info.cart_number = info.cart_number - 0 + 1

    bindHtml()

    window.localStorage.setItem('cart', JSON.stringify(cart))
  })


  $('.on').on('click', '.subNum', function () {

    const id = $(this).data('id')

    const info = cart.filter(item => item.goods_id == id)[0]
   
    if (info.cart_number === 1) return

    info.cart_number = info.cart_number - 0 - 1

    bindHtml()
 
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })


  $('.on').on('click', '.del', function () {

    const id = $(this).data('id')

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].goods_id == id) {
        cart.splice(i, 1)
        break
      }
    }


    bindHtml()

    window.localStorage.setItem('cart', JSON.stringify(cart))

    if (!cart.length) return window.location.reload()
  })
})



