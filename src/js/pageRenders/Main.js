import Highway from '@dogstudio/highway'

import Clock from '../ScrollSlider/Clock'
import loader from '../loaders/loader'
import MainTimer from '../MainTimer'
import clone from '../clone'

class Main extends Highway.Renderer {

  onEnterCompleted() {

    new MainTimer()

    setInterval(() => {
      new MainTimer()
    }, 3000)

    const items = [...document.querySelectorAll('.header__name-wrapper')]
    const wrapper = document.querySelector('.first-strip')

    const shuffleItems = () => {

      wrapper.innerHTML = ''
      const shuffledItems = items.sort(() => {
        return 0.5 - Math.random()
      })
      shuffledItems.map(el => {

        wrapper.appendChild(el)
      })
    }
    shuffleItems()

    const clock = new Clock(document.querySelector('.header__names .container'), true)
    loader(() => clock.render())

    document.querySelector('.navbar').style.position = 'fixed'

    // const names = [...document.querySelectorAll('.br')]
    const names2 = [...document.querySelectorAll('.header__name')]
    const text = [...document.querySelectorAll('.header__name-wrapper p')]
    text.forEach(el => el.classList.add('header__description'))

    // for (const name of names) {
    //   name.innerHTML = name.innerHTML.replace(/\s/, '<br>')
    // }
    function isMacintosh() {
      return navigator.platform.indexOf('Mac') > -1
    }
    
    names2.forEach(el => el.addEventListener('click', (event) => {
      const key = isMacintosh() ? event.metaKey : event.ctrlKey
      if (!key)
        clone.call(el, 'header__name', 'header__description')
    }))
  }
}
// Don`t forget to export your renderer
export default Main
