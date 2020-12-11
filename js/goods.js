


$(function () {


  let info = null
  const id = getCookie('goods_id')
  getGoodsInfo()
  async function getGoodsInfo() {
    const goodsInfo = await $.get('./server/getGoodsInfo.php', { goods_id: id }, null, 'json')
    bindHtml(goodsInfo.info)
    info = goodsInfo.info
    
  }

  function bindHtml(info) {
    
    $('.box').html(`
      <div class="show">
      <img src="${ info.goods_big_logo }"  alt="">
      <div class="mask"></div>
    </div>
    <div class="list">
      <p class="active">
        <img src="${ info.goods_small_logo }" show="${ info.goods_big_logo }" enlarge="${ info.goods_big_logo }" alt="">
      </p>
      
    </div>
    <div class="enlarge" style="background-image: url(${ info.goods_big_logo });"></div>
    `)
    
class Enlarge{
constructor(ele) {

  this.ele = document.querySelector(ele)
  this.show = this.ele.querySelector('.show')
  this.mask = this.ele.querySelector('.mask')
  this.enlarge = this.ele.querySelector('.enlarge')
  this.show_width = this.show.clientWidth
  this.show_height = this.show.clientHeight
  this.enlarge_width = parseInt(window.getComputedStyle(this.enlarge).width)
  this.enlarge_height = parseInt(window.getComputedStyle(this.enlarge).height)
  this.bg_width = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[0])
  this.bg_height = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[1])
  this.list = this.ele.querySelector('.list')

  this.init()
}

init = function () {

  this.setScale()
  this.overOut()
  this.move()
  this.change()
}

setScale = function () {

  this.mask_width = this.show_width * this.enlarge_width / this.bg_width
  this.mask_height = this.show_height * this.enlarge_height / this.bg_height

  this.mask.style.width = this.mask_width + 'px'
  this.mask.style.height = this.mask_height + 'px'
}


overOut = function () {
  
  this.show.addEventListener('mouseover', () => {
    this.mask.style.display = 'block'
    this.enlarge.style.display = 'block'
  })

  this.show.addEventListener('mouseout', () => {
    this.mask.style.display = 'none'
    this.enlarge.style.display = 'none'
  })
}

move = function () {
 
  this.show.addEventListener('mousemove', e => {
    
    e = e || window.event
   
    let x = e.offsetX - this.mask_width / 2
    let y = e.offsetY - this.mask_height / 2

    if (x <= 0) x = 0
    if (y <= 0) y = 0
    if (x >= this.show_width - this.mask_width) x = this.show_width - this.mask_width
    if (y >= this.show_height - this.mask_height) y = this.show_height - this.mask_height

    this.mask.style.left = x + 'px'
    this.mask.style.top = y + 'px'

    const bg_x = this.enlarge_width * x / this.mask_width
    const bg_y = this.enlarge_height * y / this.mask_height

    this.enlarge.style.backgroundPosition = `-${ bg_x }px -${ bg_y }px`
  })

}

change = function () {

  this.list.addEventListener('click', e => {
    e = e || window.event
    const target = e.target || e.srcElement

    if (target.nodeName === 'IMG') {
  
      const show_url = target.getAttribute('show')
      const enlarge_url = target.getAttribute('enlarge')

      this.show.firstElementChild.src = show_url
      this.enlarge.style.backgroundImage = `url(${ enlarge_url })`

      for (let i = 0; i < this.list.children.length; i++) {
        this.list.children[i].classList.remove('active')
      }

      target.parentElement.classList.add('active')
    }
  })
}
}
const e1 = new Enlarge('#box1')

    $('.right').html(`
    <h4>${ info.goods_name }</h4>
    <p>冬日囤货暖心季，专区满${ info.goods_price *1.5}减${ parseInt(info.goods_price *0.4)}！  <a href="###">【爆款零食300减210！！点击进入】</a></p>
    <div class="_cenner">
        <h3>苏宁秒杀</h3>
        <p>月销:${ info.goods_number }份</p>
    </div>
    <div class="_foot"><img src="./images/限时.gif" alt="">
    <img src="./images/二维码.jpg" alt="" class="img">
    <p><span>参考价:</span><del>¥${ info.goods_price *1.5}</del></p>
    <p class="_footText"><span>活动价:</span><a>¥${ info.goods_price }</a></p>
    </div>
    <div class="_footer" >
        <ul>
            <li class="One">优惠

                <p>满199-120</p>
                <p>一件八折</p>
                <p>两件七折</p>
                <p>三件六折</p>
            </li>
            <li class="Two">品类
                <p>${ info.cat_id }</p>
                <p>${ info.cat_id }</p>
                <p>${ info.cat_id }</p>
                <p>${ info.cat_id }</p>

                </li>
                <li>数量
                <div class="Three" >
                <button class="subNum">-</button>
                <input type="number" value="1" class="cartNum">
                <button class="addNum">+</button>
                <p class="addCart">加入购物车</p>
                <p><a class="goodsGo" href="./cart.html">购物车</a></p>
            </div>
                </li>
            </ul>
    `)
      
  }


  $('.goodsBox').on('click', '.addCart', function () {
   
    const cart = JSON.parse(window.localStorage.getItem('cart')) || []

    console.log(cart)
    const flag = cart.some(item => item.goods_id === id)
   
    if (flag) {
    
      const cart_goods = cart.filter(item => item.goods_id === id)[0]
      cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartNum').val() - 0)
    } else {
      info.cart_number = 1
    
      cart.push(info)
    }

    window.localStorage.setItem('cart', JSON.stringify(cart))
  })

  
  $('.goodsBox')
    .on('click', '.subNum', function () {
      let num = $('.cartNum').val() - 0
     
      if (num === 1) return
    
      $('.cartNum').val(num - 1)
    })
    .on('click', '.addNum', function () {
      let num = $('.cartNum').val() - 0
      $('.cartNum').val(num + 1)
    })





  })
  
