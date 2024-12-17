import { setupWorker } from 'msw/browser';
import { storeHandler } from './handlers/storeHandler';

export const worker = setupWorker(...storeHandler);
