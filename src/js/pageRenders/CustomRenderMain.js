import Highway from '@dogstudio/highway'

import MainSlider from '../mainSlider.js'
import loader from '../loader.js'
import DetectDate from '../date.js'
import filter from '../filter.js'
import { TimelineMax } from 'gsap'

class CustomRendererMain extends Highway.Renderer {

  onEnterCompleted() {

    new DetectDate()
    setInterval(() => {
      new DetectDate()
    }, 3000)
    loader(() => new MainSlider)
    
    filter()

    const names = [...document.querySelectorAll('.header__name')]
    const namesWrapper = [...document.querySelectorAll('.header__name-wrapper')]
    for (const name of names) {
      name.innerHTML = name.innerHTML.replace(/\s/, '<br>')
    }

    const clone = function() {

      const duplicatedNode = this.cloneNode(true)
      duplicatedNode.style.position = 'fixed'
      duplicatedNode.style.textAlign = 'center'
      duplicatedNode.style.left = this.getBoundingClientRect().x + 'px'
      duplicatedNode.style.top = this.getBoundingClientRect().y + 'px'
      // duplicatedNode.querySelector('h2').style.lineHeight = '0.89em'
      duplicatedNode.style.lineHeight = '0.89em'
      duplicatedNode.style.zIndex = '1000'
      duplicatedNode.classList.add('clicked')
      this.style.opacity = '0'
      document.body.appendChild(duplicatedNode)
    }

    names.forEach(el => el.addEventListener('click', clone))
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
