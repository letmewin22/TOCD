import { TimelineMax, Power2, Power1 } from 'gsap'

const interviewLoader = () => {

  const img = document.querySelectorAll('.interview-header__image')
  const imgWrapper = document.querySelectorAll('.interview-header__right')
  const imgRewealer = document.querySelectorAll('.interview-header__image-rewealer')
  const strip = document.querySelectorAll('.interview-randomizer')

  let tl = new TimelineMax()
  tl
    .to(imgRewealer, 1.2, { x: '-100%', ease: Power2.easeOut }, 0.4)
    .to(imgWrapper, 0.6, { opacity: 1, ease: Power2.easeInOut }, 0.4)
    .to(img, 1, { scale: 1, ease: Power1.easeInOut }, 0.4)
    .to(imgRewealer, 0.1, { display: 'none' })

  if (screen.width > 1024) {
    let tl2 = new TimelineMax()
    tl2
      .to(strip, 1, { opacity: 1 }, 1)
  }

}

export default interviewLoader
