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
  document.body.style.height = strip.getBoundingClientRect().width - window.innerHeight + 'px'
  
  window.addEventListener('resize', () => {
    document.body.style.height = strip.getBoundingClientRect().width - window.innerHeight + 'px'
  })

  const scrollHandler = (e) => {
    item.scrollLeft = -document.body.getBoundingClientRect().y
    console.log(document.documentElement.scrollTop)
    const col = Math.floor((item.scrollLeft / document.querySelectorAll('.line').length))
    if ((item.scrollLeft >= (Math.floor(document.body.getBoundingClientRect().height - window.innerHeight)) - window.innerWidth* 0.03)) {
      console.log('test')
      window.scrollTo(0, 1)
    } else if (item.scrollLeft === 0) {
      window.scrollTo(0, (Math.floor(document.body.getBoundingClientRect().height - window.innerHeight) - window.innerWidth* 0.035))
    }
    // for (let i = 0; i < col; i++) {
    //   items[i].classList.add('active')
    // }
    window.requestAnimationFrame(scrollHandler)
  }

  scrollHandler()

}



export default mainSlider
