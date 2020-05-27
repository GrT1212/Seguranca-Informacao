import { DEVICE } from './types';
import { BACKEND } from '../config';

export const fetchDevice = () => dispatch => {
  dispatch({ type: DEVICE.FETCH });

  return fetch(`${BACKEND.ADDRESS}/device/new`, {
    credentials: 'include'
  }).then(response => response.json())
    .then(json => {
      if (json.type === 'error') {
        dispatch({ type: DEVICE.FETCH_ERROR, message: json.message });
      } else {
        dispatch({ type: DEVICE.FETCH_SUCCESS, device: json.device });
      }
    })
    .catch(error => dispatch({ type: DEVICE.FETCH_ERROR, message: error.message }));
};