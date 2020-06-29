export default class FilterStrip {

  constructor() {
    this.filterItems = document.querySelectorAll('.filter-window__item.is-visible')
    this.count = 0
    this.setup()
  }

  setup() {

    this.filterItems.forEach(el => {

      const formula = window.innerWidth / 2 + el.getBoundingClientRect().width / 2

      if (el.getBoundingClientRect().x < formula && el.getBoundingClientRect().x > 0)
        el.classList.add('active')
      else
        el.classList.remove('active')
    })
  }
}
