import { TimelineMax, Power4, Power1, Expo } from 'gsap'

export default class FilterAnimation {

  open() {
    const tl = new TimelineMax()
    if (screen.width > 460) {
      tl
        .to(document.querySelector('.filter'), 1, {
          y: '0%', ease: Power4.easeOut, onComplete: () => {
            document.querySelector('.navbar').classList.add('filter-open')
          }
        }, 0)
        .to(document.querySelector('.navbar__filter-btn'), 1, { rotation: 360, ease: Power4.easeOut }, 0)
        .staggerFromTo(document.querySelectorAll('.tab'), 0.6, { y: -50, opacity: 0 }, { y: 0, opacity: 1 }, 0.2, 0.9)
        .staggerFromTo(document.querySelectorAll('.tabs__nav-item'), 0.6, { y: -50, opacity: 0 }, { y: 0, opacity: 1 }, 0.2, 0.9)
        .fromTo(document.querySelectorAll('.filter__h2 span'), 0.6, { y: '-100%', opacity: 0 }, { y: '0%', opacity: 1 }, 0.8)
        .fromTo(document.querySelector('.filter .container'), 1, { opacity: 0 }, { opacity: 1, ease: Power1.easeOut }, 0.8)
    } else {
      tl
        .to(document.querySelector('.filter'), 1, {
          y: '0%', ease: Power4.easeOut, onComplete: () => {
            document.querySelector('.navbar').classList.add('filter-open')
          }
        }, 0)
        .to(document.querySelector('.navbar__filter-btn'), 1, { rotation: 360, ease: Power4.easeOut }, 0)
        .fromTo(document.querySelector('.tabs'), 0.6, { opacity: 0 }, { opacity: 1 }, 0.9)
        .staggerFromTo(document.querySelectorAll('.tabs__nav-item'), 0.6, { opacity: 0 }, { opacity: 1 }, 0.2, 0.9)
        .fromTo(document.querySelectorAll('.filter__h2 span'), 0.6, { y: '-100%', opacity: 0 }, { y: '0%', opacity: 1 }, 0.8)
        .fromTo(document.querySelector('.filter .container'), 1, { opacity: 0 }, { opacity: 1, ease: Power1.easeOut }, 0.8)
    }
  }

  close(cb) {
    const tl2 = new TimelineMax({
      onComplete: () => {
        document.querySelector('.filter').classList.remove('open')
      }
    })
    if (screen.width > 460) {
      tl2
        .staggerFromTo(document.querySelectorAll('.tab'), 0.6, { y: 0, opacity: 1 }, { y: -50, opacity: 0 }, 0.2)
        .staggerFromTo(document.querySelectorAll('.tabs__nav-item'), 0.6, { y: 0, opacity: 1 }, { y: -50, opacity: 0 }, 0.2, 0)
        .fromTo(document.querySelectorAll('.filter__h2 span'), 0.6, { y: '0%', opacity: 1 }, { y: '-100%', opacity: 0 }, 0.1)
        .to(document.querySelector('.filter .container'), 0.5, { opacity: 0, ease: Power1.easeOut })
        .to(document.querySelector('.navbar__filter-btn'), 1, { rotation: 0, ease: Power4.easeOut }, 0)
        .to(document.querySelector('.filter'), 1, {
          y: '-100%', ease: Power4.easeOut, onComplete: () => {
            if(typeof cb === 'function')
              cb()
          }
        }, 1)
    } else {
      tl2
        .fromTo(document.querySelector('.tabs'), 0.6, { opacity: 1 }, { opacity: 0 })
        .staggerFromTo(document.querySelectorAll('.tabs__nav-item'), 0.6, { opacity: 1 }, { opacity: 0 }, 0.2, 0)
        .fromTo(document.querySelectorAll('.filter__h2 span'), 0.6, { y: '0%', opacity: 1 }, { y: '-100%', opacity: 0 }, 0.1)
        .to(document.querySelector('.filter .container'), 0.5, { opacity: 0, ease: Power1.easeOut })
        .to(document.querySelector('.navbar__filter-btn'), 1, { rotation: 0, ease: Power4.easeOut }, 0)
        .to(document.querySelector('.filter'), 1, {
          y: '-100%', ease: Power4.easeOut, onComplete: () => {
            if(typeof cb === 'function')
              cb()
          }
        }, 1)
    }
  }

  loading() {

    const ltl = new TimelineMax()

    ltl
      .to(document.querySelector('.filter-window__loader'), 0.1, { display: 'none' }, 0.3)
      .fromTo(document.querySelector('.filter-window__iw-rewealer'), 1, { width: '100%' }, { width: '0%', ease: Expo.easeOut }, 0.6)
      .fromTo(document.querySelector('.filter-window__images-wrapper'), 1, { opacity: 0 }, { opacity: 1, ease: Expo.easeOut }, 0.6)
      .fromTo(document.querySelector('.filter-window__items'), 1, { opacity: 0 }, { opacity: 1, ease: Expo.easeOut }, 1)
      .fromTo(document.querySelector('.filter-window__item.is-visible'), 1, { y: 60 }, { y: 0, ease: Expo.easeOut }, 1)
      .fromTo([...document.querySelectorAll('.filter-window__item.is-visible')].slice(1), 1, { x: 120, opacity: 0 }, { x: 0, opacity: 1, ease: Expo.easeOut }, 1)
  }
}
