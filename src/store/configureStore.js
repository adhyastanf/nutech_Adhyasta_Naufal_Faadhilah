import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import profileReducer from './profile-slice';
import bannerReducer from './banner-slice';
import servicesReducer from './services-slice';
import balanceReducer from './balance-slice';
import transactionReducer from './transaction-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    banner: bannerReducer,
    services: servicesReducer,
    balance: balanceReducer,
    transaction: transactionReducer,
  },
  devTools: true,
});
