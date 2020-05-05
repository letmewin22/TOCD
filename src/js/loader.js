import { TimelineMax } from 'gsap'

const loader = (callback) => {

  const topPath = [...document.querySelectorAll('.header__clock #top path')].reverse()
  const bottomPath = [...document.querySelectorAll('.header__clock #bottom path')].reverse()

  let tl = new TimelineMax({onComplete: () => {
    callback()
    document.body.style.overflow = 'initial'
  }})
  tl
    .staggerTo(topPath, 0.3, { opacity: 1, ease: Power3.easeInOut }, 0.05)
    .staggerTo(topPath, 0.3, { opacity: 0, ease: Power3.easeInOut }, 0.05, 0.3)
    .staggerTo(topPath, 0.3, { opacity: 1, ease: Power3.easeInOut }, 0.05, 0.9)
    .staggerTo(bottomPath, 0.3, { opacity: 1, ease: Power3.easeInOut }, 0.05, 0.9)
    .staggerTo(bottomPath, 0.3, { opacity: 0, ease: Power3.easeInOut }, 0.05, 1.2)
    .staggerTo(bottomPath, 0.3, { opacity: 1, ease: Power3.easeInOut}, 0.05, 1.8)
    .staggerTo(document.querySelectorAll('.header__time span'), 0.7, { y: 0, ease: Power3.easeOut }, 0.12, 3.5)
    .to(document.querySelector('.header__time-wrapper'), 0.5, { opacity: 1, ease: Power3.easeInOut, onComplete: () => {
      document.querySelector('.fake').remove()
      document.querySelector('.real').classList.add('is-visible')
    }}, 3.5)
    .to(document.querySelector('.header__names'), 2.6, { x: 0, skewX: 0, opacity: 1, ease: Power4.easeOut }, 4.5)

  let tl2 = new TimelineMax({repeat: -1})
    .to(document.querySelectorAll('.dots'), 0.1, {opacity: 0, ease: Power3.easeInOut}, 1)
    .to(document.querySelectorAll('.dots'), 0.1, {opacity: 1, ease: Power3.easeInOut}, 2)
}

export default loader
