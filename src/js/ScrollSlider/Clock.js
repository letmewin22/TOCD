import ScrollSlider from './ScrollSlider'
import { TimelineMax, Power3 } from 'gsap'

export default class Clock extends ScrollSlider {

  constructor(strip, skew) {

    super(strip, skew)

    this.clockItems2.forEach(el => el.addEventListener('click', this.clockClick.bind(this, el)))
    this.clockItems2.forEach((el, index) => el.addEventListener('mouseenter', this.clockHover.bind(this, el, index)))
    this.clockItems2.forEach((el, index) => el.addEventListener('mouseleave', this.clockHoverOut.bind(this, el, index)))
  }

  clockClick(elem) {

    if (this.isAnimating) return
    
    this.isAnimating = true
    this.strip.classList.remove('distortion')
    const scrollPos = (Math.floor(this.step) * (elem.getAttribute('id').replace(/\D/g, '')))

    const tl = new TimelineMax({
      onComplete: () => {
        this.strip.classList.add('distortion')
        this.isAnimating = false
      }
    })
    if (this.direction === 'vertical') {
      tl
        .to(document.documentElement, 2, { scrollTop: scrollPos, ease: Power3.easeOut }, 0)
    } else {
      tl
        .to(document.documentElement, 2, { scrollLeft: scrollPos, ease: Power3.easeOut }, 0)
    }

  }

  clockHover(elem, index) {
    this.clockItems1[index].style.strokeWidth = '2px'
  }

  clockHoverOut(elem, index) {
    this.clockItems1[index].style.strokeWidth = '1px'
  }
}
