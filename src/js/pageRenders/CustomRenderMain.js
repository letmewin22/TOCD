import Highway from '@dogstudio/highway'

import MainSlider from '../MainSlider.js'
import loader from '../loader.js'
import MainTimer from '../MainTimer.js'
import filter from '../filter.js'
import { TimelineMax } from 'gsap'

class CustomRendererMain extends Highway.Renderer {

  onEnterCompleted() {

    new MainTimer()
    setInterval(() => {
      new MainTimer()
    }, 3000)
    loader(() => new MainSlider)

    filter()
    document.querySelector('.navbar').style.position = 'fixed'

    const names = [...document.querySelectorAll('.header__name')]
    const namesWrapper = [...document.querySelectorAll('.header__name-wrapper')]
    for (const name of names) {
      name.innerHTML = name.innerHTML.replace(/\s/, '<br>')
    }

    const clone = function() {

      const duplicatedH2 = document.createElement('h1')
      duplicatedH2.classList.add('header__name')
      duplicatedH2.innerHTML = this.querySelector('h2').innerHTML

      duplicatedH2.style.position = 'fixed'
      duplicatedH2.style.textAlign = 'center'
      duplicatedH2.style.left = this.querySelector('h2').getBoundingClientRect().x + 'px'
      duplicatedH2.style.top = this.querySelector('h2').getBoundingClientRect().y + 'px'
      duplicatedH2.style.lineHeight = '0.89em'
      duplicatedH2.style.zIndex = '1000'

      duplicatedH2.classList.add('clicked')
      this.style.opacity = '0'

      document.body.appendChild(duplicatedH2)

      const duplicatedText = document.createElement('p')
      duplicatedText.classList.add('header__description')
      duplicatedText.innerHTML = this.querySelector('p').innerHTML

      duplicatedText.style.position = 'fixed'
      duplicatedText.style.textAlign = 'center'
      duplicatedText.style.left = this.querySelector('p').getBoundingClientRect().x + 'px'
      duplicatedText.style.top = this.querySelector('p').getBoundingClientRect().y + 'px'
      duplicatedText.style.width = this.querySelector('p').getBoundingClientRect().width + 'px'
      duplicatedText.style.marginTop = 0
      // duplicatedText.style.lineHeight = '0.89em'
      duplicatedText.style.zIndex = '1000'

      duplicatedText.classList.add('text-clicked')
      document.body.appendChild(duplicatedText)
    }

    namesWrapper.forEach(el => el.addEventListener('click', clone))
    // const reviewsArr = []
    // const wrapper = document.querySelector('.header__names .container')

    // const url = 'https://test-db-tocd.firebaseio.com/db.json'


    // const fetchReviews = (arr) => {
    //   return fetch(url)
    //     .then(response => response.json())
    //     .then(response => {
    //       return response ?
    //         Object.keys(response).map(key => {
    //           arr.push(response[key])
    //         }) : []
    //     })
    // }

    // window.addEventListener('load', () => {

    //   fetchReviews(reviewsArr)
    //     .then(() => {
    //       const reviews = reviewsArr
    //       const reviewsItem = reviews.length ?
    //         reviews.map(HTML.addToHTML).join('') :
    //         '<span>No reviews yet</span>'

    //       wrapper.innerHTML = reviewsItem + reviewsItem
    //       localStorage.setItem('people', JSON.stringify(reviews))
    //       filter()
    //     })
    // })
  }
}
// Don`t forget to export your renderer
export default CustomRendererMain
