import Highway from '@dogstudio/highway'
import './lib/smoothscroll'
import Nav from './Nav.js'
import Filter from './Filter.js'
import clone from './clone'

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

  const names = [...document.querySelectorAll('.br')]
  for (const name of names) {
    name.innerHTML = name.innerHTML.replace(/\s/, '<br>')
  }

  const filter = new Filter()
  filter.render()

  document.querySelectorAll('.filter-window__item').forEach(el => el.addEventListener('click', clone.bind(el, 'filter-window__h2', 'filter-window__description')))
})

