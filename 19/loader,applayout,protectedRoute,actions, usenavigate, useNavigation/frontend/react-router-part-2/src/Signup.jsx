import { Form, useActionData, useNavigate } from "react-router-dom";

function Signup() {
  const feedback = useActionData();
  const navigate = useNavigate();
  if (feedback?.message === "user created") {
    navigate("/login");
  }
  return (
    <Form method="post">
      <h1>Sign Up</h1>
      {/* /*show success or failure message */}
      {feedback?.message && (
        <p style={{ color: "green" }}>{feedback.message}</p>
      )}
      {feedback?.error && <p style={{ color: "red" }}>{feedback.error}</p>}
      <input type="text" placeholder="username" name="userName" required />
      <br></br>
      <input type="password" placeholder="password" name="password" required />
      <br></br>
      <input
        type="password"
        placeholder="retype password"
        name="retypePassword"
        required
      />
      <br></br>
      <button type="submit">Submit</button>
    </Form>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);
  try {
    const response = await fetch("http://localhost:5001/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to signup");
    }

    console.log("user created successfully");
    return response.json();
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

export default Signup;
