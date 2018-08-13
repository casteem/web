import combine from 'utils/combine';
import getTransactions, { getTransactionsReducer } from './actions/getTransactions';
import claimTokens, { claimTokensReducer } from './actions/claimTokens';
import setEthAddress, { setEthAddressReducer } from './actions/setEthAddress';
import withdraw, { withdrawReducer } from './actions/withdraw';

export const initialState = {
  balance: '',
  spToClaim: -1.0,
  ethAddress: null,
  transactions: [],
  withdrawals: [],
  isLoading: false,
  isClaiming: false,
  isUpdating: false,
};

export const reducer = (state = initialState, action) => combine(
  [
    getTransactionsReducer,
    claimTokensReducer,
    setEthAddressReducer,
    withdrawReducer,
  ],
  state,
  action,
);

// All sagas to be loaded
export default [
  getTransactions,
  claimTokens,
  setEthAddress,
  withdraw,
];
