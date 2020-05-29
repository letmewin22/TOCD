const shares = (elem) => {

  const article = elem
  const share = [...article.querySelectorAll('.article-social__social-item')]


  share.forEach((el) => {

    const link = article.getAttribute('data-link')
    const shareLink = el.getAttribute('href')
    el.setAttribute('href', shareLink+link)
  })
}

export default shares
