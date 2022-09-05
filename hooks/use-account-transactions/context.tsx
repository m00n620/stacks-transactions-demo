import { useAccount } from '@micro-stacks/react';
import { Transaction } from '@stacks/stacks-blockchain-api-types';
import React, { createContext, useCallback, useState } from 'react';
import { accountsApi } from '../../utils/api';

export const AccountTransactionsContext = createContext<{
  loadTransactions(): Promise<any>;
  transactions: Transaction[] | undefined;
} | null>(null);

export const AccountTransactionsProvider: React.FC<{ children: any }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>();
  const { stxAddress } = useAccount();
  const [offset, setOffset] = useState(0);

  const loadTransactions = useCallback(async () => {
    if (!stxAddress) return;
    const response = await accountsApi.getAccountTransactions({
      principal: stxAddress,
      offset,
    });
    const data = response.results as Transaction[];
    setOffset(response.offset + response.limit);
    if (transactions) {
      setTransactions([...transactions, ...data]);
    } else {
      setTransactions([...data]);
    }
  }, [stxAddress]);

  return (
    <AccountTransactionsContext.Provider value={{ loadTransactions, transactions }}>
      {children}
    </AccountTransactionsContext.Provider>
  );
};
