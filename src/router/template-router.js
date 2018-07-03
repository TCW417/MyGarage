// template router.
//
// REPLACE "MODEL" with the model this router will handle.
//
import { Router } from 'express';
import HttpErrors from 'http-errors';
import ROUTER_MODEL from '../model/router-MODEL';
import logger from '../lib/logger';

const MODELRouter = new Router();

const apiBaseUrl = '/api/MODEL';

// CREATE
MODELRouter.post(apiBaseUrl, (request, response, next) => {
  MODEL.init()
    .then(() => {
    })
    .catch((err) => {
      throw err;
    });
  return undefined;
});

// READ
MODELRouter.get(apiBaseUrl, (request, response, next) => {
  MODEL.init()
    .then(() => {
    })
    .catch((err) => {
      throw err;
    });
  return undefined;
});

// UPDATE
MODELRouter.put(apiBaseUrl, (request, response, next) => {
  MODEL.init()
    .then(() => {
    })
    .catch((err) => {
      throw err;
    });
  return undefined;
});

// DELETE
MODELRouter.delete(apiBaseUrl, (request, response, next) => {
  MODEL.init()
    .then(() => {
    })
    .catch((err) => {
      throw err;
    });
  return undefined;
});

