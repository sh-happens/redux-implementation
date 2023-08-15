// Slomux - реализация Flux, в которой, как следует из названия, что-то сломано.
// Нужно починить то, что сломано, и подготовить Slomux к использованию на больших проектах, где крайне важна производительность

import React from "react";

// ВНИМАНИЕ! Замена slomux на готовое решение не является решением задачи

const validateAction = (action) => {
  if (!action || typeof action !== "object" || Array.isArray(action)) {
    throw new Error("Action must be an object!");
  }
  if (typeof action.type === "undefined") {
    throw new Error("Action must have a type!");
  }
};

// reducers
export const initialState = {
  counter: 1,
  stepSize: 1,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COUNTER:
      let updatedCounter = state.counter;
      updatedCounter += action.payload;
      return {
        ...state,
        counter: updatedCounter,
      };
    case CHANGE_STEP_SIZE:
      let changedStepsize = state.stepSize;
      changedStepsize = action.payload;
      return {
        ...state,
        stepSize: changedStepsize,
      };
    default: {
      return state;
    }
  }
};

export const createStore = (reducer, initialState) => {
  let currentState = initialState;
  let listeners = [];

  const getState = () => currentState;
  const dispatch = (action) => {
    validateAction(action);
    currentState = reducer(currentState, action);
    listeners.forEach((listener) => listener());
  };
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > 0) {
        listeners.splice(index, 1);
      }
    };
  };
  return { getState, dispatch, subscribe };
};

const ReduxContext = React.createContext(initialState);

export const useSelector = (selector) => {
  const ctx = React.useContext(ReduxContext);
  if (!ctx) {
    return 0;
  }
  return selector(ctx.store.getState());
};
export const useDispatch = () => {
  const ctx = React.useContext(ReduxContext);
  if (!ctx) {
    return () => {};
  }

  return ctx.store.dispatch;
};

export const Provider = ({ store, children }) => {
  const [state, setState] = React.useState(() => store.getState());
  console.log(state);

  React.useEffect(() => {
    return store.subscribe(() => {
      setState(store.getState());
    });
  }, [store, setState]);
  return (
    <ReduxContext.Provider value={{ store }}>{children}</ReduxContext.Provider>
  );
};

// APP

// actions
export const UPDATE_COUNTER = "UPDATE_COUNTER";
export const CHANGE_STEP_SIZE = "CHANGE_STEP_SIZE";

// action creators
export const updateCounter = (value) => ({
  type: UPDATE_COUNTER,
  payload: value,
});

export const changeStepSize = (value) => ({
  type: CHANGE_STEP_SIZE,
  payload: value,
});
