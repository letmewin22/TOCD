import { TimelineMax } from 'gsap'

export default class MainSlider {

  constructor() {

    this.strip = document.querySelector('.header__names')
    this.clockItems = [...document.querySelectorAll('.line')]
    this.item = document.querySelector('.header')

    this.setup()
    this.scrollHandler()

    this.clockItems.forEach(el => el.addEventListener('click', this.clockClick.bind(this, el)))

  }

  setup() {

    document.body.style.height = this.strip.getBoundingClientRect().width - window.innerHeight + 'px'
    document.documentElement.scrollTop = 1

    this.step = (document.body.getBoundingClientRect().height - window.innerHeight) / this.clockItems.length

    window.addEventListener('resize', () => {
      document.body.style.height = this.strip.getBoundingClientRect().width - window.innerHeight + 'px'
    })
  }

  scrollHandler() {

    if (document.querySelector('[data-router-view]').getAttribute('data-router-view') === 'main') {

      this.item.scrollLeft = -document.body.getBoundingClientRect().y

      for (let i = 0; i < this.clockItems.length; i++) {
        this.clockItems[i].classList.remove('active')
        this.clockItems[Math.floor(this.item.scrollLeft / this.step)].classList.add('active')
      }

      if ((this.item.scrollLeft >= (Math.floor(document.body.getBoundingClientRect().height - window.innerHeight)) - window.innerWidth * 0.03)) {
        window.scrollTo(0, 1)
      } else if (this.item.scrollLeft === 0) {
        window.scrollTo(0, (Math.floor(document.body.getBoundingClientRect().height - window.innerHeight) - window.innerWidth * 0.035))
      }
      window.requestAnimationFrame(this.scrollHandler.bind(this))
    }
  }

  clockClick(elem) {

    const scrollPos = (Math.floor(this.step) * (elem.getAttribute('id').replace(/\D/g, '')))

    const tl = new TimelineMax()
    tl
      .to(document.documentElement, 2, { scrollTop: scrollPos, ease: Power3.easeOut }, 0)
  }
}
