export const splitLines = (elem) => {

  const getLines = () => {
    let lines = []
    let line
    let p = elem
    let words = elem.querySelectorAll('.word')
    let lastTop
    for (let i = 0; i < words.length; i++) {
      let word = words[i]
      if (word.offsetTop !== lastTop) {
        lastTop = word.offsetTop
        line = []
        lines.push(line)
      }
      line.push(word)
    }
    return lines
  }

  const showLines = () => {
    let lines = getLines()
    return lines.map(function(line) {
      return line.map(function(span) {
        return span.innerText
      }).join(' ')
    })
  }

  const showLine = showLines()

  elem.innerHTML = ''
  for (const line of showLine) {

    elem.innerHTML += `<span class="line-wrapper"><span class="splitted-line">${line}</span></span>`
  }
}
