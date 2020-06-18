export default class FilterStrip {

  constructor() {
    this.filterItems = document.querySelectorAll('.filter-window__item.is-visible')
    this.imgs = document.querySelectorAll('.filter-window__image.is-visible')
    this.count = 0
    this.setup()
  }

  setup() {

    this.filterItems.forEach((el, index) => {

      const formula = window.innerWidth / 2 + el.getBoundingClientRect().width / 2

      if (el.getBoundingClientRect().x < formula && el.getBoundingClientRect().x > 0) {
        if(screen.width < 460)
          this.imgs[index].classList.add('active')
        else
          setTimeout(() => {
            this.imgs[index].classList.add('active')
          }, 250)
        el.classList.add('active')
      }
      else {
        el.classList.remove('active')
        this.imgs[index].classList.remove('active')
      }
    })
  }
}
