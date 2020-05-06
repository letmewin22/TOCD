export default function detectDate(el) {
  if (document.querySelector('[data-router-view]').getAttribute('data-router-view') === 'main') {

    const counter = (elem, callback) => {

      const tl = new TimelineMax()
      tl
        .to(elem, 0.5, { y: '-100%', opacity: 0, ease: Power3.easeIn, onComplete: callback })
        .to(elem, 0, { y: '100%' })
        .to(elem, 0.5, { y: '0%', opacity: 1, ease: Power3.easeOut })
    }

    let d = new Date()
    let ukTime = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours() + 3, d.getUTCMinutes(), d.getUTCSeconds())
    let newd = new Date(ukTime)
    let countDown = new Date('Mar 12, 2020 00:00:00').getTime()

    let now = new Date().getTime()
    let distance = now - countDown

    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24

    let construst = {
      hours: ('0' + newd.getHours()).substr(-2),
      minutes: ('0' + newd.getMinutes()).substr(-2),
      seconds: ('0' + newd.getSeconds()).substr(-2),
      daysAfter: ('0' + Math.floor(distance / (day))).substr(-2),
      hoursAfter: ('0' + Math.floor((distance % (day)) / (hour))).substr(-2),
      minutesAfter: ('0' + Math.floor((distance % (hour)) / (minute))).substr(-2)
    }
    if (+construst.hours >= 13 && +construst.hours < 20) {
      document.querySelector('body').classList = ''
      document.querySelector('body').classList.add('lunchtime')
    } else if (+construst.hours >= 20 && +construst.hours < 22) {
      document.querySelector('body').classList = ''
      document.querySelector('body').classList.add('evening')
    } else if (+construst.hours >= 22 || +construst.hours < 9) {
      document.querySelector('body').classList = ''
      document.querySelector('body').classList.add('night')
    } else {
      document.querySelector('body').classList = ''
      document.querySelector('body').classList.add('morning')
    }

    const changeDetector = (selector, timeSelector) => {
      if (selector.innerText !== timeSelector) {
        counter(selector, () => selector.innerText = timeSelector)
      }
    }

    document.querySelector('.days-1').innerText = construst.daysAfter.slice(0, 1)
    document.querySelector('.days-2').innerText = construst.daysAfter.slice(1)
    document.querySelector('.hours-1').innerText = construst.hoursAfter.slice(0, 1)
    document.querySelector('.hours-2').innerText = construst.hoursAfter.slice(1)
    changeDetector(document.querySelector('.minutes-2'), construst.minutesAfter.slice(1))
    changeDetector(document.querySelector('.minutes-1'), construst.minutesAfter.slice(0, 1))
  }
}
