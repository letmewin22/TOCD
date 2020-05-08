import Highway from '@dogstudio/highway'


class CustomRendererAbout extends Highway.Renderer {

  onEnterCompleted() {

    document.body.style.overflow = 'initial'
    document.body.style.height = 'auto'
    document.body.classList = ''
    document.querySelector('.navbar').style.position = 'absolute'
  }
}
// Don`t forget to export your renderer
export default CustomRendererAbout
