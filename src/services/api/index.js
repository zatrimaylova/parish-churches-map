/**
 * @prettier
 */

import ky from 'ky';

export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  DELETED: 204,

  ERRORS: {
    409: 409,
    400: 400,
    403: 403,
  },
};

export const URL = 'https://apiv4.updateparishdata.org/';

const api = ky.extend({
  retry: {
    limit: 3,
    methods: ['get', 'post', 'put', 'delete', 'patch'],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  timeout: 70000,
  hooks: {
    afterGettingResponse: [
      (_input, _options, response) => {
        if (response.status === HTTP_STATUS.ERRORS[403]) {
          console.log('Произошла ошибка');
        }
      },
    ],
  },
});

export default api;
