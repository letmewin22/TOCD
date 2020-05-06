import Highway from '@dogstudio/highway'

import mainSlider from '../mainSlider.js'
import loader from '../loader.js'
import detectDate from '../date.js'
import filter from '../filter.js'

import { HTML } from '../HTML'

class CustomRendererMain extends Highway.Renderer {

  onEnterCompleted() {

    detectDate(document.querySelector('.header__time'))
    setInterval(() => {
      detectDate(document.querySelector('.header__time'))
    }, 5000)
    loader(mainSlider)
    
    filter()

    const names = [...document.querySelectorAll('.header__name')]
    for (const name of names) {
      name.innerHTML = name.innerHTML.replace(/\s/, '<br>')
    }
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
