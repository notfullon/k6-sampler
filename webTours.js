import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = {
  ext: {
    loadimpact: {
      distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
      apm: [],
    },
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 20, duration: '1m' },
        { target: 20, duration: '3m30s' },
        { target: 0, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  group('page_1 - http://webtours.load-test.ru:1080/webtours/', function () {
    response = http.get('http://webtours.load-test.ru:1080/webtours/', {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })

    response = http.get('http://webtours.load-test.ru:1080/webtours/header.html', {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(2.2)

    response = http.get('http://webtours.load-test.ru:1080/WebTours/home.html', {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(13.2)

    response = http.post(
      'http://webtours.load-test.ru:1080/cgi-bin/login.pl',
      {
        userSession: '136761.812393682HADtzifpHcftccAipVVtDf',
        username: 'dnsemenov1',
        password: 'dnsemenov1',
        'login.x': '60',
        'login.y': '10',
        JSFormSubmit: 'off',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://webtours.load-test.ru:1080',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(11.7)

    response = http.post(
      'http://webtours.load-test.ru:1080/cgi-bin/reservations.pl',
      'advanceDiscount=0&depart=Denver&departDate=07%2F03%2F2023&arrive=London&returnDate=07%2F04%2F2023&numPassengers=1&roundtrip=on&seatPref=None&seatType=Coach&findFlights.x=48&findFlights.y=9&.cgifields=roundtrip%2CseatType%2CseatPref',
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://webtours.load-test.ru:1080',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(2)

    response = http.post(
      'http://webtours.load-test.ru:1080/cgi-bin/reservations.pl',
      {
        outboundFlight: '020;338;07/03/2023',
        returnFlight: '200;338;07/04/2023',
        numPassengers: '1',
        advanceDiscount: '0',
        seatType: 'Coach',
        seatPref: 'None',
        'reserveFlights.x': '76',
        'reserveFlights.y': '5',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://webtours.load-test.ru:1080',
          'upgrade-insecure-requests': '1',
        },
      }
    )
    sleep(6.8)

    response = http.post(
      'http://webtours.load-test.ru:1080/cgi-bin/reservations.pl',
      {
        firstName: 'Dmitry',
        lastName: 'Semenov',
        address1: '',
        address2: '',
        pass1: 'Dmitry Semenov',
        creditCard: '',
        expDate: '',
        oldCCOption: '',
        numPassengers: '1',
        seatType: 'Coach',
        seatPref: 'None',
        outboundFlight: '020;338;07/03/2023',
        advanceDiscount: '0',
        returnFlight: '200;338;07/04/2023',
        JSFormSubmit: 'off',
        'buyFlights.x': '47',
        'buyFlights.y': '1',
        '.cgifields': 'saveCC',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'http://webtours.load-test.ru:1080',
          'upgrade-insecure-requests': '1',
        },
      }
    )
  })
}
