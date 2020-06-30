export default class ItemsSlider {

  constructor() {
    this.counter = 0
    this.animation = false
  }

  init() {

    this.items = document.querySelector('.filter-window__items')
    this.item = [...document.querySelectorAll('.filter-window__item.is-visible')]

    this.params = {
      ww: window.innerWidth,
      isw: this.items.getBoundingClientRect().width,
      iw: this.item[0].getBoundingClientRect().width
    }

    this.start = (this.params.ww / 2 - this.params.iw / 2)

    this.items.style.left = this.start + 'px'
    this.watcher(this.counter)
  }

  watcher(num) {
    this.item.forEach(el => el.classList.remove('active'))
    this.item[num].classList.add('active')
  }

  prev() {

    if (this.animation) return

    this.animation = true
    this.counter--

    const currentPos = +window.getComputedStyle(this.items).getPropertyValue('left').replace('px', '')

    this.items.style.left = currentPos + this.params.iw + 'px'

    if (+currentPos >= this.start) {
      this.counter = this.item.length - 1
      this.items.style.left = -(this.params.isw - (this.params.ww - ((this.params.ww - this.params.iw) / 2))) + 'px'
    }
    
    this.watcher(this.counter)

    setTimeout(() => {
      this.animation = false
    }, 700)
  }

  next() {

    if (this.animation) return

    this.animation = true
    this.counter++

    const currentPos = +window.getComputedStyle(this.items).getPropertyValue('left').replace('px', '')

    this.items.style.left = currentPos - this.params.iw + 'px'

    if (this.params.isw - -currentPos <= this.params.ww - ((this.params.ww - this.params.iw) / 2)) {
      this.items.style.left = this.start + 'px'
      this.counter = 0
    }

    this.watcher(this.counter)

    setTimeout(() => {
      this.animation = false
    }, 700)
  }
}
