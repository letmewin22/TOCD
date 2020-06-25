import { TweenMax, Power2 } from 'gsap'
  
// The Slide (Product) class.
export default class Slide {
  constructor(el, settings) {
    this.DOM = {el: el}
            
    this.settings = {
      detailsEl: null,
      onHideDetails: () => {return false}
    }
    Object.assign(this.settings, settings)

    this.DOM.wrap = this.DOM.el.querySelector('.slide__wrap')
    this.DOM.img = this.DOM.wrap.querySelector('.slide__img')

    this.config = {
      animation: {
        duration: 1.4,
        ease: Power2.easeInOut
      }
    }
  }
  // Sets the current class.
  setCurrent(isCurrent = true) {
    this.DOM.el.classList[isCurrent ? 'add' : 'remove']('slide--current')
  }
  // Hide the slide.
  hide(direction) {
    return this.toggle('hide', direction)
  }
  // Show the slide.
  show(direction) {
    this.DOM.el.style.zIndex = 1000
    return this.toggle('show', direction)
  }
  // Show/Hide the slide.
  toggle(action, direction) {
    return new Promise((resolve, reject) => {

      if ( action === 'show' ) {
        TweenMax.to(this.DOM.wrap, this.config.animation.duration, {
          ease: this.config.animation.ease,
          startAt: {x: direction === 'right' ? '100%' : '-100%'},
          x: '0%'
        })
      }

      TweenMax.to(this.DOM.img, this.config.animation.duration, {
        ease: this.config.animation.ease,
        startAt: action === 'hide' ? {} : {x: direction === 'right' ? '-100%' : '100%', scale: 1.25},
        x: '0%',
        scale: action === 'hide' ? 1.1 : 1,
        onStart: () => {
          this.DOM.img.style.transformOrigin = action === 'hide' ? 
            direction === 'right' ? '100% 50%' : '0% 50%':
            direction === 'right' ? '0% 50%' : '100% 50%'
          this.DOM.el.style.opacity = 1
        },
        onComplete: () => {
          this.DOM.el.style.zIndex = 999
          this.DOM.el.style.opacity = action === 'hide' ? 0 : 1
          resolve()
        }
      })
    })
  }

}
