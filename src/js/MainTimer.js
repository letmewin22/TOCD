export default class MainTimer {

  constructor() {

    this.second = 1000
    this.minute = this.second * 60
    this.hour = this.minute * 60
    this.day = this.hour * 24

    if (document.querySelector('[data-router-view]').getAttribute('data-router-view') === 'main')
      this.setup()
  }

  setup() {

    const d = new Date()
    const ukTime = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours() + 3, d.getUTCMinutes(), d.getUTCSeconds())

    const newd = new Date(ukTime)
    const countDown = new Date('Mar 12, 2020 00:00:00').getTime()
    
    const now = d.getTime()
    const distance = now - countDown

    this.store = {
      hours: ('0' + newd.getHours()).substr(-2),
      minutes: ('0' + newd.getMinutes()).substr(-2),
      seconds: ('0' + newd.getSeconds()).substr(-2),
      daysAfter: ('0' + Math.floor(distance / (this.day))).substr(-2),
      hoursAfter: ('0' + Math.floor((distance % (this.day)) / (this.hour))).substr(-2),
      minutesAfter: ('0' + Math.floor((distance % (this.hour)) / (this.minute))).substr(-2)
    }

    this.colorScheme()

    document.querySelector('.days-1').innerText = this.store.daysAfter.slice(0, 1)
    document.querySelector('.days-2').innerText = this.store.daysAfter.slice(1)
    document.querySelector('.hours-1').innerText = this.store.hoursAfter.slice(0, 1)
    document.querySelector('.hours-2').innerText = this.store.hoursAfter.slice(1)

    this.timerChange(document.querySelector('.minutes-2'), this.store.minutesAfter.slice(1))
    this.timerChange(document.querySelector('.minutes-1'), this.store.minutesAfter.slice(0, 1))
  }

  colorScheme() {

    if (+this.store.hours >= 13 && +this.store.hours < 20) {
      document.querySelector('body').classList = ''
      document.querySelector('body').classList.add('lunchtime')
    } else if (+this.store.hours >= 20 && +this.store.hours < 22) {
      document.querySelector('body').classList = ''
      document.querySelector('body').classList.add('evening')
    } else if (+this.store.hours >= 22 || +this.store.hours < 6) {
      document.querySelector('body').classList = ''
      document.querySelector('body').classList.add('night')
    } else {
      document.querySelector('body').classList = ''
      document.querySelector('body').classList.add('morning')
    }
  }

  timerChange(selector, timeSelector) {

    if (selector.innerText !== timeSelector) {
      this.counter(selector, () => selector.innerText = timeSelector)
    }
  }

  counter(elem, callback) {

    const tl = new TimelineMax()
    tl
      .to(elem, 0.5, { y: '-100%', opacity: 0, ease: Power3.easeIn, onComplete: callback })
      .to(elem, 0, { y: '100%' })
      .to(elem, 0.5, { y: '0%', opacity: 1, ease: Power3.easeOut })
  }
}
