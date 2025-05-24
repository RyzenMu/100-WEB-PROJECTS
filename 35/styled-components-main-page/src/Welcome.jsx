import styled from "styled-components";

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  text-align: center;
  padding: 2rem;
`;

const WelcomeCard = styled.div`
  background-color: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`;

const Greeting = styled.h1`
  color: #333;
  margin-bottom: 1rem;
  font-size: 2.5rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Button = styled.button`
  padding: 1rem 2rem;
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

const TimeOfDay = styled.span`
  color: #4a90e2;
  font-weight: bold;
`;

export default function Welcome() {
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <WelcomeContainer>
      <WelcomeCard>
        <Greeting>
          <TimeOfDay>{getTimeOfDay()}</TimeOfDay>, Welcome!
        </Greeting>
        <Subtitle>
          We're excited to have you here. Your journey with us begins now.
          Feel free to explore and make the most of your experience.
        </Subtitle>
        <Button>Get Started</Button>
      </WelcomeCard>
    </WelcomeContainer>
  );
} 