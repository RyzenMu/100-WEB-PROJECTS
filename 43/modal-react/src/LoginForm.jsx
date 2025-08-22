import styled from "styled-components";

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #99858568;
  font-family: Arial, Helvetica, sans-serif;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;`;

export default function LoginForm({onSetModal2Open}) {
    function close() {
        onSetModal2Open(false);
    }
  return (
    <Center
      style={{
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div style={{border: "1px solid #574949", padding: "20px", borderRadius: "10px", backgroundColor: "white", position:"relative"}}>
        {" "}
        <button style={{fontWeight:"bolder", border:"none", position:"absolute", right:"20px", fontSize:"33px"}}onClick={close}>&times;</button>
        <h1 style={{ color: "#6b2d37", textAlign: "center" }}>Login</h1>
        <form>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="username">Username:</label>
            <br />
            <input type="text" id="username" name="username" required />
          </div>
         
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="password">Password:</label>
            <br />
            <input type="password" id="password" name="password" required />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#6b2d37",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "10px",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </Center>
  );
}
