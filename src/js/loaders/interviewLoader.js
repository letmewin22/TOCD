import { TimelineMax, Power2, Power1 } from 'gsap'

const interviewLoader = () => {

  const h1 = document.querySelector('h1')
  const description = document.querySelector('.interview-header__description')
  const img = document.querySelector('.interview-header__image')
  const imgWrapper = document.querySelector('.interview-header__right')
  const imgRewealer = document.querySelector('.interview-header__image-rewealer')
  const strip = document.querySelector('.interview-randomizer')

  let tl = new TimelineMax()
  tl
    .fromTo(h1, 1, { y: '100%' }, { y: '0%', opacity: 1, ease: Power2.easeInOut })
    .fromTo(description, 1, { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, ease: Power2.easeInOut }, 0.3)
    .to(imgRewealer, 1.2, { x: '-100%', ease: Power2.easeOut }, 0.4)
    .to(imgWrapper, 0.6, { opacity: 1, ease: Power2.easeInOut }, 0.4)
    .to(img, 1, { scale: 1, ease: Power1.easeInOut }, 0.4)
    .to(imgRewealer, 0.1, { display: 'none' })

  if (screen.width > 1023) {
    let tl2 = new TimelineMax()
    tl2
      .to(strip, 1, { opacity: 1 }, 1)
  }

}

export default interviewLoader
