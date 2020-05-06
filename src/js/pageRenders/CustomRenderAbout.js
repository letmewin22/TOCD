import Highway from '@dogstudio/highway'


class CustomRendererAbout extends Highway.Renderer {

  onEnterCompleted() {

    document.body.style.overflow = 'initial'
    document.body.style.height = 'auto'
    document.body.classList = ''
  }
}
// Don`t forget to export your renderer
export default CustomRendererAbout
