import { useEffect } from 'react';
import { useAccountTransactions } from '../hooks/use-account-transactions';
import TransactionsTable from './transactions-table';

const AccountTransactionsTable = () => {
  const { transactions, loadTransactions } = useAccountTransactions();

  useEffect(() => {
    loadTransactions();
  }, []);

  return <TransactionsTable transactions={transactions} />;
};

export default AccountTransactionsTable;
