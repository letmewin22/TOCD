/**
 * 
 * @todo
 * 1. Добавить классы при создании классов
 * 2. При изменении проверять на наличие классов и тем, у кого нет добавлять новые
 */

const mutationObserver = (outsideCallback) => {

  const target = document.querySelector('[data-router-view]')

  const config = {
    childList: true
  }

  const callback = function(mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {

        outsideCallback(mutation)
        // console.log('A child node has been added or removed.')
      }
    }
  }
  const observer = new MutationObserver(callback)

  observer.observe(target, config)

}

export default mutationObserver
