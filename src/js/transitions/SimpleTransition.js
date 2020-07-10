import { TimelineMax, Power2 } from 'gsap'
import Highway from '@dogstudio/highway'

export default class SimpleTransition extends Highway.Transition {
  // Built-in methods
  out({ done }) {

    let tl = new TimelineMax({ onComplete: done })
    document.body.style.cursor = 'wait'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.height = '100vh'

    tl
      .fromTo(
        document.querySelector('.page-rewealer svg'),
        0.1,
        { opacity: 0 },
        { opacity: 1, ease: Power2.easeOut },
        0
      )
      .fromTo(
        document.querySelector('.page-rewealer svg'),
        1.4,
        { strokeDashoffset: 3141.276123046875 },
        { strokeDashoffset: 0, ease: Power2.easeInOut },
        0
      )
  }

  in({ from, done }) {

    document.body.style.width = '100%'
    document.body.style.position = 'initial'
    document.body.style.height = 'auto'
    
    from.remove()
    window.scrollTo(0, 0)
    document.querySelector('.site-wrapper').scrollTo(0, 0)
    
    let tl2 = new TimelineMax({
      onComplete: () => {
        document.body.style.pointerEvents = 'auto'
        document.body.style.cursor = 'auto'
        done()
      },
    })
    tl2
      .fromTo(
        document.querySelector('.page-rewealer svg'),
        1.4,
        { strokeDashoffset: 0 },
        { strokeDashoffset: -3141.276123046875, ease: Power2.easeInOut },
        0
      )
      .fromTo(
        document.querySelector('.page-rewealer svg'),
        0.2,
        { opacity: 1 },
        { opacity: 0, ease: Power2.easeOut },
        '-=0.1'
      )
  }
}
