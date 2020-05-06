import Highway from '@dogstudio/highway'


class CustomRendererAbout extends Highway.Renderer {

  onEnterCompleted() {

    console.log('test')
    document.body.style.overflow = 'initial'
  }
}
// Don`t forget to export your renderer
export default CustomRendererAbout
