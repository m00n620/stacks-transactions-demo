import { MempoolTransaction, Transaction } from '@stacks/stacks-blockchain-api-types';
import { parseStxAmount } from '../utils';

export default function TransactionsTable({
  transactions,
}: {
  transactions: MempoolTransaction[] | Transaction[] | undefined;
}) {
  return (
    <table className="w-full text-md text-left text-gray-500">
      <thead className="text-sm text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="py-3 px-2 text-center">
            Tx ID
          </th>
          <th scope="col" className="py-3 px-2 text-center">
            Sender
          </th>
          <th scope="col" className="py-3 px-2 text-center">
            Fee
          </th>
          <th scope="col" className="py-3 px-2 text-center">
            Nonce
          </th>
          <th scope="col" className="py-3 px-2 text-center">
            Tx Type
          </th>
          <th scope="col" className="py-3 px-2 text-center">
            Tx Status
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions && transactions.length > 0 ? (
          transactions.map(tx => (
            <tr key={tx.tx_id} className="bg-white border-b">
              <td className="py-4 px-2 text-center">{tx.tx_id}</td>
              <td className="py-4 px-2 text-center">{tx.sender_address}</td>
              <td className="py-4 px-2 text-center">{parseStxAmount(tx.fee_rate)} STX</td>
              <td className="py-4 px-2 text-center">{tx.nonce}</td>
              <td className="py-4 px-2 text-center">{tx.tx_type}</td>
              <td className="py-4 px-2 text-center">{tx.tx_status}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="py-4 text-center">
              No Data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
