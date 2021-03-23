import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  var urlPosting = "http://localhost:1337/reviews";
  let payload = JSON.stringify({
    "product_id": "3",
    "rating": "5",
    "summary": "but WAIT... there's MORE testing",
    "body": "we love testing endpoints breh",
    "recommend": "true",
    "name": "test",
    "email": "testing@test.test",
    "photos": ["testing5", "testing6"],
    "characteristic": {
        "0" : "15",
        "1" : "16",
        "2" : "17"
    }
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  //http.get('http://localhost:1337/reviews/meta?product_id=10000');
  //sleep(1);
  http.post(urlPosting, payload, params);
}