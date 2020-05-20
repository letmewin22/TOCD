import { TimelineMax, Power2, Power3 } from 'gsap'


export default class RewealSlider {

  constructor({img, slider}) {
    
    this.img = img
    this.slider = slider
    this.sliderContent = this.slider.querySelector('.slideshow')
    this.closeBtn = this.slider.querySelector('.slideshow-close')

    this.isAnimating = false

    this.img.addEventListener('click', this.open.bind(this))
    this.closeBtn.addEventListener('click', this.close.bind(this))
  }

  open() {

    if (this.isAnimating) return
    this.isAnimating = true
    document.body.classList.add('slider-open')
    document.body.style.cursor = 'wait'
    this.clone = this.img.cloneNode(true)

    this.clone.style.width = this.img.getBoundingClientRect().width + 'px'
    this.clone.style.height = this.img.getBoundingClientRect().height + 'px'
    this.clone.style.left = this.img.getBoundingClientRect().x + 'px'
    this.clone.style.top = this.img.getBoundingClientRect().y + 'px'
    this.clone.style.position = 'fixed'

    document.body.appendChild(this.clone)
    this.img.style.opacity = 0

    this.openAnimation()

  }

  openAnimation() {
    document.querySelector('.interview-randomizer').classList.add('slider-open')
    let tl = new TimelineMax({
      onComplete: () => {
        document.body.removeChild(this.clone)
        document.body.style.cursor = 'auto'
        this.isAnimating = false
      },
    })
    tl.to(this.clone, 0.9, {
      left: '50%',
      top: '50%',
      y: '-50%',
      x: '-50%',
      scale: 1,
      zIndex: '100000',
      width: this.sliderContent.getBoundingClientRect().width + 'px',
      height: this.sliderContent.getBoundingClientRect().height + 'px',
      ease: Power2.easeInOut,
    })

      .to(this.slider, 0.01, { y: '0%', ease: Power2.easeInOut }, 0.2)
      .to(this.slider, 0.5, { opacity: 1, ease: Power2.easeInOut }, 0.2)
      .to(this.sliderContent, 0.01, { opacity: 1, ease: Power2.easeInOut })
  }

  close() {

    if (this.isAnimating) return
    this.isAnimating = true

    this.current = this.sliderContent.querySelector('.slide--current')

    this.newClone = this.current.querySelector('.slide__img').cloneNode(true)

    this.newClone.style.width = this.current.querySelector('.slide__img').getBoundingClientRect().width + 'px'
    this.newClone.style.height = this.current.querySelector('.slide__img').getBoundingClientRect().height + 'px'
    this.newClone.style.left = this.current.querySelector('.slide__img').getBoundingClientRect().x + 'px'
    this.newClone.style.top = this.current.querySelector('.slide__img').getBoundingClientRect().y + 'px'
    this.newClone.style.position = 'fixed'
    this.newClone.style.zIndex = '100000'

    document.body.appendChild(this.newClone)
    this.sliderContent.style.opacity = 0

    this.img.style.backgroundImage = getComputedStyle(this.current.querySelector('.slide__img')).backgroundImage

    this.closeAnimation()
  }

  closeAnimation() {

    let tl = new TimelineMax({
      onComplete: () => {
        this.img.style.opacity = 1
        document.body.removeChild(this.newClone)
        this.isAnimating = false
        document.body.classList.remove('slider-open')
        document.querySelector('.interview-randomizer').classList.remove('slider-open')
      },
    })

    tl
      .to(this.newClone, 0.9, {
        left: this.img.getBoundingClientRect().x + 'px',
        top: this.img.getBoundingClientRect().y + 'px',
        width: this.img.getBoundingClientRect().width + 'px',
        height: this.img.getBoundingClientRect().height + 'px',
        ease: Power2.easeInOut
      }, 0)
      .to(this.slider, 0.5, { opacity: 0 }, 0.4)
      .to(this.slider, 0.01, { y: '-100%' })
  }
}
