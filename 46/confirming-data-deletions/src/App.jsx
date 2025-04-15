import { useState } from 'react';

export default function App() {
  const [confirmBox, setConfirmBox] = useState(false);
  function deleteItem() {
    setConfirmBox(true);
  }
  function handleConfirmBox() {
    alert('Item deleted');
    setConfirmBox(false);
  }
  return (
    <div style={{ padding: '20px' , display: 'flex', flexDirection: 'column', gap: '10px', border: '1px solid black', width: '300px', margin: 'auto' , fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', alignItems: 'center', justifyContent: 'center', }}>
      <h1>Confirmation</h1>
      <p>This is a simple React application.</p>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button style={{border:'none', backgroundColor:'lightblue', fontSize:'20px'}}>cancel</button>
        <button style={{border:'none', backgroundColor:'lightblue', fontSize:'20px'}} onClick={deleteItem}>delete</button>
      </div>
      {
        confirmBox && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid red', backgroundColor: '#fff3f3', color: 'red', borderRadius: '5px' }}>
            Are you sure you want to delete this item?
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button style={{border:'none', backgroundColor:'lightblue', fontSize:'20px'}} onClick={handleConfirmBox}>yes</button>
              <button style={{border:'none', backgroundColor:'lightblue', fontSize:'20px'}} onClick={() => setConfirmBox(false)}>no</button>
            </div>
          </div>
        )
      }
    </div>
  );
}