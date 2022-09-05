import fetch from 'cross-fetch';
import { Configuration, AccountsApi, TransactionsApi } from '@stacks/blockchain-api-client';

const apiConfig = new Configuration({
  fetchApi: fetch,
  basePath: 'https://stacks-node-api.testnet.stacks.co',
});

const transactionsApi = new TransactionsApi(apiConfig);

const accountsApi = new AccountsApi(apiConfig);

export { accountsApi, transactionsApi };
