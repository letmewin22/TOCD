const tags = (elem) => {

  const article = elem
  const tagsHTML = [...article.querySelectorAll('.article__tag')]


  tagsHTML.forEach((el) => {
    if (el.classList.contains('by-city')) {
      el.innerHTML = article.getAttribute('data-city')
    } else if (el.classList.contains('by-occupation')) {
      el.innerHTML = article.getAttribute('data-occupation')
    }
  })
}

export default tags
