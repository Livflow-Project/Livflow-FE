import { IngredientsinventoryHandlers } from './handlers/ingredientsInventoryHandler';
import { costCalculatorHandlers } from './handlers/costCalculatorHandler';
import { ingredientsHandler } from './handlers/ingredientsHandler';
import { ledgerCalendarHandler } from './handlers/ledgerCalendarHandler';
import { ledgerTransactionsHandler } from './handlers/ledgerTransactionsHandler';
import { setupWorker } from 'msw/browser';
import { storeHandler } from './handlers/storeHandler';

export const worker = setupWorker(
  ...storeHandler,
  ...ledgerCalendarHandler,
  ...ledgerTransactionsHandler,
  ...ingredientsHandler,
  ...IngredientsinventoryHandlers,
  ...costCalculatorHandlers
);
