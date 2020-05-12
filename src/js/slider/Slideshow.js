import Slide from './Slide.js'
import Navigation from './Navigation.js'


// The Slideshow class.
export default class Slideshow {
  constructor(el) {
    this.DOM = {el: el}
    this.navigation = new Navigation(document.querySelector('.boxnav'), {
      next: () => this.navigate('right'),
      prev: () => this.navigate('left')
    })

    this.DOM.detailsWrap = document.querySelector('.details-wrap')

    this.slides = []
    this.slidesHTML = [...this.DOM.el.querySelectorAll('.slide')]
    this.slidesHTML.forEach((slideEl,pos) => this.slides.push(new Slide(slideEl, {})))

    this.slidesTotal = this.slides.length


    if ( this.slidesTotal < 2 ) {
      return false
    }

    this.current = 0

    this.init()
  }

  init() {
    this.slides[this.current].setCurrent()
  }

  navigate(direction) {
    if ( this.isAnimating ) return
    this.isAnimating = true

    const nextSlidePos = direction === 'right' ? 
      this.current < this.slidesTotal-1 ? this.current+1 : 0 :
      this.current > 0 ? this.current-1 : this.slidesTotal-1


                
    Promise.all([this.slides[this.current].hide(direction), this.slides[nextSlidePos].show(direction)])
      .then(() => {
        // Update current.
        this.slides[this.current].setCurrent(false)
        this.current = nextSlidePos
        this.slides[this.current].setCurrent()
        this.isAnimating = false
      })
  }
}

  
