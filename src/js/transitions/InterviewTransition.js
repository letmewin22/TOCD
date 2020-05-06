import Highway from '@dogstudio/highway'
import { TimelineMax } from 'gsap'

export default class InterviewTransition extends Highway.Transition {
  // Built-in methods
  out({ from, done }) {
    let tl = new TimelineMax({ onComplete: done })
      .to(from, 0.25, { opacity: 0 })
  }

  in({ from, to, done }) {
    window.scrollTo(0, 1)
    document.body.style.pointerEvents = 'auto'
    document.body.overflow = 'auto'
      
    const clicked = document.querySelector('.clicked')

    const wrapper = to.querySelector('.h1-wrapper')
    const h1 = to.querySelector('h1')

    const pos = {
      x: h1.getBoundingClientRect().x + h1.getBoundingClientRect().width / 2,
      y: h1.getBoundingClientRect().y + h1.getBoundingClientRect().height / 2
    }


    let tl = new TimelineMax({
      onComplete: () => {
        clicked.style.position = 'static'
        clicked.style.transform = 'translate(0, 0)'
        h1.style.display = 'none'
        wrapper.appendChild(clicked)
        done()
      }
    })

    tl
      .to(clicked, 1, { left: pos.x, top: pos.y, fontSize: '6.45vw', x: '-50%', y: '-50%', ease: Power3.easeInOut })
    // .to(clicked.querySelector('h2'), 1, { left: pos.x, top: pos.y, fontSize: '6.45vw', x: '-50%', y: '-50%', ease: Power3.easeInOut })
    // .to(clicked.querySelector('p'), 1, { left: pos.x, top: pos.y, x: '-50%', y: '-50%', ease: Power3.easeInOut })
      .fromTo(to, 0.2, { opacity: 0 }, { opacity: 1 })

    to.querySelector('h1').style.opacity = '0'
    from.remove()
  }
};
