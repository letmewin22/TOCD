export default class MouseEvent {

  constructor(elem, handler) {
    this.elem = elem || window
    this.handler = handler || function() { }

    this.init()
  }
  init() {
    if (this.elem.addEventListener) {
      if ('onwheel' in document) {
        // IE9+, FF17+
        this.elem.addEventListener('wheel', this.handler, {passive: false})
      } else if ('onmousewheel' in document) {
        // устаревший вариант события
        this.elem.addEventListener('mousewheel',
          this.handler,
          {passive: false}
        )
      } else {
        // 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
        this.elem.addEventListener(
          'MozMousePixelScroll',
          this.handler,
          {passive: false}
        )
      }
    }
  }

  destroy() {
    if (this.elem.removeEventListener) {
      if ('onwheel' in document) {
        // IE9+, FF17+
        this.elem.removeEventListener('wheel', this.handler, {passive: false})
      } else if ('onmousewheel' in document) {
        // устаревший вариант события
        this.elem.removeEventListener('mousewheel',
          this.handler,
          {passive: false}
        )
      } else {
        // 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
        this.elem.removeEventListener(
          'MozMousePixelScroll',
          this.handler,
          {passive: false}
        )
      }
    }
  }
}
