'use strict';

import superagent from 'superagent';
import bearerAuth from 'superagent-auth-bearer';
import { startServer, stopServer } from '../lib/server';
import { createImageMockPromise, removeImagesAndAccounts } from './lib/image-mock';

bearerAuth(superagent);

const dogMp3 = `${__dirname}/asset/dog.mp3`;
const apiUrl = `http://localhost:${process.env.PORT}/api/images`;

describe('TESTING ROUTES AT /api/images', () => {
  let token;
  let image;
  beforeAll(startServer);
  afterAll(stopServer);
  beforeEach(async () => {
    try {
      const mockData = await createImageMockPromise();
      token = mockData.token; /*eslint-disable-line*/
      image = mockData.image; /*eslint-disable-line*/
    } catch (err) {
      throw err;
    }
    return undefined;
  });
  afterEach(async () => {
    await removeImagesAndAccounts();
  });

  describe('POST ROUTES TO /api/images', () => {
    test('POST 200', async () => {
      try {
        const response = await superagent.post(apiUrl)
          .authBearer(token)
          .field('title', 'lonesome dove')
          .attach('image', dogMp3);
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual('lonesome dove');
        expect(response.body._id).toBeTruthy();
        expect(response.body.url).toBeTruthy();
        expect(response.body.url).toBeTruthy();
        Object.assign(image, response.body);
      } catch (err) {
        expect(err).toEqual('POST 200 image unexpected error');
      }
      return undefined;
    });

    test('POST 400 to /api/images with bad request', async () => {
      try {
        const response = await superagent.post(apiUrl)
          .authBearer(token)
          .field('not-title', 'lonesome dove')
          .attach('image', dogMp3);
        expect(response).toEqual('POST 400 unexpected response');
      } catch (err) {
        expect(err.status).toEqual(400);
      }
    });

    test('POST 401 to /api/images with bad token', async () => {
      try {
        const response = await superagent.post(apiUrl)
          .authBearer('bad-token')
          .field('title', 'lonesome dove')
          .attach('image', dogMp3);
        expect(response).toEqual('POST 401 unexpected response');
      } catch (err) {
        expect(err.status).toEqual(401);
      }
    });
  });

  describe('GET ROUTES to /api/images', () => {
    test('200 GET /api/images for succesful fetching of a cover', async () => {
      try {
        const response = await superagent.get(`${apiUrl}/${image._id}`)
          .authBearer(token);
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual(image.title);
        expect(response.body.accountId).toEqual(image.accountId.toString());
        expect(response.body.url).toEqual(image.url);
        expect(response.body.fileName).toEqual(image.fileName);
      } catch (err) {
        expect(err).toEqual('FAILING IN GET 200 POST');
      }
    });

    test('404 GET /api/images with image id', async () => {
      try {
        const response = await superagent.get(`${apiUrl}/1234567890`)
          .authBearer(token);
        expect(response).toEqual('404 GET returned unexpected response');
      } catch (err) {
        expect(err.status).toEqual(404);
      }
    });
  });

  describe('DELETE ROUTES to /api/images', () => {
    test('200 DELETE /api/images for successful deletion of an image', async () => {
      try {
        const response = await superagent.delete(`${apiUrl}/${image._id}`)
          .authBearer(token);
        expect(response.status).toEqual(200);
      } catch (err) {
        expect(err.message).toEqual('FAILING TO GET GOOD STATUS FROM DELETE');
      }
    });

    test('404 DELETE /api/images with bad image id', async () => {
      try {
        const response = await superagent.get(`${apiUrl}/1234567890`)
          .authBearer(token);
        expect(response).toEqual('404 DELETE returned unexpected response');
      } catch (err) {
        expect(err.status).toEqual(404);
      }
    });
  });
});
