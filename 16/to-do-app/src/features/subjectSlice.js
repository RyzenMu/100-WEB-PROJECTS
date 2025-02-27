const initialState = {
  selectedSubject: "",
};

export default function subjectReducer(state = initialState, action) {
  switch (action.type) {
    case "selectedSubject":
      return { ...state, selectedSubject: action.payload };
    default:
      return state;
  }
}

export function selectSubject(subject) {
  return {
    type: "selectedSubject",
    payload: subject,
  };
}
