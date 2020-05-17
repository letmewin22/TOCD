import filterPageHandler from './filterPageHandler'
import tab from './tabs'

export default class Filter {

  constructor(btn) {

    this.btn = btn
    this.headerName = document.querySelectorAll('.filter-window__item')
    this.filterBtn = document.querySelector('.navbar__filter-current')
    
    this.uniq = (a) => {
      return a.sort().filter(function(item, pos, ary) {
        return !pos || item !== ary[pos - 1]
      })
    }
  }

  render() {

    this.filterValues('city')
    this.filterValues('occupation')
    this.filterValues('key')

    this.filterItems = document.querySelectorAll('.tabs__item')

    this.btn.forEach(el => el.addEventListener('click', this.toggle.bind(this, el)))
    document.body.addEventListener('click', event => this.select(event))
    this.filterBtn.addEventListener('click', this.reset.bind(this))
  }


  filterValues(by) {

    const values = [...document.querySelectorAll(`[data-${by}]`)].map(el => {
      const value = el.getAttribute(`data-${by}`)
      return value
    })
    const valueHTML = this.uniq(values).map(el => {
      return `<div class="tabs__item by-${by}">${el}</div>`
    }).join('')
    document.querySelector(`.tab-${by}`).innerHTML = valueHTML
    document.querySelector('.tab-1').classList.add('is-active')
  }

  toggle(el) {

    el.classList.contains('open') ? this.close() : this.open()
  }

  open() {

    this.btn.forEach(el => el.classList.add('open'))
    document.querySelector('.filter').classList.add('open')
    document.querySelector('.navbar').classList.add('filter-open')

    window.addEventListener('resize', () => {
      if (screen.width < 1025) {
        tab()
      }
    })

    if (screen.width < 1025) {
      tab()
    }
  }

  close() {

    this.btn.forEach(el => el.classList.remove('open'))
    document.querySelector('.filter').classList.remove('open')
    document.querySelector('.navbar').classList.remove('filter-open')
  }

  filterHandler(selector, attribute) {

    selector.forEach(elem => {

      elem.classList.remove('is-visible', 'default-layout')
      this.filterBtn.querySelector('.name').innerText = event.target.innerText
      this.filterBtn.classList.add('active')

      document.querySelectorAll(`[${attribute}]`).forEach(element => {

        if (event.target.innerText === element.getAttribute(attribute)) {
          element.classList.add('is-visible')
          document.querySelectorAll('.is-visible').length
        }
      })
    })
  }

  select(event) {

    if (event.target.classList.contains('by-city')) {

      this.filterHandler(this.headerName, 'data-city')

      document.documentElement.classList.add('filtered')
      document.querySelector('.navbar').classList.add('is-filtered')
      document.querySelector('.filter').classList.add('is-filtered')
      filterPageHandler()
    } else if (event.target.classList.contains('by-occupation')) {

      this.filterHandler(this.headerName, 'data-occupation')

      document.documentElement.classList.add('filtered')
      document.querySelector('.navbar').classList.add('is-filtered')
      document.querySelector('.filter').classList.add('is-filtered')
      filterPageHandler()
    } else if (event.target.classList.contains('by-key')) {

      this.filterHandler(this.headerName, 'data-key')

      document.documentElement.classList.add('filtered')
      document.querySelector('.navbar').classList.add('is-filtered')
      document.querySelector('.filter').classList.add('is-filtered')
      filterPageHandler()
    }
  }

  reset() {

    this.filterBtn.querySelector('.name').innerText = ''
    this.filterBtn.classList.remove('active')

    this.headerName.forEach(elem => elem.classList.add('is-visible', 'default-layout'))
    document.documentElement.classList.remove('filtered')
    document.querySelector('.navbar').classList.remove('is-filtered')
    document.querySelector('.filter').classList.remove('is-filtered')

    filterPageHandler()
  }

}
