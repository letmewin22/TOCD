import imagesLoaded from 'imagesloaded'
import FilterSlideshow from './FilterSlider/FilterSlideshow'
import FilterAnimation from './FilterAnimation'
import {TweenMax} from 'gsap'

export default class Filter {

  constructor() {

    this.headerName = document.querySelectorAll('.filter-window .filter-window__item')
    this.filterBtn = document.querySelector('.navbar__filter-current')

    this.uniq = (a) => {
      return a.sort().filter(function(item, pos, ary) {
        return !pos || item !== ary[pos - 1]
      })
    }

    this.slideshow = new FilterSlideshow(document.querySelector('.filter-slideshow'))
    this.animations = new FilterAnimation()

  }

  render() {

    this.filterValues('city')
    this.filterValues('occupation')

    this.filterItems = document.querySelectorAll('.tabs__item')

    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) this.toggle()
    })
    this.headerName.forEach(el => el.addEventListener('click', () => {
      TweenMax.to(document.querySelector('.filter-window__images-wrapper'), 0.5, {opacity: 0})
      TweenMax.to(document.querySelector('.filter-window__items'), 0.5, {opacity: 0, onComplete: () => {
        
        setTimeout(() => {
          document.querySelector('.filter-window').style.opacity = 0
          setTimeout(() => {
            this.reset()
            document.querySelector('.filter-window__items').style.opacity = '1'
            document.querySelector('.filter-window__images-wrapper').style.opacity = '1'
          }, 500)
        }, 100)

      }})
    }))
    document.querySelectorAll('.navbar__link').forEach(el => el.addEventListener('click', this.reset.bind(this)))
    document.body.addEventListener('click', event => this.select(event))
    this.filterBtn.addEventListener('click', this.reset.bind(this))

    document.querySelector('.navbar__logo').addEventListener('click', () => {
      this.close()
      this.filteredClose()
    })

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
    this.reset()
    this.filteredClose()

    document.documentElement.classList.remove('e-fixed')
    document.querySelectorAll('.navbar__filter-btn').forEach(el => el.classList.remove('open'))
    document.querySelector('.navbar').classList.remove('filter-open')

    document.querySelectorAll('.navbar__filter-btn').forEach(el => el.classList.add('open'))
    document.querySelector('.filter').classList.add('open')
    document.documentElement.classList.add('e-fixed')

    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    this.animations.open()
  }

  close(cb) {
    document.documentElement.classList.remove('e-fixed')
    document.querySelectorAll('.navbar__filter-btn').forEach(el => el.classList.remove('open'))
    document.querySelector('.navbar').classList.remove('filter-open')

    this.animations.close(cb)
  }

  filterHandler(selector, attribute) {

    selector.forEach((elem, i) => {

      elem.classList.remove('is-visible', 'default-layout', 'active') 
      elem.parentNode.parentNode.querySelectorAll('.filter-slide')[i].classList.remove('is-visible', 'active')
      
      

      this.filterBtn.querySelector('.name').innerText = event.target.innerText
      this.filterBtn.classList.add('active')
    })
    document.querySelectorAll(`.filter-window__item[${attribute}]`).forEach((element, index) => {

      if (event.target.innerText.trim('') === element.getAttribute(attribute).trim('')) {
        element.classList.add('is-visible')

        element.parentNode.parentNode.querySelectorAll('.filter-slide')[index].classList.add('is-visible')
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
    document.querySelectorAll('.filter-window__text').forEach(el => el.style.opacity = '1')
    document.querySelector('.navbar').classList.remove('is-filtered')
    document.querySelector('.filter').classList.remove('is-filtered')
    window.scrollTo(0, 0)
    this.filteredClose()
  }

  lazyLoad() {
    document.querySelector('.filter-window__loader').style.opacity = 1
    document.querySelector('.filter-window__loader').style.display = 'flex'
    this.imgs = document.querySelectorAll('.filter-slide.is-visible .filter-slide__img')
    this.imgs.forEach(el => {

      const src = el.getAttribute('data-bglazy')
      el.style.backgroundImage = `url(${src})`
    })

  }

  loader() {

    imagesLoaded(this.imgs, { background: true }, () => {

      document.querySelector('.filter-window__loader').style.opacity = 0
      this.animations.loading()
    })
  }

  filteredOpen() {
    this.filteredClose()
    this.slideshow.init()
    this.close(() => {
      this.lazyLoad()
      this.loader()
    })
    document.querySelector('.site-wrapper').classList.add('e-fixed')
    document.querySelector('.navbar').classList.remove('bg')
    document.querySelector('.navbar').classList.remove('interview-page')
    screen.width < 460 && document.querySelector('.navbar').classList.add('white')
    let vh = window.innerHeight * 0.01
    document.querySelector('.site-wrapper').style.setProperty('--vh', `${vh}px`)
    document.querySelector('.filter-window').style.setProperty('--vh', `${vh}px`)

    window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01
      document.querySelector('.site-wrapper').style.setProperty('--vh', `${vh}px`)
      document.querySelector('.filter-window').style.setProperty('--vh', `${vh}px`)
    })

    document.querySelector('.filter-window').style.visibility = 'visible'
    document.querySelector('.filter-window').style.opacity = '1'
    // document.querySelector('.navbar').style.position = 'fixed'
    // document.querySelector('.navbar').classList.add('filter-window-open')

    // if (screen.width > 1024) document.querySelectorAll('.navbar__link').forEach(el => el.classList.add('white'))
  }

  filteredClose() {
    this.slideshow.destroy()
    document.querySelector('.site-wrapper').classList.remove('e-fixed')

    if(document.querySelector('[data-router-view]').getAttribute('data-router-view') === 'interview') {
      document.querySelector('.navbar').classList.add('interview-page')
    } else if (document.querySelector('[data-router-view]').getAttribute('data-router-view') === 'main') {
      document.querySelector('.navbar').style.position = 'fixed'
    } else {
      document.querySelector('.navbar').style.position = 'absolute'
    }
    document.querySelector('.filter-window').style.opacity = '0'
    document.querySelector('.filter-window__items').style.opacity = '0'
    document.querySelector('.filter-window__images-wrapper').style.opacity = '0'
    document.querySelector('.navbar').classList.remove('filter-window-open')
    screen.width < 460 && document.querySelector('.navbar').classList.remove('white')
    if (screen.width > 1024) document.querySelectorAll('.navbar__link').forEach(el => el.classList.remove('white'))
    // setTimeout(() => document.querySelector('.filter-window').style.display = 'none', 500)
    document.querySelector('.filter-window').style.visibility = 'hidden'
  }

}

