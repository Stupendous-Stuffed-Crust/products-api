import { sleep } from 'k6'
import http from 'k6/http'

// See https://k6.io/docs/using-k6/options
export const options = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '30s', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<2000'], // 95% requests should be below 2000ms
  },
};

export default function main() {
  let response;

  response = http.get(`http://localhost:3001/products?count=${Math.floor(Math.random() * 1000000) + 1}`);
  response = http.get(`http://localhost:3001/products/${Math.floor(Math.random() * 100001) + 900000}`);
  response = http.get(`http://localhost:3001/products/${Math.floor(Math.random() * 100001) + 900000}/related`);
  response = http.get(`http://localhost:3001/products/${Math.floor(Math.random() * 100001) + 900000}/styles`);
  sleep(1);
}
