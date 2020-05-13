import Highway from '@dogstudio/highway'
import './lib/smoothscroll'
import Nav from './Nav.js'

import CustomRendererMain from './pageRenders/CustomRenderMain'
import CustomRendererInterviews from './pageRenders/CustomRenderInterviews'
import CustomRendererAbout from './pageRenders/CustomRenderAbout'

import SimpleTransition from './transitions/SimpleTransition'
import InterviewTransition from './transitions/InterviewTransition'


const H = new Highway.Core({
  renderers: {
    main: CustomRendererMain,
    interview: CustomRendererInterviews,
    about: CustomRendererAbout
  },
  transitions: {
    default: SimpleTransition,
    contextual: {
      toInterview: InterviewTransition
    }
  }
})

window.addEventListener('load', () => {
  document.body.style.cursor = 'auto'
  new Nav()
})


