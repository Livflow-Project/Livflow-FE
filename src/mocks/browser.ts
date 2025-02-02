import { ingredientsHandler } from './handlers/ingredientsHandler';
import { setupWorker } from 'msw/browser';
import { storeHandler } from './handlers/storeHandler';
import { storeIdHandler } from './handlers/storeIdHandler';

export const worker = setupWorker(
  ...storeHandler,
  ...storeIdHandler,
  ...ingredientsHandler
);
