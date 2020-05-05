import Highway from '@dogstudio/highway'
import './lib/smoothscroll'
import tab from './tabs'

import CustomRendererMain from './pageRenders/CustomRenderMain'
import CustomRendererInterviews from './pageRenders/CustomRenderInterviews'

import SimpleTransition from './transitions/SimpleTransition'


// const counter = (elem, callback, time) => {

//   const tl = new TimelineMax()
//   tl
//     .delay(time)
//     .to(elem, 0.5, { y: '-100%', opacity: 0, ease: Power3.easeIn, onComplete: callback })
//     .to(elem, 0, { y: '100%' })
//     .to(elem, 0.5, { y: '0%', opacity: 1, ease: Power3.easeOut })
// }

const H = new Highway.Core({
  renderers: {
    main: CustomRendererMain,
    interview: CustomRendererInterviews
  },
  transitions: {
    default: SimpleTransition
  }
})

window.addEventListener('load', () => {
  if (screen.width < 1025) {
    tab()
  }
})
