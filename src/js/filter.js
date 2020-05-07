import MainSlider from './MainSlider.js'
import tab from './tabs'

const filter = () => {

  function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
      return !pos || item !== ary[pos - 1]
    })
  }

  const filterValues = (by) => {
    const values = [...document.querySelectorAll(`[data-${by}]`)].map(el => {
      const value = el.getAttribute(`data-${by}`)
      return value
    })
    const valueHTML = uniq(values).map(el => {
      return `<div class="tabs__item by-${by}">${el}</div>`
    }).join('')
    document.querySelector(`.tab-${by}`).innerHTML = valueHTML
    document.querySelector('.tab-1').classList.add('is-active')
  }

  filterValues('city')
  filterValues('occupation')
  filterValues('key')


  const filterItems = document.querySelectorAll('.tabs__item')
  const headerName = document.querySelectorAll('.header__name-wrapper')
  const filterBtn = document.querySelector('.navbar__filter-current')

  const close = () => {
    document.querySelector('.navbar__filter-btn').classList.remove('open')
    document.querySelector('.filter').classList.remove('open')
    document.querySelector('.navbar').classList.remove('filter-open')
  }

  const open = () => {
    document.querySelector('.navbar__filter-btn').classList.add('open')
    document.querySelector('.filter').classList.add('open')
    document.querySelector('.navbar').classList.add('filter-open')

    if (screen.width < 1025) {
      tab()
    }
  }

  document.querySelector('.navbar__filter-btn').addEventListener('click', () => {
    document.querySelector('.navbar__filter-btn').classList.contains('open') ? close() : open()
  })



  const filterHandler = (selector, attribute) => {

    selector.forEach(elem => {

      elem.classList.remove('is-visible', 'default-layout')
      filterBtn.querySelector('.name').innerText = event.target.innerText
      filterBtn.classList.add('active')

      document.querySelectorAll(`[${attribute}]`).forEach(element => {

        if (event.target.innerText === element.getAttribute(attribute)) {
          element.classList.add('is-visible')
        }
      })
    })
  }


  filterItems.forEach(elem => elem.addEventListener('click', (e) => {

    close()

    if (event.target.classList.contains('by-city')) {

      filterHandler(headerName, 'data-city')
    } else if (event.target.classList.contains('by-occupation')) {

      filterHandler(headerName, 'data-occupation')
    } else if (event.target.classList.contains('by-key')) {

      filterHandler(headerName, 'data-key')
    }
    new MainSlider()
  }))

  filterBtn.addEventListener('click', () => {

    filterBtn.querySelector('.name').innerText = ''
    filterBtn.classList.remove('active')

    headerName.forEach(elem => elem.classList.add('is-visible', 'default-layout'))
    new MainSlider()
  })

}

export default filter
