import { check } from 'k6';
import http from 'k6/http';

export let options = {
  thresholds: {
    http_req_duration: ['p(95)<200'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.01'],   // <1% failure rate
  },
  stages: [
    { duration: '10s', target: 10},
    { duration: '1m', target: 10},
    { duration: '10s', target: 0},
  ]
};

export default function () {
  const res = http.get('http://localhost:8080/laggy');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  //sleep(0.1); // wait 100ms between requests
}