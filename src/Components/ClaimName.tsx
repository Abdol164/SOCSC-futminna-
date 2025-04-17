import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@suiet/wallet-kit';
import { suinsClient } from '../SuinsClient';
import { Transaction } from '@mysten/sui/transactions';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { useSuins } from '../utils/contexts/SuinsContext';
import { SuinsTransaction } from '@mysten/suins';

const ClaimName: React.FC = () => {
  const { suinsName, setSuinsName } = useSuins();
  const { account, signAndExecuteTransaction } = useWallet();
  const navigate = useNavigate();
  const [desiredName, setDesiredName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClaim = async () => {
    if (!suinsName) {
      setError('No parent name found. Please register a parent name first.');
      return;
    }

    const fullName = `${desiredName}.suimail`;

    try {
      setLoading(true);
      const parentNftId = await getParentNftId(suinsName);

      if (!parentNftId) {
        setError('Parent NFT ID not found.');
        setLoading(false);
        return;
      }

      const transaction = new Transaction();
      const suinsTransaction = new SuinsTransaction(suinsClient, transaction);

      suinsTransaction.createLeafSubName({
        parentNft: parentNftId,
        name: fullName,
        targetAddress: account.address,
      });

      const { bytes, signature, reportTransactionEffects } = await signAndExecuteTransaction({
        transaction,
      });

      const client = new SuiClient({ url: getFullnodeUrl('testnet') });
      const executeResult = await client.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
      });

      reportTransactionEffects(executeResult.rawEffects);

      setSuinsName(fullName);
      setLoading(false);
      setError(null);
      navigate('/profile');
    } catch (err) {
      setLoading(false);
      setError('Failed to claim the name. Please try again.');
    }
  };

  return (
    <div>
      <h2>Claim a Subname</h2>
      <input
        type="text"
        value={desiredName}
        onChange={(e) => setDesiredName(e.target.value)}
        placeholder="Enter desired subname"
        disabled={loading}
      />
      <button onClick={handleClaim} disabled={loading}>
        {loading ? 'Claiming...' : 'Claim Name'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {suinsName && <p>Claimed Name: {suinsName}</p>}
    </div>
  );
};

export default ClaimName;
