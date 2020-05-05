export class HTML {
  static addToHTML(res) {
    return `<a href="/interview.html" class="header__name-wrapper is-visible" data-city="${res.city}" data-occupation="${res.occupation}" data-key="${res.key}">
        <h2 class="header__name">
          ${res.name.replace(/\s/g, '<br>')}
        </h2>
        <p class="header__description">
          ${res.description}
        </p>
      </a>`
  }
}
