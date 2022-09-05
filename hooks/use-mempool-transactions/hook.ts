import { useContext } from 'react';
import { MempoolTransactionsContext } from './context';

export const useMempoolTransactions = () => {
  const context = useContext(MempoolTransactionsContext);

  if (!context) {
    throw new Error('You forgot to use MempoolTransactionsProvider');
  }

  return context;
};
