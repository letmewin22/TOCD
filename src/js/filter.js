import { TimelineMax, Power1, Power4 } from 'gsap'
import ScrollSlider from './ScrollSlider/ScrollSlider'
import imagesLoaded from 'imagesloaded'
import FilterStrip from './ScrollSlider/FilterStrip'
import Clock from './ScrollSlider/Clock'

export default class Filter {

  constructor() {

    this.headerName = document.querySelectorAll('.filter-window__item')
    this.filterBtn = document.querySelector('.navbar__filter-current')

    this.uniq = (a) => {
      return a.sort().filter(function(item, pos, ary) {
        return !pos || item !== ary[pos - 1]
      })
    }

    this.func = () => {
      new FilterStrip()
    }

  }

  render() {

    this.filterValues('city')
    this.filterValues('occupation')

    this.filterItems = document.querySelectorAll('.tabs__item')

    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) this.toggle()
    })
    document.querySelectorAll('.filter-window__item').forEach(el => el.addEventListener('click', () => {
      document.querySelector('.filter-window').style.opacity = '0'
      setTimeout(() => this.reset(), 500)
    }))
    document.querySelectorAll('.navbar__link').forEach(el => el.addEventListener('click', this.reset.bind(this)))
    document.body.addEventListener('click', event => this.select(event))
    this.filterBtn.addEventListener('click', this.reset.bind(this))

  }


  filterValues(by) {

    const values = [...document.querySelectorAll(`[data-${by}]`)].map(el => {
      const value = el.getAttribute(`data-${by}`).trim()
      return value
    })
    const valueHTML = this.uniq(values).map(el => {
      return `<div class="tabs__item by-${by}">${el}</div>`
    }).join('')
    document.querySelector(`.tab-${by}`).innerHTML = valueHTML
    document.querySelector('.tab-1').classList.add('is-active')
  }

  toggle() {
    document.querySelector('.navbar__filter-btn').classList.contains('open') ? this.close() : this.open()
  }

  open() {

    document.querySelectorAll('.navbar__filter-btn').forEach(el => el.classList.add('open'))
    document.querySelector('.filter').classList.add('open')
    document.documentElement.classList.add('e-fixed')

    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    const tl = new TimelineMax()
    tl
      .to(document.querySelector('.filter'), 1, {
        y: '0%', ease: Power4.easeOut, onComplete: () => {
          document.querySelector('.navbar').classList.add('filter-open')
        }
      }, 0)
      .to(document.querySelector('.navbar__filter-btn'), 1, {rotation: 360, ease: Power4.easeOut}, 0)
      .staggerFromTo(document.querySelectorAll('.tab'), 1, {y: -50, opacity: 0}, {y: 0, opacity: 1}, 0.2, 0.9)
      .staggerFromTo(document.querySelectorAll('.tabs__nav-item'), 1, {y: -50, opacity: 0}, {y: 0, opacity: 1}, 0.2, 0.9)
      .fromTo(document.querySelectorAll('.filter__left h2'), 1, {y: -70, opacity: 0}, {y: 0, opacity: 1}, 0.8)
      .fromTo(document.querySelector('.filter .container'), 1, { opacity: 0 }, { opacity: 1, ease: Power1.easeOut }, 0.8)
  }

  close() {
    document.documentElement.classList.remove('e-fixed')
    document.querySelectorAll('.navbar__filter-btn').forEach(el => el.classList.remove('open'))
    document.querySelector('.navbar').classList.remove('filter-open')

    const tl2 = new TimelineMax({
      onComplete: () => {
        document.querySelector('.filter').classList.remove('open')
      }
    })
    tl2
      .staggerFromTo(document.querySelectorAll('.tab'), 1, {y: 0, opacity: 1}, {y: -50, opacity: 0}, 0.2)
      .staggerFromTo(document.querySelectorAll('.tabs__nav-item'), 1, {y: 0, opacity: 1}, {y: -50, opacity: 0}, 0.2, 0)
      .fromTo(document.querySelectorAll('.filter__left h2'), 1, {y: 0, opacity: 1}, {y: -70, opacity: 0}, 0.1)
      .to(document.querySelector('.filter .container'), 0.5, { opacity: 0, ease: Power1.easeOut })
      .to(document.querySelector('.navbar__filter-btn'), 1, {rotation: 0, ease: Power4.easeOut}, 0)
      .to(document.querySelector('.filter'), 1, { y: '-100%', ease: Power4.easeOut }, 1)
  }

  filterHandler(selector, attribute) {

    selector.forEach((elem, i) => {

      elem.classList.remove('is-visible', 'default-layout', 'active') 
      elem.parentNode.parentNode.querySelectorAll('.filter-window__image')[i].classList.remove('is-visible', 'active')

      this.filterBtn.querySelector('.name').innerText = event.target.innerText
      this.filterBtn.classList.add('active')
    })
    document.querySelectorAll(`.filter-window__item[${attribute}]`).forEach((element, index) => {

      if (event.target.innerText.trim('') === element.getAttribute(attribute).trim('')) {
        element.classList.add('is-visible')

        element.parentNode.parentNode.querySelectorAll('.filter-window__image')[index].classList.add('is-visible')
        document.querySelectorAll('.is-visible').length
      }
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
    document.querySelector('.filter-window__loader').style.opacity = 1
    document.querySelector('.filter-window__loader').style.display = 'flex'
    this.imgs = document.querySelectorAll('.filter-window__image.is-visible')
    this.imgs.forEach(el => {

      const src = el.getAttribute('data-bglazy')
      el.style.backgroundImage = `url(${src})`
    })

  }

  loader() {

    imagesLoaded(this.imgs, { background: true }, () => {

      document.querySelector('.filter-window__loader').style.opacity = 0
      setTimeout(() => {
        document.querySelector('.filter-window__loader').style.display = 'none'
        document.querySelector('.filter-window__items').style.opacity = '1'
        document.querySelector('.filter-window__images-wrapper').style.opacity = '1'
      }, 300)
    })
  }

  filteredOpen() {

    this.close()
    this.lazyLoad()
    this.loader()
    document.querySelector('.site-wrapper').classList.add('e-fixed')
    document.querySelector('.navbar').classList.remove('bg')
    document.querySelector('.navbar').classList.remove('interview-page')
    let vh = window.innerHeight * 0.01
    document.querySelector('.site-wrapper').style.setProperty('--vh', `${vh}px`)

    document.querySelector('.filter-window').style.display = 'flex'
    document.querySelector('.filter-window').style.opacity = '1'
    document.querySelector('.navbar').style.position = 'fixed'
    document.querySelector('.navbar').classList.add('filter-window-open')

    if (screen.width > 1024) document.querySelectorAll('.navbar__link').forEach(el => el.classList.add('white'))

    if (document.querySelectorAll('.filter-window__item.is-visible').length > 1) {
      const filterSlider = new ScrollSlider(document.querySelector('.filter-window__items'), false, this.func)
      filterSlider.render()
    } else {
      document.querySelector('.filter-window__items').style.transfrom = 'translate(0,0)'
      document.querySelector('.filter-window__item.is-visible').classList.add('active')
    }
  }

  filteredClose() {
    document.querySelector('.site-wrapper').classList.remove('e-fixed')
    document.body.style.overflow = 'auto'
    document.body.style.height = 'auto'
    document.body.style.width = 'auto'

    if (document.querySelector('[data-router-view]').getAttribute('data-router-view') === 'main') {
      const clock = new Clock(document.querySelector('.header__names .container'), true)
      clock.render()
    } else if(document.querySelector('[data-router-view]').getAttribute('data-router-view') === 'interview') {
      document.querySelector('.navbar').classList.add('interview-page')
    } else {
      document.querySelector('.navbar').style.position = 'absolute'
    }
    document.querySelector('.filter-window').style.opacity = '0'
    document.querySelector('.filter-window__items').style.opacity = '0'
    document.querySelector('.filter-window__images-wrapper').style.opacity = '0'
    document.querySelector('.navbar').classList.remove('filter-window-open')
    if (screen.width > 1024) document.querySelectorAll('.navbar__link').forEach(el => el.classList.remove('white'))
    setTimeout(() => document.querySelector('.filter-window').style.display = 'none', 500)

  }

}

