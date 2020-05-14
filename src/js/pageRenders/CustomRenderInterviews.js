import Highway from '@dogstudio/highway'

import scrollDirection from '../scrollDirection'
import Slideshow from '../slider/Slideshow.js'
import interviewLoader from '../loaders/interviewLoader'
import mutationObserver from '../mutationObserver'
import RewealSlider from '../slider/rewealSlider'
import filter from '../filter.js'

class CustomRendererInterviews extends Highway.Renderer {
  
  onEnterCompleted() {

    scrollDirection()

    filter(document.querySelectorAll('.interview-randomizer__filter-btn'))

    const articles = document.querySelectorAll('article')

    for (const article of articles) {

      new Slideshow(article.querySelector('.slideshow'))

      new RewealSlider({
        img: article.querySelector('.interview-header__image'), 
        slider: article.querySelector('.slideshow-wrapper')
      })

      // console.log(article.getAttribute('data-tags').split(',').map(el => el.trim()))
    }
    
    document.body.style.overflow = 'initial'
    document.body.style.height = 'auto'
    document.body.style.overflowX = 'hidden'
    document.body.style.width = 'auto'

    document.querySelector('.navbar').style.position = 'absolute'

    if (!document.body.classList.contains('transitioned')) {
      interviewLoader()
    }

    // mutationObserver((el) => {

    //   console.log(el.addedNodes)
      
    //   const img = el.addedNodes[9].querySelector('.interview-header__image')
    //   const slider = el.addedNodes[9].querySelector('.slideshow-wrapper')
    //   const slideshow = el.addedNodes[9].querySelector('.slideshow')
  
    //   new Slideshow(slideshow)
  
    //   new RewealSlider({img, slider})
  
    // })
    
    const randomizerItems = document.querySelectorAll('.interview-randomizer__item')
    const h1 = document.querySelector('.clicked') || document.querySelector('h1')

    randomizerItems.forEach((el) => {
      el.classList.remove('active')
      if (
        el.querySelector('h3').innerText.replace(/\s/g, '').toLowerCase() ===
        h1.innerText.replace(/\<br>/, '').replace(/\s/g, '').toLowerCase()
      ) {
        el.classList.add('active')
      }
    })

    const items = [...document.querySelectorAll('.interview-randomizer__item')]
    const randomizeBtn = document.querySelector('.interview-randomizer__random-btn')

    const shuffleItems = () => {

      items.forEach(el => el.classList.remove('show'))

      const shuffledItems = items.sort(() => {
        return 0.5 - Math.random()
      })

      for (let i = 0; i < 6; i++) {
        shuffledItems[i].classList.add('show')
      }

    }

    shuffleItems()

    randomizeBtn.addEventListener('click', shuffleItems)
  }
}
// Don`t forget to export your renderer
export default CustomRendererInterviews
