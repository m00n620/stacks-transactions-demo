import { useAccount } from '@micro-stacks/react';
import { MempoolTransaction } from '@stacks/stacks-blockchain-api-types';
import React, { createContext, useCallback, useState } from 'react';
import { transactionsApi } from '../../utils/api';

export const MempoolTransactionsContext = createContext<{
  loadTransactions(): Promise<any>;
  removeTransactionById(tx_id: string): void;
  transactions: MempoolTransaction[] | undefined;
} | null>(null);

export const MempoolTransactionsProvider: React.FC<{ children: any }> = ({ children }) => {
  const [transactions, setTransactions] = useState<MempoolTransaction[]>();
  const { stxAddress } = useAccount();
  const [offset, setOffset] = useState(0);

  const loadTransactions = useCallback(async () => {
    if (!stxAddress) return;
    const response = await transactionsApi.getMempoolTransactionList({
      address: stxAddress,
      offset,
    });
    const data = response.results as MempoolTransaction[];
    setOffset(response.offset + response.limit);
    if (transactions) {
      setTransactions([...transactions, ...data]);
    } else {
      setTransactions([...data]);
    }
  }, [stxAddress]);

  const removeTransactionById = (tx_id: string) => {
    setTransactions(transactions?.filter(tx => tx.tx_id !== tx_id));
  };

  return (
    <MempoolTransactionsContext.Provider
      value={{ loadTransactions, removeTransactionById, transactions }}
    >
      {children}
    </MempoolTransactionsContext.Provider>
  );
};
