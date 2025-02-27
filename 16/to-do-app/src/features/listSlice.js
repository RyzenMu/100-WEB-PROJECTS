const initialState = {
  htmlCss: ["drop-down", "css attribute selectors", "flex-basis"],
  javascript: [
    "element.childNode",
    "event.stoppropogation",
    "event.currentTarget",
  ],
  react: ["react-router", "react-query", "JWT and sessions"],
};

export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case "list/display":
      return state;
    case "list/addHtmlCss":
      return { ...state, htmlCss: [action.payload, ...state.htmlCss] };
    case "list/addJavascript":
      return { ...state, javascript: [action.payload, ...state.javascript] };
    case "list/addReact":
      return { ...state, react: [action.payload, ...state.react] };
    default:
      return state;
  }
}

export function addHtmlCss(topic) {
  return {
    type: "list/addHtmlCss",
    payload: topic,
  };
}

export function addJavascript(topic) {
  return {
    type: "list/addJavascript",
    payload: topic,
  };
}

export function addReact(topic) {
  return {
    type: "list/addReact",
    payload: topic,
  };
}
