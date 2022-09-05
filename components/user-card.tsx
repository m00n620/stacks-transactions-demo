import { useAccount } from '@micro-stacks/react';

export const UserCard = () => {
  const { stxAddress } = useAccount();
  return <h2 className="text-xl font-semibold my-4">{stxAddress ?? 'No active session'}</h2>;
};
