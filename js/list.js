


$(function () {


  let list = null


  const list_info = {
    cat_one: 'all',
  
    sort_method: '综合',
    sort_type: 'ASC',
    current: 1,
    pagesize: 12
  }

  // 1. 请求一级分类列表
  getCateOne()
  async function getCateOne() {
    // 1-2. 发送请求获取
    const cat_one_list = await $.get('./server/getCateOne.php', null, null, 'json')

    // 1-3. 进行列表渲染
    let str = `<span data-type="all" class="active">全部</span>`

    cat_one_list.list.forEach(item => {
      str += `
        <span data-type="${ item.cat_one_id }">${ item.cat_one_id }</span>
      `
    })

    $('.cateOneBox > .right').html(str)
    
  }


  

  // 2. 请求总页数, 回来渲染分页器
  getTotalPage()
  async function getTotalPage() {

    const totalInfo = await $.get('./server/getTotalPage.php', list_info, null, 'json')

 
    $('.pagination').pagination({
      pageCount: totalInfo.total,
      callback (index) {
        list_info.current = index.getCurrent()

        getGoodsList()
      }
    })
  }

  // 3. 请求商品列表数据
  getGoodsList()
  async function getGoodsList() {

    const goodsList = await $.get('./server/getGoodsList.php', list_info, null, 'json')

    list = goodsList.list

    let str = ''
    goodsList.list.forEach(item => {
      str += `
      <div class="goods" data-id="${ item.goods_id }">
      <img src="${ item.goods_big_logo }" alt="">
      <p>${ item.goods_name }</p>
      <div class="goodsText">
          <p>¥${ item.goods_price }</p>
          <del>¥ ${ (item.goods_price)* 1.5 }</del>
          <h5>立即抢购</h5>
          <img src="./images/立即抢购.png" alt="">
      </div>
      </div>
      `
    })
    $('.goodsBox > .goodsbox').html(str)
  }

  // 4. 一级分类点击事件
  $('.cateOneBox').on('click', 'span', function () {
   
    $(this).addClass('active').siblings().removeClass('active')

    
    const type = $(this).data('type')

    
  
    list_info.current = 1


    list_info.cat_one = type
    getTotalPage()
    getGoodsList()
    $('.catThreeBox .right').html('<span data-type="all" class="active">全部</span>')

    
  })

  

  // 7. 排序方式的点击事件
  $('.goodsList1Box').on('click', 'span', function () {
   
    const method = $(this).attr('data-method')
    const type = $(this).attr('data-type')

    $(this).addClass('active').siblings().removeClass('active')

    list_info.sort_method = method
    list_info.sort_type = type


    getTotalPage()
    getGoodsList()

    $(this)
      .attr('data-type', type === 'ASC' ? 'DESC' : 'ASC')
      .siblings()
      .attr('data-type', 'ASC')
  })

  $('.goodsBox .goodsbox').on('click', '.goods', function () {
    
    const id = $(this).data('id')
    
    
    setCookie('goods_id', id)
   
    window.location.href = './goods.html'
  })

  // 10. 加入购物车的操作
  $('.goodsList').on('click', '.addCart', function () {
    // 4-2. 拿到 localStorage 里面有没有数组
    const cart = JSON.parse(window.localStorage.getItem('cart')) || []

   
    const id = $(this).data('id')

    
    const flag = cart.some(item => item.goods_id == id)
    if (flag) {
    
      const cart_goods = cart.filter(item => item.goods_id == id)[0]
      cart_goods.cart_number = cart_goods.cart_number - 0 + 1
    } else {
     
      const info = list.filter(item => item.goods_id == id)[0]
      info.cart_number = 1
      cart.push(info)
    }

   
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })

})
