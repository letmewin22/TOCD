export default class ScrollSlider {

  constructor(strip, skew) {

    this.strip = strip
    this.skew = skew

    this.clockItems1 = [...document.querySelectorAll('#clock_slider .line')]
    this.clockItems2 = [...document.querySelectorAll('#clock_slider-2 .line')]

    this.isAnimating = false
    this.direction = window.innerWidth > window.innerHeight ? 'vertical' : 'horizontal'
    this.ticker = null

  }

  render() {
    this.setup()
    this.scrollHandler()
  }

  setup() {

    if (this.direction === 'vertical') {

      document.body.style.height = this.strip.getBoundingClientRect().width - window.innerHeight + 'px'
      document.documentElement.scrollTop = 1

      this.currentPixel = window.pageYOffset

      this.stripPercent = window.innerWidth / this.strip.getBoundingClientRect().width * 100

      this.step = (document.body.getBoundingClientRect().height - window.innerHeight) / this.clockItems1.length

      window.addEventListener('resize', () => {
        
        this.direction = window.innerWidth > window.innerHeight ? 'vertical' : 'horizontal'

        document.body.style.height = this.strip.getBoundingClientRect().width - window.innerHeight + 'px'
        this.currentPixel = window.pageYOffset

        this.stripPercent = window.innerWidth / this.strip.getBoundingClientRect().width * 100
        this.step = (document.body.getBoundingClientRect().height - window.innerHeight) / this.clockItems1.length
      })
    } else {
      this.mobileSetup()
    }
  }

  mobileSetup() {

    document.body.style.overflowY = 'hidden'
    document.body.style.overflowX = 'scroll'

    let vh = window.innerHeight * 0.01
    document.body.style.setProperty('--vh', `${vh}px`)
    document.body.style.height = 'calc( var(--vh, 1vh) * 100)'
    
    document.body.style.width = this.strip.getBoundingClientRect().width - window.innerWidth + 'px'
    document.documentElement.scrollLeft = 1

    this.currentPixel = window.pageXOffset

    this.stripPercent = window.innerWidth / this.strip.getBoundingClientRect().width * 100

    this.step = (document.body.getBoundingClientRect().width - window.innerWidth) / this.clockItems1.length

    window.addEventListener('resize', () => {

      vh = window.innerHeight * 0.01
      document.body.style.setProperty('--vh', `${vh}px`)
      document.body.style.height = 'calc( var(--vh, 1vh) * 100)'

      document.body.style.width = this.strip.getBoundingClientRect().width - window.innerWidth + 'px'
      this.currentPixel = window.pageXOffset

      this.stripPercent = window.innerWidth / this.strip.getBoundingClientRect().width * 100
      this.step = (document.body.getBoundingClientRect().width - window.innerWidth) / this.clockItems1.length
    })
  }

  scrollHandler() {
 
    if (this.direction === 'vertical') {

      this.winScroll = document.documentElement.scrollTop
      this.winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      this.percent = this.winScroll / this.winHeight * (100 - this.stripPercent)

      this.newPixel = window.pageYOffset
      this.diff = this.newPixel - this.currentPixel
      
      if(this.skew) {
        this.strip.classList.contains('distortion') ?
          this.strip.style.transform = `translateX(${-this.percent}%) skewX(${-this.diff * 0.3}deg)` :
          this.strip.style.transform = `translateX(${-this.percent}%)`

      } else {
        this.strip.style.transform = `translateX(${-this.percent}%)`
      }

      this.currentPixel = this.newPixel

      for (let i = 0; i < this.clockItems2.length; i++) {
        this.clockItems1[i].classList.remove('active')

        if (Math.floor(document.documentElement.scrollTop / this.step) < this.clockItems1.length)
          this.clockItems1[Math.floor(document.documentElement.scrollTop / this.step)].classList.add('active')
      }

      if (document.documentElement.classList.contains('filtered')) {
        window.scrollTo(0, 1)
        this.strip.style.transform = 'translateX(0%)'
        document.documentElement.classList.remove('filtered')
      }
    } else {
      this.mobileScrollHandler()
    }
    this.ticker = window.requestAnimationFrame(this.scrollHandler.bind(this))
  }

  mobileScrollHandler() {

    this.winScroll = document.documentElement.scrollLeft
    this.winHeight = document.documentElement.scrollWidth - document.documentElement.clientWidth
    this.percent = this.winScroll / this.winHeight * (100 - this.stripPercent)

    this.newPixel = window.pageXOffset
    this.diff = this.newPixel - this.currentPixel

    if(this.skew) {
      this.strip.classList.contains('distortion') ?
        this.strip.style.transform = `translateX(${-this.percent}%) skewX(${-this.diff * 0.15}deg)` :
        this.strip.style.transform = `translateX(${-this.percent}%)`
    } else {
      this.strip.style.transform = `translateX(${-this.percent}%)`
    }
    this.currentPixel = this.newPixel
    
    for (let i = 0; i < this.clockItems2.length; i++) {
      this.clockItems1[i].classList.remove('active')

      if (Math.floor(document.documentElement.scrollLeft / this.step) < this.clockItems1.length && Math.floor(document.documentElement.scrollLeft / this.step) >= 0)
        this.clockItems1[Math.floor(document.documentElement.scrollLeft / this.step)].classList.add('active')
    }

    if (document.documentElement.classList.contains('filtered')) {
      window.scrollTo(1, 0)
      this.strip.style.transform = 'translateX(0%)'
      document.documentElement.classList.remove('filtered')
    }
  }

  destroy() {
    cancelAnimationFrame(this.ticker)

    document.body.style.overflow = 'auto'
    document.body.style.height = 'auto'
    document.body.style.width = 'auto'
  }
}
