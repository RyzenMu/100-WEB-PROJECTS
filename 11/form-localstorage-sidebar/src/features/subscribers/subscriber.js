import { createStore } from "redux";

const initialValue = {
  firstName: "",
  lastName: "",
  email: "",
  areaCode: "",
  phoneNumber: "",
  streetAddressLine1: "",
  streetAddressLine2: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  month: "",
  date: "",
  year: "",
  selectedValues: [],
  selectedContact: "",
};

function subscriberReducer(state = initialValue, action) {
  switch (action.type) {
    case "subscriber/create":
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        areaCode: action.payload.areaCode,
        phoneNumber: action.payload.phoneNumber,
        streetAddressLine1: action.payload.streetAddressLine1,
        streetAddressLine2: action.payload.streetAddressLine2,
        city: action.payload.city,
        state: action.payload.state,
        zipCode: action.payload.zipCode,
        country: action.payload.country,
        month: action.payload.month,
        date: action.payload.date,
        year: action.payload.year,
        selectedValues: action.payload.selectedValues,
        selectedContact: action.payload.selectedContact,
      };
  }
}

const store = createStore(subscriberReducer);

export { store };
