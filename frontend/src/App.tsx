import React from 'react';

import AuthProvider from './contexts/auth';
import ThemeProvider from './contexts/theme';
import Main from '.';

const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
