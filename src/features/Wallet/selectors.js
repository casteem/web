import { createSelector } from 'reselect';

const selectWalletDomain = () => state => state.wallet;

export const selectBalance = () => createSelector(
  selectWalletDomain(),
  state => state.balance,
);

export const selectSPToClaim = () => createSelector(
  selectWalletDomain(),
  state => state.spToClaim,
);

export const selectTransactions = () => createSelector(
  selectWalletDomain(),
  state => state.transactions,
);

export const selectIsLoading = () => createSelector(
  selectWalletDomain(),
  state => state.isLoading,
);

export const selectIsClaiming = () => createSelector(
  selectWalletDomain(),
  state => state.isClaiming,
);

