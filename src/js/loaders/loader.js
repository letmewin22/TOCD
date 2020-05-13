import { TimelineMax, Power3, Power4 } from 'gsap'

const loader = (callback) => {

  document.body.style.overflowY = 'hidden'
  document.body.style.overflowX = 'scroll'
  
  callback()

  const topPath = [...document.querySelectorAll('.header__clock #top path')].reverse()
  const bottomPath = [...document.querySelectorAll('.header__clock #bottom path')].reverse()

  const scrollPos = window.innerWidth > window.innerHeight ? 
    (document.documentElement.scrollHeight - document.documentElement.clientHeight) / 1.92 :
    (document.documentElement.scrollWidth - document.documentElement.clientWidth) / 1.92

  let tl = new TimelineMax({
    onComplete: () => {
      if (window.innerWidth > window.innerHeight) {
        document.body.style.overflow = 'initial'
      }
      document.querySelector('.header__names .container').classList.add('distortion')
    }
  })

  if (window.innerWidth > window.innerHeight) {
    tl
      .staggerTo(topPath, 0.3, { opacity: 1, ease: Power3.easeInOut }, 0.05)
      .staggerTo(topPath, 0.3, { opacity: 0, ease: Power3.easeInOut }, 0.05, 0.3)
      .staggerTo(topPath, 0.3, { opacity: 1, ease: Power3.easeInOut }, 0.05, 0.9)
      .staggerTo(bottomPath, 0.3, { opacity: 1, ease: Power3.easeInOut }, 0.05, 0.9)
      .staggerTo(bottomPath, 0.3, { opacity: 0, ease: Power3.easeInOut }, 0.05, 1.2)
      .staggerTo(bottomPath, 0.3, { opacity: 1, ease: Power3.easeInOut }, 0.05, 1.8)
      .staggerFromTo(document.querySelectorAll('.header__time span'), 0.7, { y: '100%', ease: Power3.easeOut }, { y: '0%', ease: Power3.easeOut }, 0.12, 3.5)
      .to(document.querySelector('.header__time-wrapper'), 0.5, {
        opacity: 1,
        ease: Power3.easeInOut,
        onComplete: () => {
          document.querySelector('.fake').remove()
          document.querySelector('.real').classList.add('is-visible')
        }
      }, 3.5)
      .to(document.querySelector('.header__names'), 2.4, { opacity: 1, ease: Power4.easeOut }, 4.5)
      .from(document.querySelector('.header__names'), 2.4, { skewX: '-25deg', ease: Power4.easeOut }, 4.5)
      .fromTo(document.documentElement, 2.4, { scrollTop: scrollPos - 1340 }, { scrollTop: scrollPos, ease: Power4.easeOut }, 4.5)

  } else {
    tl
      .staggerTo(topPath, 0.3, { opacity: 1, ease: Power3.easeInOut }, 0.05)
      .staggerTo(topPath, 0.3, { opacity: 0, ease: Power3.easeInOut }, 0.05, 0.3)
      .staggerTo(topPath, 0.3, { opacity: 1, ease: Power3.easeInOut }, 0.05, 0.9)
      .staggerTo(bottomPath, 0.3, { opacity: 1, ease: Power3.easeInOut }, 0.05, 0.9)
      .staggerTo(bottomPath, 0.3, { opacity: 0, ease: Power3.easeInOut }, 0.05, 1.2)
      .staggerTo(bottomPath, 0.3, { opacity: 1, ease: Power3.easeInOut }, 0.05, 1.8)
      .staggerFromTo(document.querySelectorAll('.header__time span'), 0.7, { y: '100%', ease: Power3.easeOut }, { y: '0%', ease: Power3.easeOut }, 0.12, 3.5)
      .to(document.querySelector('.header__time-wrapper'), 0.5, {
        opacity: 1,
        ease: Power3.easeInOut,
        onComplete: () => {
          document.querySelector('.fake').remove()
          document.querySelector('.real').classList.add('is-visible')
        }
      }, 3.5)
      .to(document.querySelector('.header__names'), 2.4, { opacity: 1, ease: Power4.easeOut }, 4.5)
      .from(document.querySelector('.header__names'), 2.4, { skewX: '-25deg', ease: Power4.easeOut }, 4.5)
      .fromTo(document.documentElement, 2.4, { scrollLeft: scrollPos - 1340 }, { scrollLeft: scrollPos, ease: Power4.easeOut }, 4.5)

  }

  // .staggerTo(topPath, 0.01, { opacity: 1, ease: Power3.easeInOut })
  // .staggerTo(bottomPath, 0.01, { opacity: 1, ease: Power3.easeInOut})
  // .staggerTo(document.querySelectorAll('.header__time span'), 0.1, { y: 0, ease: Power3.easeOut })
  // .to(document.querySelector('.header__time-wrapper'), 0.1, { opacity: 1, ease: Power3.easeInOut, onComplete: () => {
  //   document.querySelector('.fake').remove()
  //   document.querySelector('.real').classList.add('is-visible')
  // }})
  // .to(document.querySelector('.header__names'), 0.01, { opacity: 1 })
  // .fromTo(document.documentElement, 0.01, { scrollTop: scrollPos - 1340 }, { scrollTop: scrollPos, ease: Power4.easeOut })


  let tl2 = new TimelineMax({ repeat: -1 })
  tl2
    .to(document.querySelectorAll('.dots'), 0.1, { opacity: 0, ease: Power3.easeInOut }, 0.75)
    .to(document.querySelectorAll('.dots'), 0.1, { opacity: 1, ease: Power3.easeInOut }, 1.5)
}

export default loader



