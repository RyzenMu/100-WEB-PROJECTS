import { useState, useEffect } from 'react';
import styled from 'styled-components';

import supabase from './supabaseClient';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: rgb(33, 87, 169);
  padding: 2rem;
`;

const Title = styled.h1`
  color: #1a73e8;
  font-size: 1.5rem;
  text-align: center;
  padding: 2rem;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px;
`;

const Paragraph = styled.p`
  color: #1a73e8;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const TableContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f8f9fa;
  border-bottom: 2px solid #1a73e8;
  
  div {
    flex: 1;
    text-align: center;
    font-weight: 600;
    color: #1a73e8;
    padding: 1rem;
    font-size: 1.1rem;
    border-right: 1px solid #e0e0e0;
    
    &:last-child {
      border-right: none;
    }
  }
`;

const TableBody = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f5f8ff;
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  div {
    flex: 1;
    text-align: center;
    color: #333;
    padding: 1rem;
    font-size: 1rem;
    border-right: 1px solid #e0e0e0;
    
    &:last-child {
      border-right: none;
    }
  }
`;

function App() {
  const [waterData, setWaterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWaterData();
  }, []);

  async function fetchWaterData() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('water-management-system')
        .select('id, date, water_consumed, feedback')
        .order('date', { ascending: false });

      if (error) {
        throw error;
      }

      console.log('Fetched data:', data); // Debug log
      setWaterData(data);
    } catch (error) {
      console.error('Error details:', error); // Debug log
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <Title>
        <Paragraph>Water Management System</Paragraph>
        <TableContainer>
          <TableHeader>
            <div>SL.no</div>
            <div>Date</div>
            <div>Water Consumed</div>
            <div>Feedback</div>     
          </TableHeader>
          {waterData.map((record, index) => (
            <TableBody key={record.id}>
              <div>{index + 1}</div>
              <div>{new Date(record.date).toLocaleDateString()}</div>
              <div>{record.water_consumed} litre</div>
              <div>{record.feedback || 'N/A'}</div>
            </TableBody>
          ))}
        </TableContainer>
      </Title>
    </Container>
  );
}

export default App;
