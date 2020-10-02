import React from 'react';
import GameBoard from './Components/GameBoard'
import {Provider} from 'react-redux'
import store from './redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <GameBoard/>
    </Provider>
    
  );
}

