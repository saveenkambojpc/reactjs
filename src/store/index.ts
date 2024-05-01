import { configureStore } from "@reduxjs/toolkit";
import GlobalReducer from "./features/global/globalSlice";
import ModalReducer from "./features/modalSlice";
import { authApi } from "../services/api/authApi";
import { roleApi } from "../services/api/roleApi";
import { userApi } from "../services/api/userApi";
import { allergyApi } from "../services/api/allergyApi";
import { dietApi } from "../services/api/diet";
import { documentApi } from "../services/api/document";
import { dietRecommendationApi } from "../services/api";
import { medicationApi } from "../services/api/medication";
import { handleApiErrors } from "./middleware";
import { featureApi } from "../services/api/feature";
import { memberApi } from "../services/api/member";

export const store = configureStore({
  reducer: {
    global: GlobalReducer,
    modal: ModalReducer,
    [authApi.reducerPath]: authApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [allergyApi.reducerPath]: allergyApi.reducer,
    [dietApi.reducerPath]: dietApi.reducer,
    [documentApi.reducerPath]: documentApi.reducer,
    [dietRecommendationApi.reducerPath]: dietRecommendationApi.reducer, //DIET RECOMMENDATION
    [medicationApi.reducerPath]: medicationApi.reducer,
    [featureApi.reducerPath]: featureApi.reducer,
    [memberApi.reducerPath]: memberApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      handleApiErrors,
      authApi.middleware,
      roleApi.middleware,
      userApi.middleware,
      allergyApi.middleware,
      dietApi.middleware,
      documentApi.middleware,
      dietRecommendationApi.middleware,
      medicationApi.middleware,
      featureApi.middleware,
      memberApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
