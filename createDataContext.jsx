import { useContext, useReducer, createContext } from "react";

export default function createDataContext(actions, initialState, init) {
  // Creating the context and the useContext function
  const Context = createContext();
  const useDataContext = () => useContext(Context);

  // Creating the reducer function based on the actions received
  function reducer(state, action) {
    const { type, payload } = action;

    // Chceck the dispatched function and match its name with the received actions
    for (let key in actions) {
      if (type === actions[key]) {
        return actions[key](state, payload);
      }
    }
  }

  // Creating the provider
  function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState, init);

    // Wrapping the actions inside a dispatch function for each action
    const dispatchActions = {};

    // Looping through the received actions
    for (let key in actions) {
      // Creating the action type from the list of actions received
      const type = actions[key];

      // Creating a wrapper function to dispatch each action
      function disAction(payload) {
        dispatch({ type, payload });
      }

      // Storing all the dispatch functions in one object name 'dispatchActions'
      dispatchActions[key] = (p) => disAction(p);
    }

    return (
      <Context.Provider value={[state, { ...dispatchActions }]}>
        {children}
      </Context.Provider>
    );
  }

  return [useDataContext, Provider];
}
