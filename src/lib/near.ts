import { FaucetContract } from '@/app/api/faucet/tokens/models';
import { EXEC_GAS } from '@/consts';
import { Connection, Account, InMemorySigner, KeyPair } from 'web3-api-js';
import { InMemoryKeyStore } from 'web3-api-js/lib/key_stores';
import { JsonRpcProvider } from 'web3-api-js/lib/providers';

let nearAccount: Account;

const connectToNearAccount = async () => {
  if (nearAccount) return;

  const { NEAR_CALLER_ID, NEAR_CALLER_SK } = process.env;

  const keyPair = KeyPair.fromString(NEAR_CALLER_SK);
  const keyStore = new InMemoryKeyStore();
  await keyStore.setKey('testnet', NEAR_CALLER_ID, keyPair);

  const config = {
    networkId: 'testnet',
    provider: new JsonRpcProvider({ url: 'https://unc-test.jongun2038.win' }),
    signer: new InMemorySigner(keyStore),
    jsvmAccountId: 'jsvm.testnet'
  };

  nearAccount = new Account(Connection.fromConfig(config), NEAR_CALLER_ID);
};

export const connectToFaucet = async (): Promise<FaucetContract> => {
  await connectToNearAccount();

  return {
    'ft_list_tokens': async () => await nearAccount.viewFunction({ contractId: process.env.NEAR_FAUCET_ID, methodName: 'ft_list_tokens' }),
    'request_near': async (args: { request_amount: string, receiver_id: string; }) => await nearAccount.functionCall({ contractId: process.env.NEAR_FAUCET_ID, methodName: 'request_near', args, gas: BigInt(EXEC_GAS) }),
    'ft_request_funds': async (args: { amount: string, receiver_id: string, ft_contract_id: string; }) => await nearAccount.functionCall({ contractId: process.env.NEAR_FAUCET_ID, methodName: 'ft_request_funds', args, gas: BigInt(EXEC_GAS) })
  };
};
