import React, { Component } from 'react';
import View from './View';
import Canvas from './Canvas';
import './RealtimePre.css';

class RealtimePre extends Component {
  state = {
    data: [],
  }

  randomDrowData = () => {
    this.SetState({


    })

  } 

  render() {

    return (
      <div>
        <View></View>
        <Canvas></Canvas>
      </div>
    );
  }
}


export default RealtimePre;