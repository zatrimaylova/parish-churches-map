/**
 * @prettier
 */

import { URL, HTTP_STATUS } from '../api';
import api from '../api';

//https://apiv4.updateparishdata.org/Churchs/?lat=asd&long=asd&pg=3

/**
 * Getting churches list
 */
export default class ChurchesListService {
  static #API_ENDPOINTS = {
    churches: 'Churchs',
  };

  static async getChurchesListData(lat, long, page = 1) {
    try {
      const req = await api.get(
        `${URL}${this.#API_ENDPOINTS.churches}/?lat=${lat}&long=${long}&pg=${page}`,
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      );

      if (req.status !== HTTP_STATUS.SUCCESS) {
        return Promise.reject(`Incorrect status ${req.status}`);
      }

      console.log(req.parse);
      return req.json();
    } catch (error) {
      throw await error.response?.json();
    }
  }
}
