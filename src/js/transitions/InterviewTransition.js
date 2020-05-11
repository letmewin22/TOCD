import Highway from '@dogstudio/highway'
import { TimelineMax } from 'gsap'

export default class InterviewTransition extends Highway.Transition {
  // Built-in methods
  out({ from, done }) {
    document.body.style.cursor = 'wait'
    document.body.style.position = 'fixed'
    let tl = new TimelineMax({ onComplete: done })
      .to(from, 0.25, { opacity: 0 })
  }

  in({ from, to, done }) {

    window.scrollTo(0, 1)
    document.body.style.pointerEvents = 'auto'
    document.body.classList = ''
    document.body.classList.add('transitioned')
    document.body.overflow = 'auto'
    document.body.style.cursor = 'auto'

    const clicked = document.querySelector('.clicked')
    const clickedText = document.querySelector('.text-clicked')

    const wrapper = to.querySelector('.h1-wrapper')
    const textWrapper = to.querySelector('.description-wrapper')
    const h1 = to.querySelector('h1')
    const description = to.querySelector('.interview-header__description')

    const css = {
      h1X: h1.getBoundingClientRect().x + h1.getBoundingClientRect().width / 2,
      h1Y: h1.getBoundingClientRect().y + h1.getBoundingClientRect().height / 2,
      h1fontSize: getComputedStyle(h1).fontSize,
      textX: description.getBoundingClientRect().x + description.getBoundingClientRect().width / 2,
      textY: description.getBoundingClientRect().y + description.getBoundingClientRect().height / 2,
      textFontSize: getComputedStyle(description).fontSize
    }

    let tl = new TimelineMax({
      onComplete: () => {
        clicked.style.position = 'absolute'
        // clicked.style.position = 'static'
        // clicked.style.transform = 'translate(0, 0)'
        wrapper.appendChild(clicked)
        // h1.style.display = 'none'
        // wrapper.removeChild(document.querySelector('h1'))

        clickedText.style.position = 'absolute'
        // clickedText.style.position = 'static'
        // clickedText.style.transform = 'translate(0, 0)'
        textWrapper.appendChild(clickedText)
        // description.style.display = 'none'
        // textWrapper.removeChild(description)
        document.body.style.position = 'initial'
        done()
      }
    })

    tl
      .to(clicked, 0.8, {
        left: css.h1X,
        top: css.h1Y,
        fontSize: css.h1fontSize,
        letterSpacing: '0.02em',
        lineHeight: '0.72em',
        x: '-50%',
        y: '-50%',
        ease: Power2.easeInOut
      })

      .to(clickedText, 0.8, {
        left: css.textX,
        top: css.textY,
        fontSize: css.textFontSize,
        x: '-50%',
        y: '-50%',
        opacity: 1,
        ease: Power2.easeInOut
      }, 0)
        
      .fromTo(to, 0.5, { opacity: 0 }, { opacity: 1 }, 0)
      .to(to.querySelector('.interview-header__image-rewealer'), 1.2, { x: '-100%', ease: Power2.easeOut }, 0.2)
      .to(to.querySelector('.interview-header__right'), 0.6, { opacity: 1, ease: Power2.easeInOut }, 0.2)
      .to(to.querySelector('.interview-header__image'), 1, { scale: 1, ease: Power1.easeInOut }, 0.2)

    from.remove()
  }
};
