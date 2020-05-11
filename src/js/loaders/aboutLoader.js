import { TimelineMax } from 'gsap'
import { splitLines } from '../lib/splitLines.js'
import Splitting from 'splitting'

const aboutLoader = () => {

  const h1 = document.querySelector('h1')
  const content = document.querySelectorAll('.about-section')
  const results = Splitting({ target: h1, by: 'lines' })
  splitLines(h1)

  const tl = new TimelineMax()

  tl
    .to(h1, 0.1, {opacity: 1, ease: Power3.easeInOut}, 0)
    .staggerTo(h1.querySelectorAll('.splitted-line'), 0.8, { y: 0, ease: Expo.easeOut }, 0.2, 0.7)
    .to(content, 1, {opacity: 1, ease: Power1.easeOut})
}

export default aboutLoader
