import Styled from "styled-components";

const H1 = Styled.h1`
  color: #6b2d37;
  text-align: center;
`;

const StyledBody = Styled.div`
  background-color: lightgrey; 
  font-family: Arial, sans-serif;
  `;

const Center = Styled.div`
  display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;  
    `;

const Button = Styled.button`
  background-color: #6b2d37;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 5px;
  &:hover {
    background-color: #5a2a30;
  }
`;    

export default function Home() {
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    function handleModal1() {
        setModal1Open(true);
    }
    function handleModal2() {
        setModal2Open(true);
    }
  return (
    <StyledBody className="App">
      <Center>
        <div style={{backgroundColor: "white", padding: "20px", borderRadius: "10px"}}>
          <H1>Modal</H1>
          <Button onClick={handleModal1}>Modal-1 Register form</Button><br/>
          <Button onClick={handleModal2}>Modal-2 Login form</Button>
        </div>
      </Center>
    </StyledBody>
  );
}
