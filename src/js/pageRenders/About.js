import Highway from '@dogstudio/highway'
import aboutLoader from '../loaders/aboutLoader.js'

class About extends Highway.Renderer {

  onEnterCompleted() {
    aboutLoader()
    document.body.style.overflow = 'initial'
    document.body.style.overflowX = 'hidden'
    document.body.style.height = 'auto'
    document.body.style.width = 'auto'
    document.body.classList = ''
    document.querySelector('.navbar').classList.add('interview-page')
  }
}
// Don`t forget to export your renderer
export default About
