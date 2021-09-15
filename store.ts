import { applyMiddleware, createStore } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import { useMemo } from "react";

let store: any;

const initState = {
  username: "",
  userId: -1,
};

const reducer = (state = initState, action: any) => {
  switch (action.type) {
    case "LOGIN": // basic login
      return {
        ...state,
        username: action.username,
        userId: action.userId,
      };
    default:
      return state;
  }
};

function initStore(preloadedState = initState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export type RootState = ReturnType<typeof store.getState>;

export function useStore(initialState: any) {
  return useMemo(() => initializeStore(initialState), [initialState]);
}
