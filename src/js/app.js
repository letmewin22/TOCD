import Highway from '@dogstudio/highway'
import './lib/smoothscroll'
import tab from './tabs'

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
  if (screen.width < 1025) {
    tab()
  }
})
