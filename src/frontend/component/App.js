import React from 'react';
import PurpleAppBar from './PurpleAppBar.js';      // AppBar with simple overrides
import SuccessButton from './SuccessButton.js';    // A button with complex overrides
import { Button } from 'react-toolbox/lib/button'; // Bundled component import
import Header from './Header';

const App = (props) => (
  <div>
    <PurpleAppBar />
    <section style={{ padding: 20 }}>
      <Header />
      {props.children}
    </section>
  </div>
);

export default App;
