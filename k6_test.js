import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  var urlPosting = "http://localhost:3001/reviews";
  let payload = JSON.stringify({
    "product_id": "3",
    "rating": "5",
    "summary": "but WAIT... there's MORE testing",
    "body": "we love testing endpoints breh",
    "recommend": "true",
    "name": "test",
    "email": "testing@test.test",
    "photos": [{
      'id': '111',
      "url": 'urewlrpwerlwe.jpeg'
    }, {
      'id': '111',
    "url": 'urewlrpwerlwe.jpeg'
    }],
    "characteristic": {
        "Fit" : "2",
        "Size" : "5",
        "Quality" : "2"
    }
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  http.get('http://localhost:3001/reviews/meta?product_id=13023');
  sleep(1);
  //http.post(urlPosting, payload, params);
}