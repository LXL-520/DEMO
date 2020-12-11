

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