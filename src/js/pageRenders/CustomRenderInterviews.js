import Highway from '@dogstudio/highway'
import { TimelineMax } from 'gsap'
import filter from '../filter.js'
import scrollDirection from '../scrollDirection'


class CustomRendererInterviews extends Highway.Renderer {

  onEnterCompleted() {
    filter()
    scrollDirection()
    
    document.body.style.overflow = 'initial'
    document.body.style.height = 'auto'
    document.querySelector('.navbar').style.position = 'absolute'

    if (!document.body.classList.contains('transitioned')) {

      const h1 = document.querySelector('h1')
      const description = document.querySelector('.interview-header__description')
      const img = document.querySelector('.interview-header__image')
      const imgWrapper = document.querySelector('.interview-header__right')
      const imgRewealer = document.querySelector('.interview-header__image-rewealer')

      let tl = new TimelineMax()
      tl
        .fromTo(h1, 1, { y: '100%' }, { y: '0%', opacity: 1, ease: Power2.easeInOut })
        .fromTo(description, 1, { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, ease: Power2.easeInOut }, 0.3)
        .to(imgRewealer, 1.2, { x: '-100%', ease: Power2.easeOut }, 0.4)
        .to(imgWrapper, 0.6, { opacity: 1, ease: Power2.easeInOut }, 0.4)
        .to(img, 1, { scale: 1, ease: Power1.easeInOut }, 0.4)
    }

    const randomizerItems = document.querySelectorAll('.interview-randomizer__item')
    const h1 = document.querySelector('.clicked') || document.querySelector('h1')
    randomizerItems.forEach(el => {
      el.classList.remove('active')
      if (el.querySelector('h3').innerText.replace(/\s/g, '').toLowerCase() === h1.innerText.replace(/\<br>/, '').replace(/\s/g, '').toLowerCase()) {
        el.classList.add('active')
      }
    })

  }
}
// Don`t forget to export your renderer
export default CustomRendererInterviews
