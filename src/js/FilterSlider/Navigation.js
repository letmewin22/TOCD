import swipedetect from '../lib/swipe'
import { TweenMax } from 'gsap'
// The navigation class. Controls the .boxnav animations (e.g. pagination animation).
export default class Navigation {
  constructor(el, settings) {
    this.DOM = { el: el }

    this.settings = {
      next: () => { return false },
      prev: () => { return false }
    }

    Object.assign(this.settings, settings)

    // Navigation controls (prev and next)
    this.DOM.prevCtrl = this.DOM.el.querySelector('.boxnav__item--prev')
    this.DOM.nextCtrl = this.DOM.el.querySelector('.boxnav__item--next')

    this.DOM.pagination = {
      current: this.DOM.el.querySelector('.boxnav__label--current'),
      total: this.DOM.el.querySelector('.boxnav__label--total')
    }

    this.mouseHandler = (event) => {
      this.mouseEvents(event)
    }
    // The current and total pages elements.
    this.initEvents()
  }

  setCurrent(val, direction) {
    //this.DOM.pagination.current.innerHTML = val;
    TweenMax.to(this.DOM.pagination.current, 0.4, {
      ease: 'Back.easeIn',
      y: direction === 'right' ? '-100%' : '100%',
      opacity: 0,
      onComplete: () => {
        this.DOM.pagination.current.innerHTML = val
        TweenMax.to(this.DOM.pagination.current, 0.8, {
          ease: 'Expo.easeOut',
          startAt: { y: direction === 'right' ? '50%' : '-50%', opacity: 0 },
          y: '0%',
          opacity: 1
        })
      }
    })
  }
  // Sets the total pages value.
  setTotal(val) {
    this.DOM.pagination.total.innerHTML = val
  }

  mouseEvents(event) {
    if (event.deltaY < 0) {
      this.settings.prev()
    }
    else if (event.deltaY > 0) {
      this.settings.next()
    }
  }

  initEvents() {
    this.DOM.prevCtrl.addEventListener('click', () => this.settings.prev())
    this.DOM.nextCtrl.addEventListener('click', () => this.settings.next())

    if (this.DOM.el.parentNode.querySelector('.filter-slideshow')) {
      swipedetect(this.DOM.el.parentNode.querySelector('.filter-slideshow'), (swipedir) => {
        swipedir === 'left' ? this.settings.next() : this.settings.prev()
      })
    }

    window.addEventListener('wheel', this.mouseHandler)
  }

  destroyMouseHandler() {
    window.removeEventListener('wheel', this.mouseHandler)
  }
}
