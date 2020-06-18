export const langCurrentPage = () => {

  switch (document.documentElement.lang) {
    case 'uk':
      document.getElementById('uk').querySelector('a').classList.add('is-active')
      document.getElementById('en').querySelector('a').classList.remove('is-active')
      break

    case 'en':
      document.getElementById('en').querySelector('a').classList.add('is-active')
      document.getElementById('uk').querySelector('a').classList.remove('is-active')
      break
  }
}
