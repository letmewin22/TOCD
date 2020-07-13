import Highway from '@dogstudio/highway'
import aboutLoader from '../loaders/aboutLoader.js'

import { TimelineMax, Power3, Power4 } from 'gsap'
import { splitLines } from '../lib/splitLines.js'
import Splitting from 'splitting'

class About extends Highway.Renderer {

  onEnterCompleted() {
    aboutLoader()
    document.body.style.overflow = 'initial'
    document.body.style.overflowX = 'hidden'
    document.body.style.height = 'auto'
    document.body.style.width = 'auto'
    document.body.classList = ''
    document.querySelector('.navbar').classList.add('interview-page')

    const elem = document.querySelector('.about-h2')
    Splitting({ target: elem, by: 'lines' })
    splitLines(elem)
    let raf
    const scrollhandler = () => {
      let elemTop = elem.getBoundingClientRect().top
      if (elemTop <= window.innerHeight * 0.8 && elemTop > 0) {
        if (!elem.classList.contains('activated')) {

          elem.classList.add('activated')
          cancelAnimationFrame(raf)
          const tl = new TimelineMax()
          tl
            .to(elem, 0.1, { opacity: 1, ease: Power3.easeInOut }, 0.2)
            .staggerTo(elem.querySelectorAll('.splitted-line'), 1.4, { y: 0, rotation: 0, opacity: 1, ease: Power4.easeOut }, 0.2)
        }
      }
      raf = window.requestAnimationFrame(scrollhandler)
    }
    scrollhandler()

  }
}
// Don`t forget to export your renderer
export default About
