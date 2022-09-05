import { useContext } from 'react';
import { AccountTransactionsContext } from './context';

export const useAccountTransactions = () => {
  const context = useContext(AccountTransactionsContext);

  if (!context) {
    throw new Error('You forgot to use AccountTransactionsProvider');
  }

  return context;
};
