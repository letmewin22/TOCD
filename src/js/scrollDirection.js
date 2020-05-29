const scrollDirection = () => {

  // Initial state
  let scrollPos = 0
  const randomizer = document.querySelector('.interview-randomizer')
  const navbar = document.querySelector('.navbar')
  const scrollNav = () => {


    if ((document.body.getBoundingClientRect()).top > scrollPos && Math.abs(scrollPos) >= 200) {
      randomizer.classList.remove('show')
      navbar.classList.add('show')
      navbar.classList.add('bg')
    }
    else if ((document.body.getBoundingClientRect()).top < scrollPos && scrollPos <= 0) {
      randomizer.classList.add('show')
      navbar.classList.remove('show')
      navbar.classList.remove('bg')
    }
    else if(Math.abs(scrollPos) <= 200) {
      randomizer.classList.remove('show')
      navbar.classList.add('show')
      navbar.classList.remove('bg')
    }
      

    scrollPos = document.body.getBoundingClientRect().top

    window.requestAnimationFrame(scrollNav)
  }
  if (document.querySelector('[data-router-view]').getAttribute('data-router-view') === 'interview')
    scrollNav()
}

export default scrollDirection
