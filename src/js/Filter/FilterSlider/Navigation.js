import swipedetect from '../../lib/swipe'
import { TweenMax } from 'gsap'
import ItemsSlider from './ItemsSlider'
import MouseEvent from './MouseEvent'
// The navigation class. Controls the .boxnav animations (e.g. pagination animation).
export default class Navigation {
  constructor(el, settings, state) {
    this.DOM = { el: el }
    this.state = state
    this.settings = {
      next: () => {
        return false
      },
      prev: () => {
        return false
      },
    }

    Object.assign(this.settings, settings)

    // Navigation controls (prev and next)
    this.DOM.prevCtrl = this.DOM.el.querySelector('.filter-boxnav__item--prev')
    this.DOM.nextCtrl = this.DOM.el.querySelector('.filter-boxnav__item--next')

    this.DOM.pagination = {
      current: this.DOM.el.querySelector('.filter-boxnav__label--current'),
      total: this.DOM.el.querySelector('.filter-boxnav__label--total'),
    }

    // this.prevTime = new Date().getTime()

    // this.mouseHandler = (event) => {
    //   this.curTime = new Date().getTime()
    //   if (typeof this.prevTime !== 'undefined') {
    //     this.timeDiff = this.curTime - this.prevTime
    //     if (this.timeDiff > 701) {
    //       this.mouseEvents(event)
    //     }
    //   }
    //   this.prevTime = this.curTime
    // }
    this.isActive = false

    this.mouseHandler = (event) => {

      if(!this.isActive) {

        this.mouseEvents(event)
        this.isActive = true

        const timeout = setTimeout(() => {
          this.isActive = false
          clearTimeout(timeout)
        }, 710)
        
      }
      
      event.preventDefault()
      return false
    }

    this.prevHandler = () => {
      this.prevEvents()
    }

    this.nextHandler = () => {
      this.nextEvents()
    }

    this.strip = new ItemsSlider()
    this.strip.init()
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
          opacity: 1,
        })
      },
    })
  }
  // Sets the total pages value.
  setTotal(val) {
    this.DOM.pagination.total.innerHTML = val
  }

  prevEvents() {
    this.settings.prev()
    this.strip.prev()
  }

  nextEvents() {
    this.settings.next()
    this.strip.next()
  }

  mouseEvents(event) {
    console.log('test')
    if (event.deltaY < 0) {
      this.prevEvents()
    } else if (event.deltaY > 0) {
      this.nextEvents()
    }
  }

  initEvents() {
    this.DOM.prevCtrl.addEventListener('click', this.prevHandler)
    this.DOM.nextCtrl.addEventListener('click', this.nextHandler)

    if (this.DOM.el.parentNode.querySelector('.filter-slideshow')) {
      if (!this.state) {
        swipedetect(
          this.DOM.el.parentNode.querySelector('.filter-slideshow'),
          (swipedir) => {
            swipedir === 'left' ? this.nextEvents() : this.prevEvents()
          },
        )
      }
      this.state = true
    }

    this.mEvent = new MouseEvent(window, this.mouseHandler)
  }

  destroy() {
    this.mEvent.destroy()
    this.DOM.prevCtrl.removeEventListener('click', this.prevHandler)
    this.DOM.nextCtrl.removeEventListener('click', this.nextHandler)
  }
}
