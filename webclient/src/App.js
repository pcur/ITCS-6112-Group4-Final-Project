import React from 'react';
import AppRoutes from './routes';
import TopBar from './components/TopBar'; // Import TopBar component

function App() {
  return (
    <div>
      <TopBar /> {/* Include TopBar at the top */}
      <AppRoutes /> {/* Routes go here */}
    </div>
  );
}

export default App;
