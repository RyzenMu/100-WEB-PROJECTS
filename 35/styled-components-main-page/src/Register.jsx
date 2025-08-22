import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #3d3232;
`;

const Form = styled.form`
  background-color: #9a6969;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(243, 231, 231, 0.299);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const Button = styled.button`
  width: 50%;
  padding: 0.8rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #357abd;
  }
`;

const Link = styled.a`
  color: #f4f6f8;
  text-decoration: none;
  text-align: center;
  display: block;
  margin-top: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Register</Title>
        <Input type="text" placeholder="Full Name" required />
        <Input type="email" placeholder="Email" required />
        <Input type="password" placeholder="Password" required />
        <Input type="password" placeholder="Confirm Password" required />
        <Button type="submit">Register</Button>
        <Link href="/login">Already have an account? Login</Link>
      </Form>
    </FormContainer>
  );
} 