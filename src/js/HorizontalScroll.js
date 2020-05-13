import { TimelineMax, Power3 } from 'gsap'

export default class MainSlider {

  constructor() {

    this.strip = document.querySelector('.header__names .container')
    this.clockItems1 = [...document.querySelectorAll('#clock_slider .line')]
    this.clockItems2 = [...document.querySelectorAll('#clock_slider-2 .line')]
    this.item = document.querySelector('.header')
    this.isAnimating = false

    this.setup()
    this.scrollHandler()

    this.clockItems2.forEach(el => el.addEventListener('click', this.clockClick.bind(this, el)))
    this.clockItems2.forEach((el, index) => el.addEventListener('mouseenter', this.clockHover.bind(this, el, index)))
    this.clockItems2.forEach((el, index) => el.addEventListener('mouseleave', this.clockHoverOut.bind(this, el, index)))

  }

  setup() {

    document.body.style.width = this.strip.getBoundingClientRect().width - window.innerWidth + 'px'
    document.documentElement.scrollLeft = 1

    this.currentPixel = window.pageXOffset

    this.stripPercent = window.innerWidth / this.strip.getBoundingClientRect().width * 100

    this.step = (document.body.getBoundingClientRect().width - window.innerWidth) / this.clockItems1.length

    window.addEventListener('resize', () => {

      document.body.style.width = this.strip.getBoundingClientRect().width - window.innerWidth + 'px'
      this.currentPixel = window.pageXOffset

      this.stripPercent = window.innerWidth / this.strip.getBoundingClientRect().width * 100
      this.step = (document.body.getBoundingClientRect().width - window.innerWidth) / this.clockItems1.length
    })
  }

  scrollHandler() {

    if (document.querySelector('[data-router-view]').getAttribute('data-router-view') === 'main') {

      this.winScroll = document.documentElement.scrollLeft
      this.winHeight = document.documentElement.scrollWidth - document.documentElement.clientWidth
      this.percent = this.winScroll / this.winHeight * (100 - this.stripPercent)

      this.newPixel = window.pageXOffset
      this.diff = this.newPixel - this.currentPixel

      this.strip.classList.contains('distortion') ?
        this.strip.style.transform = `translateX(${-this.percent}%) skewX(${-this.diff * 0.3}deg)` :
        this.strip.style.transform = `translateX(${-this.percent}%)`

      this.currentPixel = this.newPixel

      for (let i = 0; i < this.clockItems2.length; i++) {
        this.clockItems1[i].classList.remove('active')

        if (Math.floor(document.documentElement.scrollLeft / this.step) < this.clockItems1.length)
          this.clockItems1[Math.floor(document.documentElement.scrollLeft / this.step)].classList.add('active')
      }

      if (document.documentElement.classList.contains('filtered')) {
        window.scrollTo(0, 1)
        this.strip.style.transform = 'translateX(0%)'
        document.documentElement.classList.remove('filtered')
      }
      window.requestAnimationFrame(this.scrollHandler.bind(this))
    }
  }

  clockClick(elem) {
    if (this.isAnimating) return
    this.isAnimating = true
    this.strip.classList.remove('distortion')
    const scrollPos = (Math.floor(this.step) * (elem.getAttribute('id').replace(/\D/g, '')))

    const tl = new TimelineMax({
      onComplete: () => {
        this.strip.classList.add('distortion')
        this.isAnimating = false
      }
    })
    tl
      .to(document.documentElement, 2, { scrollLeft: scrollPos, ease: Power3.easeOut }, 0)
  }

  clockHover(elem, index) {
    this.clockItems1[index].style.strokeWidth = '2px'
  }

  clockHoverOut(elem, index) {
    this.clockItems1[index].style.strokeWidth = '1px'
  }
}
