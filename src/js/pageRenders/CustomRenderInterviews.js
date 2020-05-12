import Highway from '@dogstudio/highway'

import filter from '../filter.js'
import scrollDirection from '../scrollDirection'
import Slideshow from '../slider/Slideshow.js'
import interviewLoader from '../loaders/interviewLoader'
import rewealSlider from '../rewealSlider'

class CustomRendererInterviews extends Highway.Renderer {
  onEnterCompleted() {
    filter()
    scrollDirection()
    new Slideshow(document.querySelector('.slideshow'))
    document.body.style.overflow = 'initial'
    document.body.style.height = 'auto'
    document.querySelector('.navbar').style.position = 'absolute'

    if (!document.body.classList.contains('transitioned')) {
      interviewLoader()
    }
    rewealSlider()

    const randomizerItems = document.querySelectorAll(
      '.interview-randomizer__item',
    )
    const h1 =
      document.querySelector('.clicked') || document.querySelector('h1')
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
