const tab = function() {
  let tabNav = document.querySelectorAll('.tabs__nav-item'),
    tabContent = document.querySelectorAll('.tab'),
    tabBg = document.querySelector('.tabs__bg'),
    tabName

  tabNav.forEach(item => {
    item.addEventListener('click', selectTabNav)
  })

  function selectTabNav() {
    tabNav.forEach(item => {
      item.classList.remove('is-active')
    })
    this.classList.add('is-active')
    activeTabBg()
    tabName = this.getAttribute('data-tab-name')
    selectTabContent(tabName)
  }

  function selectTabContent(tabName) {
    tabContent.forEach(item => {
      item.classList.contains(tabName) ? item.classList.add('is-active') : item.classList.remove('is-active')
    })
  }

  function activeTabBg() {
    tabBg.style.transform = `translateX(${document.querySelector('.tabs__nav-item.is-active').offsetLeft}px)`
  }

  activeTabBg()
}

export default tab
