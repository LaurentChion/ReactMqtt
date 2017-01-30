import axios from 'axios';

export default function fetch(request, fError, fSuccess) {
  axios.get(request)
    .then((response) => {
      fSuccess(response);
    })
    .catch((error) => {
      fError(error);
    });
}
