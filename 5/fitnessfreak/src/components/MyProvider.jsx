import { useReducer } from "react";

import MyContext from "./MyContext";
import { reducer, initialState } from "./reducer";

/* eslint-disable react/prop-types */
function MyProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MyContext.Provider value={(state, dispatch)}>
      {children}
    </MyContext.Provider>
  );
}

export default MyProvider;
