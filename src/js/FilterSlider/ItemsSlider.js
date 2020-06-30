export default class ItemsSlider {
  constructor() {

    this.items = document.querySelector('.filter-window__items')
    this.item = this.items.querySelectorAll('.filter-window__item.is-visible')

    this.nav = {
      left: document.querySelector('.boxnav__item--prev'),
      right: document.querySelector('.boxnav__item--next')
    }

    this.ww = window.innerWidth
    this.isw = this.items.getBoundingClientRect().width
    this.iw = this.item[0].getBoundingClientRect().width
    this.start = (this.ww / 2 - this.iw / 2) 

    this.animation = false

    this.init()
  }


  init() {

    this.items.style.left = this.start + 'px'
    this.navigation()
  }

  navigation() {
    this.nav.left.addEventListener('click', () => {

      if (this.animation) return

      this.animation = true

      this.items.style.left = +window.getComputedStyle(this.items).getPropertyValue('left').replace('px', '') + this.iw + 'px'

      if (+window.getComputedStyle(this.items).getPropertyValue('left').replace('px', '') >= this.start)
        this.items.style.left = -(this.isw - (this.ww - ((this.ww - this.iw) / 2))) + 'px'

      setTimeout(() => {
        this.animation = false
      }, 700)
    })

    this.nav.right.addEventListener('click', () => {
      if (this.animation) return
      this.animation = true
      this.items.style.left = +window.getComputedStyle(this.items).getPropertyValue('left').replace('px', '') - this.iw + 'px'

      if (this.isw - -window.getComputedStyle(this.items).getPropertyValue('left').replace('px', '') <= this.ww - ((this.ww - this.iw) / 2))
        this.items.style.left = this.start + 'px'

      setTimeout(() => {
        this.animation = false
      }, 700)
    })
  }
}
