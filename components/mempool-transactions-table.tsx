import { useAccount } from '@micro-stacks/react';
import { connectWebSocketClient } from '@stacks/blockchain-api-client';
import { useCallback, useEffect, useState } from 'react';
import { useMempoolTransactions } from '../hooks/use-mempool-transactions';
import TransactionsTable from './transactions-table';

const MempoolTransactionsTable = () => {
  const { transactions, loadTransactions, removeTransactionById } = useMempoolTransactions();
  const { stxAddress } = useAccount();
  const [subscription, setSubscription] = useState<any>();

  const subscribeWebsocketClient = useCallback(async () => {
    if (!stxAddress) return;
    const client = await connectWebSocketClient('wss://stacks-node-api.testnet.stacks.co/');
    const sub = await client.subscribeAddressTransactions(stxAddress, event => {
      if (event.tx_status === 'success') {
        removeTransactionById(event.tx_id);
      }
    });
    setSubscription(sub);
  }, [stxAddress]);

  useEffect(() => {
    subscribeWebsocketClient();
    loadTransactions();

    return () => subscription?.unsubscribe();
  }, []);

  return <TransactionsTable transactions={transactions} />;
};

export default MempoolTransactionsTable;
