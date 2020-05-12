import { TimelineMax, Power2 } from 'gsap'

const rewealSlider = () => {

  const img = document.querySelector('.interview-header__image')
  const slider = document.querySelector('.slideshow-wrapper')
  const sliderContent = slider.querySelector('.slideshow')

  img.addEventListener('click', () => {

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
        img.style.opacity = 1
      }
    })
    tl
      .to(clone, 1, {
        left: '50%',
        top: '50%',
        y: '-50%',
        x: '-50%',
        scale: 1,
        zIndex: '100000',
        width: sliderContent.getBoundingClientRect().width + 'px',
        height: sliderContent.getBoundingClientRect().height + 'px',
        ease: Power2.easeInOut
      })
      
      .to(slider, 0.01, { y: '0%', ease: Power2.easeInOut }, 0.7)
      .to(slider, 0.5, { opacity: 1, ease: Power2.easeInOut }, 0.7)
  })

  document.querySelector('.slideshow-close').addEventListener('click', () => {
    let tl = new TimelineMax()
    tl
      .to(slider, 0.5, {opacity: 0 })
      .to(slider, 0.01, {y: '-100%' })
    
    // const slides = document.querySelectorAll('.slide')

    // for (let i = 0; i < slides.length; i++) {
    //   slides[i].classList.remove('slide--current')
    //   slides[0].classList.add('slide--current')
    // }
  })
}

export default rewealSlider
