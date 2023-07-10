import { group, check } from 'k6'
import http from 'k6/http'
import { SharedArray } from 'k6/data';
import { Trend } from 'k6/metrics';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';


const dataUsers = new SharedArray('getUsers', function () {
  const dataFile = JSON.parse(open('./users.json'));
  return dataFile.users;
});


export const options = {
  thresholds: { http_req_duration: [{ threshold: 'p(95)<=3000', abortOnFail: true }] },
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 1, duration: '1s' },
        { target: 1, duration: '30s' },
        { target: 0, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response
  let random = Math.floor(Math.random() * dataUsers.length)
  let user = dataUsers[random]
  console.log(`Hello, my name is ${user.username}`);
  console.log(`Hello, my pass is ${user.password}`);

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

    let resUserSession = http.get('http://webtours.load-test.ru:1080/cgi-bin/nav.pl?in=home', {
      headers: {
        "Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language" : "ru-RU,ru;q=0.9",
        "Proxy-Connection" : "keep-alive",
        'upgrade-insecure-requests': '1'
      },
    })

    const title = resUserSession.html().find('#userSession').val();
    console.log(title);
    // console.log(resUserSession);



    response = http.post(
      'http://webtours.load-test.ru:1080/cgi-bin/login.pl',
      {
        userSession: '$',
        username: '${user.username}',
        password: '${user.password}',
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
