import { TimelineMax, Power2 } from 'gsap'

const rewealSlider = () => {
  const img = document.querySelector('.interview-header__image')
  const slider = document.querySelector('.slideshow-wrapper')
  const sliderContent = slider.querySelector('.slideshow')
  let isAnimating = false

  img.addEventListener('click', () => {

    if (isAnimating) return
    isAnimating = true

    document.body.style.cursor = 'wait'
    const clone = img.cloneNode(true)

    clone.style.width = img.getBoundingClientRect().width + 'px'
    clone.style.height = img.getBoundingClientRect().height + 'px'
    clone.style.left = img.getBoundingClientRect().x + 'px'
    clone.style.top = img.getBoundingClientRect().y + 'px'
    clone.style.position = 'fixed'

    document.body.appendChild(clone)
    img.style.opacity = 0

    let tl = new TimelineMax({
      onComplete: () => {
        document.body.removeChild(clone)
        document.body.style.cursor = 'auto'
        isAnimating = false
      },
    })
    tl.to(clone, 0.9, {
      left: '50%',
      top: '50%',
      y: '-50%',
      x: '-50%',
      scale: 1,
      zIndex: '100000',
      width: sliderContent.getBoundingClientRect().width + 'px',
      height: sliderContent.getBoundingClientRect().height + 'px',
      ease: Power2.easeInOut,
    })

      .to(slider, 0.01, { y: '0%', ease: Power2.easeInOut }, 0.2)
      .to(slider, 0.5, { opacity: 1, ease: Power2.easeInOut }, 0.2)
      .to(sliderContent, 0.01, { opacity: 1, ease: Power2.easeInOut })
  })

  document.querySelector('.slideshow-close').addEventListener('click', () => {

    if (isAnimating) return
    isAnimating = true

    const current = document.querySelector('.slide--current')

    const newClone = current.querySelector('.slide__img').cloneNode(true)

    newClone.style.width = current.querySelector('.slide__img').getBoundingClientRect().width + 'px'
    newClone.style.height = current.querySelector('.slide__img').getBoundingClientRect().height + 'px'
    newClone.style.left = current.querySelector('.slide__img').getBoundingClientRect().x + 'px'
    newClone.style.top = current.querySelector('.slide__img').getBoundingClientRect().y + 'px'
    newClone.style.position = 'fixed'
    newClone.style.zIndex = '100000'

    document.body.appendChild(newClone)
    sliderContent.style.opacity = 0

    img.style.backgroundImage = getComputedStyle(current.querySelector('.slide__img')).backgroundImage

    let tl = new TimelineMax({
      onComplete: () => {
        img.style.opacity = 1
        document.body.removeChild(newClone)
        isAnimating = false
      },
    })
    tl
      .to(newClone, 0.9, {
        left: img.getBoundingClientRect().x + 'px',
        top: img.getBoundingClientRect().y + 'px',
        width: img.getBoundingClientRect().width + 'px',
        height: img.getBoundingClientRect().height + 'px',
        ease: Power2.easeInOut
      }, 0)
      .to(slider, 0.5, { opacity: 0 }).to(slider, 0.01, { y: '-100%' }, 0.2)
      .to(newClone, 0.01, { zIndex: '1', ease: Power3.easeInOut }, 0.2)

  })
}

export default rewealSlider
