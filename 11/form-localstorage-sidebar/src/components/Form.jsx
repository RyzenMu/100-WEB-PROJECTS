import styles from "./Form.module.css";
import { store } from "../features/subscribers/subscriber.js";

export default function Form() {
  function submit() {
    const firstName = document.querySelector(`.${styles.firstNameInput}`).value;
    const lastName = document.querySelector(`.${styles.lastNameInput}`).value;
    const email = document.querySelector(`.${styles.emailInput}`).value;
    const areaCode = document.querySelector(`.${styles.areaCodeInput}`).value;
    const phoneNumber = document.querySelector(
      `.${styles.phoneNumberInput}`
    ).value;
    const streetAddressLine1 = document.querySelector(
      `.${styles.streetAdressLine1Input}`
    ).value;
    const streetAddressLine2 = document.querySelector(
      `.${styles.streetAdressLine2Input}`
    ).value;
    const city = document.querySelector(`.${styles.cityInput}`).value;
    const state = document.querySelector(`.${styles.stateInput}`).value;
    const zipCode = document.querySelector(`.${styles.zipCodeInput}`).value;
    const country = document.querySelector(`.${styles.countryInput}`).value;
    const month = document.querySelector(`.${styles.monthInput}`).value;
    const date = document.querySelector(`.${styles.dateInput}`).value;
    const year = document.querySelector(`.${styles.yearInput}`).value;

    // checkbox checked data
    const checkBoxes = document.querySelectorAll(
      "input[name='feedbackCheckbox']:checked"
    );
    const selectedvalues = [];
    checkBoxes.forEach((checkbox) => {
      selectedvalues.push(checkbox.value);
    });
    console.log(selectedvalues.join(","));

    // get data from radio button
    const selectedContact = document.querySelector(
      'input[name="contactRadio"]:checked'
    ).value;
    console.log(selectedContact);
    console.log(
      firstName,
      lastName,
      email,
      areaCode,
      phoneNumber,
      streetAddressLine1,
      streetAddressLine2,
      city,
      state,
      zipCode,
      country,
      month,
      date,
      year
    );
    store.dispatch({
      type: "subscriber/create",
      payload: {
        firstName,
        lastName,
        email,
        areaCode,
        phoneNumber,
        streetAddressLine1,
        streetAddressLine2,
        city,
        state,
        zipCode,
        country,
        month,
        date,
        year,
        selectedvalues,
        selectedContact,
      },
    });
    console.log(store.getState());
    localStorage.setItem("subscriber1", JSON.stringify(store.getState()));
    const subscriberData = JSON.parse(localStorage.getItem("subscriber1"));
    console.log(subscriberData);
  }
  return (
    <div className={styles.back}>
      <div className={styles.formContainer}>
        <section className={styles.section1}>
          <h1>Twitter Membership Registration</h1>
          <p> Complete the form below to signup for our membership service</p>
        </section>
        <section className={styles.grid}>
          <label className={styles.name}>Name</label>
          <input
            type="text"
            name="firstName"
            className={styles.firstNameInput}
          />
          <span className={styles.firstNameSpan}>first name</span>
          <input type="text" name="lastName" className={styles.lastNameInput} />
          <span className={styles.lastNameSpan}>last name</span>
          <label className={styles.emailLabel}>Email</label>
          <input type="email" name="email" className={styles.emailInput} />
          <label className={styles.phoneNumberLabel}>Phone Number</label>
          <input
            type="number"
            name="areaCode"
            className={styles.areaCodeInput}
          />
          <span className={styles.areaCodeSpan}>area code</span>
          <input
            type="number"
            name="phoneNumber"
            className={styles.phoneNumberInput}
          />
          <span className={styles.phoneNumberSpan}>Phone Number</span>
          <label className={styles.addressLabel}>Address</label>
          <input
            type="text"
            name="streetAddressLine1"
            className={styles.streetAdressLine1Input}
          />
          <span className={styles.streetAdressLine1Span}>Street Address</span>
          <input
            type="text"
            name="streetAddressLine2"
            className={styles.streetAdressLine2Input}
          />
          <span className={styles.streetAdressLine2Span}>
            Street Address Line 2
          </span>
          <input type="text" name="city" className={styles.cityInput} />
          <span className={styles.citySpan}>City</span>
          <input type="text" name="state" className={styles.stateInput} />
          <span className={styles.stateSpan}>State / Province</span>
          <input type="number" name="zipCode" className={styles.zipCodeInput} />
          <span className={styles.zipCodeSpan}>Postal / Zip Code</span>
          <select className={styles.countryInput}>
            <option>India</option>
            <option>Srilanka</option>
            <option>Pakistan</option>
          </select>
          <span className={styles.countrySpan}>Country</span>
          <span className={styles.birthDateSpan}>Birth Date</span>
          <select className={styles.monthInput}>
            <option>January</option>
            <option>February</option>
            <option>March</option>
          </select>
          <span className={styles.monthSpan}>Month</span>
          <select className={styles.dateInput}>
            <option>01</option>
            <option>02</option>
            <option>03</option>
          </select>
          <span className={styles.dateSpan}>Date</span>
          <select className={styles.yearInput}>
            <option>1990</option>
            <option>1991</option>
            <option>1992</option>
          </select>
          <span className={styles.yearSpan}>Year</span>
        </section>
        <section className={styles.section3}>
          <span className={styles.feedbackSpan}>
            Where did you hear about us
          </span>
          <div className={styles.feedbackCheckbox}>
            <div>
              <input type="checkbox" name="feedbackCheckbox" value="friend" />
              <span>A friend or colleauge</span>
            </div>
            <div>
              <input type="checkbox" name="feedbackCheckbox" value="google" />
              <span>Google</span>
            </div>
            <div>
              <input type="checkbox" name="feedbackCheckbox" value="blog" />
              <span>Blog</span>
            </div>
          </div>

          <span className={styles.feedbackSpan}>Preferred way to contact</span>
          <div className={styles.feedbackRadioInput}>
            <div>
              <input type="radio" name="contactRadio" value="email" />
              <span>Email</span>
            </div>
            <div>
              <input type="radio" name="contactRadio" value="phone" />
              <span>Phone</span>
            </div>
            <div>
              <input type="radio" name="contactRadio" value="any" />
              <span>Any</span>
            </div>
          </div>
          <div className={styles.submitButton} onClick={submit}>
            Submit Application
          </div>
        </section>
      </div>
    </div>
  );
}
