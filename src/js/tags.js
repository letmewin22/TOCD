const tags = (elem) => {

  const article = elem
  const tagsHTML = [...article.querySelectorAll('.article__tag')]

  tagsHTML.forEach((el, index) => {
    el.innerHTML = article.getAttribute('data-tags').split(',').map(el => el.trim())[index]
  })
}

export default tags
