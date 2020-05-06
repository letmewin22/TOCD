import Highway from '@dogstudio/highway'

export default class InterviewTransition extends Highway.Transition {
  // Built-in methods
  out({ done }) {
    done()
  }

  in({ from, to, done }) {
    console.log(from)
    let clicked = document.querySelector('.clicked')
    to.querySelector('.h1-wrapper').appendChild(clicked)
    to.querySelector('h1').style.display = 'none'
    from.remove()
    window.scrollTo(0, 1)
    document.body.style.pointerEvents = 'auto'
    document.body.overflow = 'auto'
    done()
  }
};
