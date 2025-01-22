export const initialState = {
  username: "",
  password: "",
};

export function reducer(state, action) {
  switch (action.type) {
    case "register":
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
      };
    default:
      return state;
  }
}
