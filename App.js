// App.js
import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { setUser } from './src/store/userSlice';
import { MyContextControllerProvider } from './src/store';

const App = () => {

  return (
    <MyContextControllerProvider>
      <AppNavigator />
    </MyContextControllerProvider>
  );


};

export default App;
