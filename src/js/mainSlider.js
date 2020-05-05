const mainSlider = () => {
  // const slider = document.querySelector('.header')
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
  //   const walk = (x - startX) * 0.5 //scroll-fast
  //   window.scrollTo(0, scrollLeft - walk)
  // })

  let item = document.querySelector('.header')
  const items = [...document.querySelectorAll('.line')].reverse()
  document.body.style.height = strip.getBoundingClientRect().width * 0.9 + 'px'
  
  window.addEventListener('resize', () => {
    document.body.style.height = strip.getBoundingClientRect().width * 0.9 + 'px'
  })

  const scrollHandler = (e) => {
    item.scrollLeft = -document.body.getBoundingClientRect().y
    const col = Math.floor((item.scrollLeft / document.querySelectorAll('.line').length))
    // if ((item.scrollLeft >= (strip.getBoundingClientRect().width / 2 - strip.getBoundingClientRect().width * 0.025))) {
    //   window.scrollTo(0, 0 - strip.getBoundingClientRect().width * 0.025)
    // } else if (item.scrollLeft === 0) {

    //   window.scrollTo(0, strip.getBoundingClientRect().width / 2 - strip.getBoundingClientRect().width * 0.025)
    // }
    // for (let i = 0; i < col; i++) {
    //   items[i].classList.add('active')
    // }
    window.requestAnimationFrame(scrollHandler)
  }

  scrollHandler()

}



export default mainSlider
