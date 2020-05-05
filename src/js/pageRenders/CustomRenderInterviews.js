import Highway from '@dogstudio/highway'
import filter from '../filter.js'


class CustomRendererInterviews extends Highway.Renderer {

  onEnterCompleted() {
    filter()
  }
}
// Don`t forget to export your renderer
export default CustomRendererInterviews
