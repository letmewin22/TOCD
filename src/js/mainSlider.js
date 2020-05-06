import { TimelineMax } from 'gsap'

const mainSlider = () => {
  const slider = document.querySelector('.header')
  const strip = document.querySelector('.header__names')
  const pathNodes = []

  for (let i = 0; i < 48; i++) {
    pathNodes.push(document.querySelector(`.header__clock .real [id="id-${i+1}"]`))
    // const path = document.querySelectorAll(`.header__clock .real [id="id-${i}"]`)
  }

  [...pathNodes].forEach(el => {
    el.classList.add('line')
  })

  // let isDown = false
  // let startX
  // let scrollLeft


  // slider.addEventListener('mousedown', (e) => {
  //   isDown = true
  //   slider.classList.add('active')
  //   startX = e.pageX - slider.offsetLeft
  //   scrollLeft = slider.scrollLeft
  // })
  // slider.addEventListener('mouseleave', () => {
  //   isDown = false
  //   slider.classList.remove('active')
  // })
  // slider.addEventListener('mouseup', () => {
  //   isDown = false
  //   slider.classList.remove('active')
  // })
  // slider.addEventListener('mousemove', (e) => {
  //   if (!isDown) return
  //   e.preventDefault()
  //   const x = e.pageX - slider.offsetLeft
  //   const walk = (x - startX) * 1.2 //scroll-fast

  //   let tl2 = new TimelineMax()
  //   tl2
  //     .to(document.documentElement, 0.5, {scrollTop: scrollLeft - walk, ease: Power1.easeOut}, 0)
  // })

  let item = document.querySelector('.header')

  const items = [...document.querySelectorAll('.line')].reverse()

  document.body.style.height = strip.getBoundingClientRect().width - window.innerHeight + 'px'
  document.documentElement.scrollTop = 10

  const step = (document.body.getBoundingClientRect().height - window.innerHeight) / document.querySelectorAll('.line').length

  window.addEventListener('resize', () => {
    document.body.style.height = strip.getBoundingClientRect().width - window.innerHeight + 'px'
  })

  const scrollHandler = (e) => {
    if (document.querySelector('[data-router-view]').getAttribute('data-router-view') === 'main') {

      item.scrollLeft = -document.body.getBoundingClientRect().y

      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('active')
        items[Math.floor(item.scrollLeft / step)].classList.add('active')
      }

      if ((item.scrollLeft >= (Math.floor(document.body.getBoundingClientRect().height - window.innerHeight)) - window.innerWidth * 0.03)) {
        window.scrollTo(0, 1)
      } else if (item.scrollLeft === 0) {
        window.scrollTo(0, (Math.floor(document.body.getBoundingClientRect().height - window.innerHeight) - window.innerWidth * 0.035))
      }
      window.requestAnimationFrame(scrollHandler)
    }
  }

  scrollHandler()

  document.querySelectorAll('.line').forEach(el => el.addEventListener('click', function() {

    const scrollPos = (Math.floor(step) * (this.getAttribute('id').replace(/\D/g, '')))
    let tl2 = new TimelineMax()
    tl2
      .to(document.documentElement, 2, { scrollTop: scrollPos, ease: Power3.easeOut }, 0)
  }))

}



export default mainSlider
