import { TimelineMax, Power3 } from 'gsap'
import Highway from '@dogstudio/highway'

export default class SimpleTransition extends Highway.Transition {
  // Built-in methods
  out({ from, done }) {
    let tl = new TimelineMax({ onComplete: done })
    document.body.style.pointerEvents = 'none'
    document.body.style.overflow = 'hidden'
    document.body.style.cursor = 'wait'
    tl
      .to(from, 0.6, { opacity: 0, ease: Power1.easeInOut })
      .to(document.querySelector('header'), 0.6, { y: -80, ease: Power1.easeInOut }, 0)
      .fromTo(document.querySelector('.page-rewealer'), 1.2, { y: '100%'}, { y: '0%', ease: Power2.easeOut }, 0)

  }

  in({ from, to, done }) {
    from.remove()
    window.scrollTo(0, 0)
    document.querySelector('.site-wrapper').scrollTo(0, 0)
    document.body.style.cursor = 'auto'
    let tl = new TimelineMax({
      onComplete: () => {
        document.body.style.pointerEvents = 'auto'
        done()
        let tl2 = new TimelineMax()
        tl2
          .to(document.querySelector('.page-rewealer'), 1, { y: '-100%', ease: Power2.easeOut }, 0)
      }
    })
    tl
      .fromTo(to, 0.6, { opacity: 0 }, { opacity: 1, ease: Power3.easeInOut })

  }
};
