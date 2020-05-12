
// The navigation class. Controls the .boxnav animations (e.g. pagination animation).
export default class Navigation {
  constructor(el, settings) {
    this.DOM = { el: el }

    this.settings = {
      next: () => { return false },
      prev: () => { return false }
    }
    Object.assign(this.settings, settings)

    // Navigation controls (prev and next)
    this.DOM.prevCtrl = this.DOM.el.querySelector('.boxnav__item--prev')
    this.DOM.nextCtrl = this.DOM.el.querySelector('.boxnav__item--next')
    // The current and total pages elements.
    this.initEvents()
  }

  initEvents() {
    this.DOM.prevCtrl.addEventListener('click', () => this.settings.prev())
    this.DOM.nextCtrl.addEventListener('click', () => this.settings.next())
  }
}
