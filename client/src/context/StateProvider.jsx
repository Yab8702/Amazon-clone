import { createContext, useContext, useReducer } from "react";
const StateContext = createContext();
function StateProvider({ reducer, intialValue, children }) {
  return (
    <StateContext.Provider value={useReducer(reducer, intialValue)}>
      {children}
    </StateContext.Provider>
  );
}

export default StateProvider;
export const useStateValue = () => useContext(StateContext);
