// src/App.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Board from './components/Board';
import { useAppState } from './context/AppStateContext';
import Layout from './layout/Layout';
import Navbar from './layout/Navbar';
import Snackbar from './components/Snackbar';
import Popup from './common/Popup';

const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  text-align: center;
  margin: 20px;
`;

const App: React.FC = () => {
  const { state, dispatch } = useAppState();
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);

  const columnsData = state.columns || [];

  useEffect(() => {
    setShowStatus(!showStatus);
  }, [columnsData]);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className='max-h-screen min-w-full flex flex-col p-0 m-0 box-border'>
      <Navbar />
      <Layout>
        <AppContainer className=' flex flex-col w-[100%]'>
          <h1 className='text-2xl text-cyan-50'>Task Management</h1>
          <Board columns={columnsData} openPopup={openPopup} />
        </AppContainer>
      </Layout>
      {isPopupVisible && <Popup status={true} onClose={closePopup} />}
      {showStatus && <Snackbar />}
    </div>
  );
};

export default App;
