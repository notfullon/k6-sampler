import http from 'k6/http';
import { check, group} from 'k6';

//--vus 1 --http-debug="full" --out influxdb=http://127.0.0.1:8086/k6database

export const options = {
    scenarios: {
        sc_ya: {
            executor: 'ramping-arrival-rate',
            exec: 'get_ya',
            timeUnit: '1m',
            preAllocatedVUs:1,
            maxVUs:50,
            stages: [
                    { duration: '300s', target: 60 },
                    { duration: '600s', target: 60 },
                    { duration: '300s', target: 72 },
                    { duration: '600s', target: 72 },
                    { duration: '10s', target: 0 }
            ]
        },
        sc_ru: {
            executor: 'ramping-arrival-rate',
            exec: 'get_ru',
            timeUnit: '1m',
            preAllocatedVUs:1,
            maxVUs:50,
            stages: [
                    { duration: '300s', target: 120 },
                    { duration: '600s', target: 120 },
                    { duration: '300s', target: 144 },
                    { duration: '600s', target: 144 },
                    { duration: '10s', target: 0 }
            ]
        }
    }
}


export function get_ya(){
    group('get_ya', ()=>{
        let resGet_ya = http.get('http://ya.ru',{tags: { name: 'get_ya' }});
        check(resGet_ya, {
          'get_ya status code is 200': (resGet_ya) => resGet_ya.status === 200,
        });
    });
}

export function get_ru(){
    group('get_ru', ()=>{
        let resGet_ru = http.get('http://www.ru',{tags: { name: 'get_ru' }});
          check(resGet_ru, {
            'get_ru status code is 200': (resGet_ru) => resGet_ru.status === 200,
          });
    });
}
