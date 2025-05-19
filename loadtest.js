import { check, sleep } from 'k6';
import http from 'k6/http';

export let options = {
  vus: 500,             // virtual users
  duration: '5s',     // test duration
  thresholds: {
    http_req_duration: ['p(95)<200'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.01'],   // <1% failure rate
  },
};

export default function () {
  const res = http.get('http://localhost:8080/normal');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(0.1); // wait 100ms between requests
}