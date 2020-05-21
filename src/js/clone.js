const clone = function(h2, text) {

  const duplicatedH2 = document.createElement('h1')
  duplicatedH2.classList.add(h2)
  duplicatedH2.innerHTML = this.querySelector('h2').innerHTML

  duplicatedH2.style.position = 'fixed'
  duplicatedH2.style.textAlign = 'center'
  duplicatedH2.style.left = this.querySelector('h2').getBoundingClientRect().x + 'px'
  duplicatedH2.style.top = this.querySelector('h2').getBoundingClientRect().y + 'px'
  duplicatedH2.style.lineHeight = '0.89em'
  duplicatedH2.style.zIndex = '1000'

  duplicatedH2.classList.add('clicked')
  this.style.opacity = '0'

  document.body.appendChild(duplicatedH2)

  const duplicatedText = document.createElement('p')
  duplicatedText.classList.add(text)
  duplicatedText.innerHTML = this.querySelector('p').innerHTML

  duplicatedText.style.position = 'fixed'
  duplicatedText.style.textAlign = 'center'
  duplicatedText.style.left = this.querySelector('p').getBoundingClientRect().x + 'px'
  duplicatedText.style.top = this.querySelector('p').getBoundingClientRect().y + 'px'
  duplicatedText.style.width = this.querySelector('p').getBoundingClientRect().width + 'px'
  duplicatedText.style.marginTop = '0'
  duplicatedText.style.zIndex = '1000'

  duplicatedText.classList.add('text-clicked')
  document.body.appendChild(duplicatedText)

}

export default clone
