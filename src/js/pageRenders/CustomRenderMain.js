import Highway from '@dogstudio/highway'

import Clock from '../ScrollSlider/Clock'
import loader from '../loaders/loader'
import MainTimer from '../MainTimer'
import clone from '../clone'

class CustomRendererMain extends Highway.Renderer {

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

    // document.body.addEventListener('click', (e) => {
    //   if(e.target.classList.contains('tabs__item')) 
    //     clock.destroy()
    // })

    document.querySelector('.navbar').style.position = 'fixed'

    const names = [...document.querySelectorAll('.br')]
    const namesWrapper = [...document.querySelectorAll('.header__name-wrapper')]
    for (const name of names) {
      name.innerHTML = name.innerHTML.replace(/\s/, '<br>')
    }


    namesWrapper.forEach(el => el.addEventListener('click', clone.bind(el, 'header__name', 'header__description')))
  }
}
// Don`t forget to export your renderer
export default CustomRendererMain
