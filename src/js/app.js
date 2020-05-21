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
import tab from './tabs'


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

const curLink = () => {

  const links = [...document.querySelectorAll('.navbar__link a'), document.querySelector('.navbar__logo')]

  for (let i = 0; i < links.length; i++) {
    const link = links[i]
 
    link.classList.remove('is-active')
  
    if (link.href === location.href) {
      link.classList.add('is-active')
    }
  }
}


window.addEventListener('load', () => {
  document.body.style.cursor = 'auto'
  curLink()
  new Nav()

  const names = [...document.querySelectorAll('.br')]
  for (const name of names) {
    name.innerHTML = name.innerHTML.replace(/\s/, '<br>')
  }

  const filter = new Filter()
  filter.render()

  document.querySelectorAll('.filter-window__item').forEach(el => el.addEventListener('click', () => {

    const h1 = document.querySelector('.interview-header__h1') || document.querySelector('h1')

    if (el.querySelector('h2').innerText.replace(/\s/g, '').toLowerCase() !==
          h1.innerText.replace(/\<br>/, '').replace(/\s/g, '').toLowerCase()
    ) {
      clone.call(el, 'filter-window__h2', 'filter-window__description')
    }
  }))

  window.addEventListener('resize', () => {
    if (screen.width < 1025) {
      tab()
    }
  })

  if (screen.width < 1025) {
    tab()
  }
})



H.on('NAVIGATE_IN', () => {
  
  curLink()
})

