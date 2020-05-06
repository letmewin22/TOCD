import Highway from '@dogstudio/highway'
import filter from '../filter.js'


class CustomRendererInterviews extends Highway.Renderer {

  onEnterCompleted() {
    filter()
    document.body.style.overflow = 'initial'
    document.body.style.height = 'auto'
    document.body.classList = ''
  }
}
// Don`t forget to export your renderer
export default CustomRendererInterviews
