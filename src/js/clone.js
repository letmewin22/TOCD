const clone = function(h2, text) {

  const duplicatedH2 = document.createElement('h1')
  duplicatedH2.classList.add(h2)
  duplicatedH2.innerHTML = this.innerHTML
  duplicatedH2.style.position = 'fixed'
  duplicatedH2.style.textAlign = 'center'
  duplicatedH2.style.left = this.getBoundingClientRect().x + 'px'
  duplicatedH2.style.top = this.getBoundingClientRect().y + 'px'
  duplicatedH2.style.width = this.getBoundingClientRect().width + 'px'
  duplicatedH2.style.lineHeight = '0.89em'
  duplicatedH2.style.zIndex = '1000'
  duplicatedH2.style.transform = 'scale(1)'

  duplicatedH2.classList.add('clicked')
  this.parentNode.style.opacity = '0'

  document.body.appendChild(duplicatedH2)

  const duplicatedText = document.createElement('p')
  duplicatedText.classList.add(text)
  duplicatedText.innerHTML = this.parentNode.querySelector('.'+text).innerHTML

  duplicatedText.style.position = 'fixed'
  duplicatedText.style.textAlign = 'center'
  duplicatedText.style.left = this.parentNode.querySelector('.'+text).getBoundingClientRect().x + 'px'
  duplicatedText.style.top = this.parentNode.querySelector('.'+text).getBoundingClientRect().y + 'px'
  duplicatedText.style.width = this.parentNode.querySelector('.'+text).getBoundingClientRect().width + 'px'
  duplicatedText.style.marginTop = '0'
  duplicatedText.style.zIndex = '1000'

  duplicatedText.classList.add('text-clicked')
  document.body.appendChild(duplicatedText)

}

export default clone
