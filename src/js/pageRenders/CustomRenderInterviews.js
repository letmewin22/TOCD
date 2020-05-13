import Highway from '@dogstudio/highway'

import scrollDirection from '../scrollDirection'
import Slideshow from '../slider/Slideshow.js'
import interviewLoader from '../loaders/interviewLoader'
import rewealSlider from '../rewealSlider'

class CustomRendererInterviews extends Highway.Renderer {
  onEnterCompleted() {

    scrollDirection()
    
    for (const item of document.querySelectorAll('.slideshow')) {
      new Slideshow(item)
    }
    
    document.body.style.overflow = 'initial'
    document.body.style.height = 'auto'
    document.body.style.overflowX = 'hidden'
    document.body.style.width = 'auto'

    document.querySelector('.navbar').style.position = 'absolute'

    if (!document.body.classList.contains('transitioned')) {
      interviewLoader()
    }
    rewealSlider()

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
  }
}
// Don`t forget to export your renderer
export default CustomRendererInterviews
