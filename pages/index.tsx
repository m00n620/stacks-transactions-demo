import { WalletConnectButton } from '../components/wallet-connect-button';
import { UserCard } from '../components/user-card';
import { getDehydratedStateFromSession } from '../common/session-helpers';

import type { NextPage, GetServerSidePropsContext } from 'next';
import Transactions from '../components/transactions';
import { useAccount } from '@micro-stacks/react';

const Home: NextPage = () => {
  const { stxAddress } = useAccount();
  return (
    <div className="container mx-auto py-8">
      <WalletConnectButton />
      <UserCard />
      {stxAddress && <Transactions />}
    </div>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      dehydratedState: await getDehydratedStateFromSession(ctx),
    },
  };
}

export default Home;
