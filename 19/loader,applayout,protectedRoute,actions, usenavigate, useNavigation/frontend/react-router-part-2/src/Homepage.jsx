import { NavLink } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <h1>This is a Home page</h1>
      <NavLink to="login">click here! to login</NavLink>
      <br></br>
      <br></br>
      <NavLink to="signup">signup</NavLink>
    </div>
  );
}

export default Homepage;
