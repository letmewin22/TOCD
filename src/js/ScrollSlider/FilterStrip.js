export default class FilterStrip {

  constructor() {
    this.filterItems = document.querySelectorAll('.filter-window__item')

    this.setup()
  }

  setup() {
    this.filterItems.forEach(el => {
      const formula = window.innerWidth >= 460 ? (window.innerWidth /2 - el.getBoundingClientRect().width / 2) + window.innerWidth * 0.1 : window.innerWidth / 2 + el.getBoundingClientRect().width / 2
      if ( window.innerWidth >= 460) {
        if (el.getBoundingClientRect().x < formula && el.getBoundingClientRect().x > window.innerWidth * 0.15) {
          el.classList.add('active')
        } else {
          el.classList.remove('active')
        }
      }else {
        if (el.getBoundingClientRect().x < formula && el.getBoundingClientRect().x > 0) {
          el.classList.add('active')
        } else {
          el.classList.remove('active')
        }
      }
    })
  }
}
