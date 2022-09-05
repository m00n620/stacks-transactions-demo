import { useState } from 'react';
import classNames from 'classnames';
import AccountTransactionsTable from './account-transactions-table';
import MempoolTransactionsTable from './mempool-transactions-table';
import { AccountTransactionsProvider } from '../hooks/use-account-transactions';
import { MempoolTransactionsProvider } from '../hooks/use-mempool-transactions';

const tabs = ['Confirmed', 'Pending'];

const Transactions = () => {
  const [activeTab, setActiveTab] = useState('Confirmed');
  return (
    <div>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map(tab => (
            <li key={tab} className="mr-2">
              <button
                type="button"
                className={classNames('inline-block p-4 rounded-t-lg border-b-2', {
                  'border-transparent hover:text-gray-600 hover:border-gray-300': tab !== activeTab,
                  'text-blue-600 border-blue-600 active': tab === activeTab,
                })}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {activeTab === 'Confirmed' ? (
        <AccountTransactionsProvider>
          <AccountTransactionsTable />
        </AccountTransactionsProvider>
      ) : (
        <MempoolTransactionsProvider>
          <MempoolTransactionsTable />
        </MempoolTransactionsProvider>
      )}
    </div>
  );
};

export default Transactions;
