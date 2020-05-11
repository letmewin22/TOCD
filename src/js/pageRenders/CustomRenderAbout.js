import Highway from '@dogstudio/highway'
import aboutLoader from '../loaders/aboutLoader.js'


class CustomRendererAbout extends Highway.Renderer {

  onEnterCompleted() {
    aboutLoader()
    document.body.style.overflow = 'initial'
    document.body.style.height = 'auto'
    document.body.classList = ''
    document.querySelector('.navbar').style.position = 'absolute'
  }
}
// Don`t forget to export your renderer
export default CustomRendererAbout
