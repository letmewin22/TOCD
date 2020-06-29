import Highway from '@dogstudio/highway'
import './lib/smoothscroll'
import Nav from './Nav.js'
import Filter from './Filter.js'
import clone from './clone'
import scrollDirection from './scrollDirection'

import {Main, Interview, About} from './pageRenders'
import {SimpleTransition, InterviewTransition} from './transitions'

import tab from './tabs'
import moveEl from './lib/moveEl'
import { langCurrentPage } from './lang'


const H = new Highway.Core({
  renderers: {
    main: Main,
    interview: Interview,
    about: About
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

  moveEl()
  scrollDirection()
  langCurrentPage()

  // const names = [...document.querySelectorAll('.br')]
  // for (const name of names) {
  //   name.innerHTML = name.innerHTML.replace(/\s/, '<br>')
  // }

  const text = [...document.querySelectorAll('.filter-window__text p')]
  text.forEach(el => el.classList.add('filter-window__description'))

  const filter = new Filter()
  filter.render()

  function isMacintosh() {
    return navigator.platform.indexOf('Mac') > -1
  }

  document.querySelectorAll('.filter-window__h2').forEach(el => el.addEventListener('click', (event) => {
    const h1 = document.querySelector('.interview-header__h1') || document.querySelector('h1')
    const key = isMacintosh() ? event.metaKey : event.ctrlKey
    if (!key) {
      if (el.innerText.replace(/\s/g, '').toLowerCase() !==
        h1.innerText.replace(/\<br>/, '').replace(/\s/g, '').toLowerCase()
      ) {
        clone.call(el, 'filter-window__h2', 'filter-window__description')
      }
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
  moveEl()
  langCurrentPage()
  scrollDirection()
})

