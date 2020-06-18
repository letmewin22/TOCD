const scrollDirection = () => {

  // Initial state
  let scrollPos = 0
  const navbar = document.querySelector('.navbar')
  const scrollNav = () => {
    const randomizer = document.querySelector('[data-router-view]').getAttribute('data-router-view') === 'interview' ? document.querySelector('.interview-randomizer') : null

    if (document.querySelector('[data-router-view]').getAttribute('data-router-view') !== 'main') {
      if ((document.body.getBoundingClientRect()).top > scrollPos && Math.abs(scrollPos) >= 200) {
        if (document.querySelector('[data-router-view]').getAttribute('data-router-view') === 'interview')
          randomizer.classList.add('show')
        navbar.classList.add('show')
        if (document.querySelector('[data-router-view]').getAttribute('data-router-view') !== 'about')
          navbar.classList.add('bg')
      }
      else if ((document.body.getBoundingClientRect()).top < scrollPos && scrollPos <= 0) {
        if (document.querySelector('[data-router-view]').getAttribute('data-router-view') === 'interview')
          randomizer.classList.remove('show')
        navbar.classList.remove('show')
        navbar.classList.remove('bg')
      }
      else if (Math.abs(scrollPos) <= 200) {
        if (document.querySelector('[data-router-view]').getAttribute('data-router-view') === 'interview')
          randomizer.classList.remove('show')
        navbar.classList.add('show')
        navbar.classList.remove('bg')
      }
      scrollPos = document.body.getBoundingClientRect().top
    } else {
      navbar.classList.remove('bg', 'interview-page', 'show')
    }
    window.requestAnimationFrame(scrollNav)
  }
  scrollNav()
}

export default scrollDirection
