import Highway from '@dogstudio/highway'
import { TimelineMax, Power2, Power1 } from 'gsap'
import imagesLoaded from 'imagesloaded'

export default class InterviewTransition extends Highway.Transition {
  // Built-in methods
  out({ from, done }) {
    document.body.style.cursor = 'wait'
    document.body.style.position = 'fixed'
    document.body.style.position = 'initial'
    document.body.style.width = 'auto'
    let tl = new TimelineMax({ onComplete: done })
    tl
      .to(from, 0.25, { opacity: 0 })
  }

  in({ from, to, done }) {

    imagesLoaded(to.querySelector('.interview-header__image'), { background: true }, () => {

      window.scrollTo(0, 1)
      document.body.style.pointerEvents = 'auto'
      document.body.classList = ''
      document.body.classList.add('transitioned')
      document.body.overflow = 'auto'

      const clicked = document.querySelector('.clicked')
      const clickedText = document.querySelector('.text-clicked')

      const wrapper = to.querySelector('.h1-wrapper')
      const textWrapper = to.querySelector('.description-wrapper')
      const h1 = to.querySelector('h1')
      const description = to.querySelector('.interview-header__description')
      const strip = document.querySelector('.interview-randomizer')

      h1.style.opacity = 0
      description.style.opacity = 0

      const css = {
        h1X: h1.getBoundingClientRect().x + h1.getBoundingClientRect().width / 2,
        h1Y: h1.getBoundingClientRect().y + h1.getBoundingClientRect().height / 2,
        h1fontSize: getComputedStyle(h1).fontSize,
        textX: description.getBoundingClientRect().x + description.getBoundingClientRect().width / 2,
        textY: description.getBoundingClientRect().y + description.getBoundingClientRect().height / 2,
        textLineHeight: getComputedStyle(description).lineHeight,
        textColor: getComputedStyle(description).color
      }

      let tl = new TimelineMax({
        onComplete: () => {
          clicked.style.position = 'absolute'
          clicked.style.zIndex = '1'
          wrapper.appendChild(clicked)

          clickedText.style.position = 'absolute'
          clickedText.style.zIndex = '1'

          textWrapper.appendChild(clickedText)

          document.body.style.position = 'initial'
          document.body.style.cursor = 'auto'
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
          lineHeight: css.textLineHeight,
          x: '-50%',
          y: '-50%',
          color: css.textColor,
          ease: Power2.easeInOut
        }, 0)

        .fromTo(to, 0.5, { opacity: 0 }, { opacity: 1 }, 0)
        .fromTo(to.querySelector('.interview-header__image-rewealer'), 1.2, { x: '0%'}, { x: '-100%', ease: Power2.easeOut }, 0.2)
        .fromTo(to.querySelector('.interview-header__right'), 0.6, { opacity: 0} ,{ opacity: 1, ease: Power2.easeInOut }, 0.2)
        .fromTo(to.querySelector('.interview-header__image'), 1, { scale: 1.25}, { scale: 1, ease: Power1.easeInOut }, 0.2)
        .to(to.querySelector('.interview-header__image-rewealer'), 0.1, { display: 'none' })

      if (screen.width > 1024) {
        let tl2 = new TimelineMax()
        tl2
          .to(strip, 1, { opacity: 1 }, 1.2)
      }

      from.remove()
    })
  }
  
};
