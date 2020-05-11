import { TimelineMax } from 'gsap'

export default class Nav {

  constructor() {

    this.burger = document.querySelector('.burger')
    this.navItems = document.querySelector('.navbar__links')
    this.navItem = document.querySelectorAll('.navbar__link')
    this.navUI = document.querySelector('.navbar__left')

    this.render()
  }

  render() {

    if (screen.width < 1025) {
      this.burger.addEventListener('click', this.burgerHandler.bind(this))
      this.navUI.addEventListener('click', this.navClose.bind(this))
      this.navItem.forEach(el => el.addEventListener('click', this.navClose.bind(this)))
    }
  }

  burgerHandler() {
    this.burger.classList.contains('open') ? this.navClose() : this.navOpen()
  }

  navOpen() {

    this.burger.classList.add('open')
    this.navUI.classList.add('open')

    this.openAnim()
  }

  navClose() {

    this.closeAnim(() => {
      this.burger.classList.remove('open')
      this.navUI.classList.remove('open')
    })
  }

  openAnim() {

    const tl = new TimelineMax()

    tl
      .to(this.navItems, 0.01, { display: 'flex' })
      .fromTo(this.navItems, 1, { y: '-100%', backgroundColor: '#d3d1cf' }, { y: '0%', backgroundColor: '#fff', ease: Power3.easeInOut }, 0)
      .staggerFromTo(this.navItem, 1, { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: Power3.easeOut }, 0.2, 0.75)
      .staggerFromTo(this.navItems.querySelectorAll('.navbar__line'), 1, { width: 0 }, { width: '100%', ease: Power3.easeOut }, 0.2, 1.3)
  }

  closeAnim(callback) {

    const tl = new TimelineMax({ onComplete: callback })

    tl
      .staggerFromTo(this.navItems.querySelectorAll('.navbar__line'), 1, { width: '100%' }, { width: 0, ease: Power3.easeOut }, 0.2, 0)
      .staggerFromTo(this.navItem, 0.6, { y: 0, opacity: 1 }, { y: -60, opacity: 0, ease: Power2.easeIn }, 0.05, 0.5)
      .fromTo(this.navItems, 1, { y: '0%', backgroundColor: '#fff' }, { y: '-100%', backgroundColor: '#d3d1cf', ease: Power3.easeInOut }, 1)
      .to(this.navItems, 0.01, { display: 'none' })
  }
}
