import { check, sleep } from 'k6';
import http from 'k6/http';

export let options = {
  thresholds: {
    http_req_duration: ['p(95)<200'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.01'],   // <1% failure rate
  },
  stages: [
    { duration: '15s', target: 6000},
    { duration: '45s', target: 6000},
    { duration: '15s', target: 0},
  ]
};

export default function () {
  const res = http.get('http://localhost:8080/normal');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1); // wait 1 second between requests
}