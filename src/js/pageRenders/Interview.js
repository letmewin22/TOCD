import Highway from '@dogstudio/highway'
import { TweenMax } from 'gsap'

// import scrollDirection from '../scrollDirection'
import Slideshow from '../slider/Slideshow.js'
import interviewLoader from '../loaders/interviewLoader'
import mutationObserver from '../mutationObserver'
import RewealSlider from '../slider/rewealSlider'
import tags from '../tags'
import shares from '../shares'

class Interview extends Highway.Renderer {

  onEnterCompleted() {

    // scrollDirection()

    const articles = document.querySelectorAll('article')

    for (const article of articles) {

      article.classList.add('added')

      new Slideshow(article.querySelector('.slideshow'))

      new RewealSlider({
        img: article.querySelector('.interview-header__image'),
        slider: article.querySelector('.slideshow-wrapper')
      })

      tags(article)
      shares(article)
    }

    document.body.style.overflow = 'initial'
    document.body.style.height = 'auto'
    document.body.style.overflowX = 'hidden'
    document.body.style.width = 'auto'

    document.querySelector('.navbar').classList.add('interview-page')

    if (!document.body.classList.contains('transitioned')) {
      interviewLoader()
    }

    mutationObserver(() => {

      const article = document.querySelector('article:not(.added)')
      const img = article.querySelector('.interview-header__image')
      const slider = article.querySelector('.slideshow-wrapper')
      const slideshow = article.querySelector('.slideshow')

      new Slideshow(slideshow)

      new RewealSlider({ img, slider })

      tags(article)
      shares(article)

      article.classList.add('added')
    })

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
      TweenMax.to(document.querySelector('.interview-randomizer__items-wrapper'), 0.3, {
        opacity: 0, onComplete: () => {
          items.forEach(el => {
            el.classList.remove('show')
          })
          const shuffledItems = items.sort(() => {
            return 0.5 - Math.random()
          })
    
          for (let i = 0; i < 6; i++) {
            shuffledItems[i].classList.add('show')
            // TweenMax.set(document.querySelector('.interview-randomizer__items-wrapper'), { opacity: 0 })
            TweenMax.to(document.querySelector('.interview-randomizer__items-wrapper'), 0.3, { opacity: 1 })
            TweenMax.to(shuffledItems[i], 0.2, {y: 0})
          }
        }
      })

    }

    shuffleItems()

    randomizeBtn.addEventListener('click', shuffleItems)
  }
  onLeave() {
    document.querySelector('.navbar').classList.remove('interview-page')
    document.querySelector('.navbar').classList.remove('bg')
  }
}
// Don`t forget to export your renderer
export default Interview
