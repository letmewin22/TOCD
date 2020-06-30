import Slide from './Slide.js'
import Navigation from './Navigation.js'


// The Slideshow class.
export default class FilterSlideshow {

  constructor(el) {
    this.DOM = { el: el }
    this.init()
  }

  init() {

    this.navigation = new Navigation(this.DOM.el.parentNode.querySelector('.boxnav'), {
      next: () => this.navigate('right'),
      prev: () => this.navigate('left')
    })

    this.slides = []
    this.slidesHTML = [...this.DOM.el.querySelectorAll('.filter-slide.is-visible')]
    this.slidesHTML.forEach((slideEl, pos) => this.slides.push(new Slide(slideEl, {})))

    this.slidesTotal = this.slides.length

    this.navigation.setTotal(this.slidesTotal)


    if (this.slidesTotal < 2) {
      return false
    }

    this.current = 0

    this.slides[this.current].setCurrent()
  }

  destroy() {
    this.current = 0
    this.slidesTotal = this.slides.length

    this.slidesHTML.forEach(el => {
      el.setAttribute('style', '')
      el.classList.remove('filter-slide--current')
    })

    this.DOM.el.parentNode.querySelector('.boxnav').querySelector('.boxnav__label--current').innerText = '1'

    this.navigation.destroyMouseHandler()
  }

  navigate(direction) {
    if (this.isAnimating) return
    this.isAnimating = true
    document.documentElement.classList.add('animating')

    const nextSlidePos = direction === 'right' ?
      this.current < this.slidesTotal - 1 ? this.current + 1 : 0 :
      this.current > 0 ? this.current - 1 : this.slidesTotal - 1

    this.navigation.setCurrent(nextSlidePos+1, direction)

    Promise.all([this.slides[this.current].hide(direction), this.slides[nextSlidePos].show(direction)])
      .then(() => {
        // Update current.
        this.slides[this.current].setCurrent(false)
        this.current = nextSlidePos
        this.slides[this.current].setCurrent()
        this.isAnimating = false
        document.documentElement.classList.remove('animating')
      })
  }
}


