const scrollDirection = () => {

  // Initial state
  let scrollPos = 0
  const randomizer = document.querySelector('.interview-randomizer')
  const scrollNav = () => {

    let winScroll = document.documentElement.scrollTop
    let winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    let percent = winScroll / winHeight * 100

    if ((document.body.getBoundingClientRect()).top > scrollPos && percent >= 15)
      randomizer.classList.add('show')
    else if ((document.body.getBoundingClientRect()).top < scrollPos && scrollPos <= 0)
      randomizer.classList.remove('show')
    else if(percent <= 15)
      randomizer.classList.remove('show')
    scrollPos = document.body.getBoundingClientRect().top

    window.requestAnimationFrame(scrollNav)
  }
  if (document.querySelector('[data-router-view]').getAttribute('data-router-view') === 'interview')
    scrollNav()
}

export default scrollDirection
