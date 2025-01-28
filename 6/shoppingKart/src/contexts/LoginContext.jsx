import { createContext, useContext, useReducer } from "react";

// creating states using useReducer
const initialValue = {
  username: "sami",
  password: "000",
  isLoggedin: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isLoggedin: true,
        username: action.payload.username,
        password: action.payload.password,
      };
    default:
      return { initialValue };
  }
}

// creating context
const LoginContextC = createContext();

/* eslint-disable react/prop-types */
function LoginContextProvider({ children }) {
  const [{ username, password, isLoggedin }, dispatch] = useReducer(
    reducer,
    initialValue
  );

  const value = {
    username,
    password,
    dispatch,
    isLoggedin,
  };
  return (
    <LoginContextC.Provider value={value}>{children}</LoginContextC.Provider>
  );
}

function useLogin() {
  const context = useContext(LoginContextC);
  if (!context) throw new Error("Use variables inside context");
  return context;
}

export { LoginContextProvider, useLogin };
