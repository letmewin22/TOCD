const scrollDirection = () => {

// Initial state
  let scrollPos = 0
  const randomizer = document.querySelector('.interview-randomizer')
  const scrollNav = () => {
    if ((document.body.getBoundingClientRect()).top > scrollPos)
      randomizer.classList.remove('hidden')
    else if ((document.body.getBoundingClientRect()).top < scrollPos && scrollPos <= 0)
      randomizer.classList.add('hidden')
    scrollPos = document.body.getBoundingClientRect().top

    window.requestAnimationFrame(scrollNav)
  }
  if (document.querySelector('[data-router-view]').getAttribute('data-router-view') === 'interview')
    scrollNav()
}

export default scrollDirection
