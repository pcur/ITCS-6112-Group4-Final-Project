import React from 'react';
import AppRoutes from './routes'; // Your routing component
import TopBar from './components/topBar'; // Import the TopBar component

function App() {
  return (
    <div>
      <TopBar />  {/* Render the TopBar here */}
      <AppRoutes />
    </div>
  );
}

export default App;
