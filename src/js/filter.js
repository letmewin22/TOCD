import tab from './tabs'
import { TimelineMax, Power2 } from 'gsap'
import clock from './ScrollSlider/clockInstance'
import ScrollSlider from './ScrollSlider/ScrollSlider'
import imagesLoaded from 'imagesloaded'

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
    document.querySelectorAll('.filter-window__item').forEach(el => el.addEventListener('click', () => {
      document.querySelector('.filter-window').style.opacity = '0'
      setTimeout(() => this.reset(), 500)
    }))
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
      this.filteredOpen()
    } else if (event.target.classList.contains('by-occupation')) {

      this.filterHandler(this.headerName, 'data-occupation')

      document.documentElement.classList.add('filtered')
      document.querySelector('.navbar').classList.add('is-filtered')
      document.querySelector('.filter').classList.add('is-filtered')
      this.filteredOpen()
    } else if (event.target.classList.contains('by-key')) {

      this.filterHandler(this.headerName, 'data-key')

      document.documentElement.classList.add('filtered')
      document.querySelector('.navbar').classList.add('is-filtered')
      document.querySelector('.filter').classList.add('is-filtered')
      this.filteredOpen()
    }
  }

  reset() {

    this.filterBtn.querySelector('.name').innerText = ''
    this.filterBtn.classList.remove('active')

    this.headerName.forEach(elem => elem.classList.add('is-visible', 'default-layout'))
    document.documentElement.classList.remove('filtered')
    document.querySelector('.navbar').classList.remove('is-filtered')
    document.querySelector('.filter').classList.remove('is-filtered')
    window.scrollTo(0, 0)
    this.filteredClose()
  }

  lazyLoad() {
    this.imgs = document.querySelectorAll('.filter-window__item.is-visible .filter-window__image')
    this.imgs.forEach(el => {

      const src = el.getAttribute('data-bglazy')
      el.style.backgroundImage = `url(${src})`
    })

  }

  loader() {
    const tl = new TimelineMax({ repeat: -1 })
    tl
      .fromTo(
        document.querySelector('.filter-window__loader svg'),
        1.4,
        { strokeDashoffset: 0 },
        { strokeDashoffset: -3141.276123046875, ease: Power2.easeInOut },
        0
      )
      .fromTo(
        document.querySelector('.filter-window__loader svg'),
        1.4,
        { strokeDashoffset: 3141.276123046875 },
        { strokeDashoffset: 0, ease: Power2.easeInOut }
      )
    imagesLoaded(this.imgs, { background: true }, () => {

      tl.kill()
      document.querySelector('.filter-window__loader').style.opacity = 0
      setTimeout(() => {
        document.querySelector('.filter-window__loader').style.display = 'none'
        document.querySelector('.filter-window__items').style.opacity = '1'
      }, 300)
    })
  }

  filteredOpen() {
    
    this.filterSlider = new ScrollSlider(document.querySelector('.filter-window__items'))
    this.close()
    this.lazyLoad()
    this.loader()
    document.querySelector('.filter-window').style.display = 'flex'
    document.querySelector('.filter-window').style.opacity = '1'
    document.querySelector('.navbar').style.position = 'fixed'

    if (document.querySelector('[data-router-view]').getAttribute('data-router-view') === 'main') {
      clock.destroy()
      this.filterSlider.render()
    } else {
      this.filterSlider.render()
    }
  }

  filteredClose() {
    
    if (document.querySelector('[data-router-view]').getAttribute('data-router-view') === 'main') {
      this.filterSlider.destroy()
      clock.render()
    } else {
      this.filterSlider.destroy()
      document.querySelector('.navbar').style.position = 'absolute'
    }
    document.querySelector('.filter-window').style.opacity = '0'
    setTimeout(() => document.querySelector('.filter-window').style.display = 'none', 500)
    
  }

}

