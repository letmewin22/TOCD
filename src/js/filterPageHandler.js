import Clock from './ScrollSlider/Clock'
import ScrollSlider from './ScrollSlider/ScrollSlider'
import Filter from './Filter'

const filterPageHandler = () => {

  const filter = new Filter(document.querySelectorAll('.navbar__filter-btn'))
  filter.close()
  document.querySelector('.filter-window').style.display = 'flex'

  if (document.querySelector('[data-router-view]').getAttribute('data-router-view') === 'main') {

    const clock = new Clock(document.querySelector('.header__names .container'), true)
    
    clock.destroy()
  
    const filterSlider = new ScrollSlider(document.querySelector('.filter-window__items'))
  
    filterSlider.render()
  
    document.querySelector('.navbar__filter-current').addEventListener('click', () => {
  
      filterSlider.destroy()
      clock.render()
      document.querySelector('.filter-window').style.display = 'none'
    })

  } else {

    const filterSlider = new ScrollSlider(document.querySelector('.filter-window__items'))
  
    filterSlider.render()

    document.querySelector('.navbar__filter-current').addEventListener('click', () => {

      filterSlider.destroy()
      document.querySelector('.filter-window').style.display = 'none'
    })
  }
}

export default filterPageHandler
