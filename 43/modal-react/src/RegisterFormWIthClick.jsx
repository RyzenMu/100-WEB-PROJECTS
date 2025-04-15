import { useEffect, useRef } from "react";
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
`;

export default function RegisterForm({ onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Call the close function
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <Center>
      <div
        ref={modalRef}
        style={{
          border: "1px solid #574949",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <h1 style={{ color: "#6b2d37", textAlign: "center" }}>Register</h1>
        {/* form content */}
      </div>
    </Center>
  );
}
