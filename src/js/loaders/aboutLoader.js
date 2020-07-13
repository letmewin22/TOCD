import { TimelineMax, Power3, Power1 } from 'gsap'
import { splitLines } from '../lib/splitLines.js'
import Splitting from 'splitting'

const aboutLoader = () => {

  const h1 = document.querySelector('h1')
  const content = document.querySelectorAll('.about-section')
  Splitting({ target: h1, by: 'lines' })
  splitLines(h1)

  const tl = new TimelineMax()

  tl
    .to(h1, 0.1, { opacity: 1, ease: Power3.easeInOut }, 0.2)
    .staggerTo(h1.querySelectorAll('.splitted-line'), 1.4, { y: 0, rotation: 0, opacity: 1, ease: Power4.easeOut }, 0.2)
    .to(content, 1, { opacity: 1, ease: Power1.easeOut }, 1)
}

export default aboutLoader
