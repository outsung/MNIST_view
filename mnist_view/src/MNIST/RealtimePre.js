import React, { Component } from 'react';
import View from './View';
import Canvas from './Canvas';
import './RealtimePre.css';

class RealtimePre extends Component {
  state = {
    data: [],
  }

  drowData = (x, y) => {
    let newData = this.state.data;
    
    let fillter =
      [[[.5],[.8],[.5]],
      [[.8],[1.],[.8]],
      [[.5],[.8],[.5]]];

    // -1 0 1
    for(let j = -1; j <= 1; j++){
      for(let i = -1; i <= 1; i++){
        newData[y + j][x + i] += fillter[j + 1][i + 1];
      }
    }

    this.setState({
      data: newData
    });
  }

  setInitData = () => {
    let temp_j = new Array();
    let temp_i = new Array();

    for(let j = 0; j > 28; j++){
      temp_i = new Array();
      for(let i = 0; i > 28; i++){
        temp_i.push(0);
      }
      temp_j.push(temp_i);
    }

    console.log(temp_j);

    this.setState({
      data: temp_j,
    });
  }


  setRandomData = () => {
    let temp_j = new Array();
    let temp_i = new Array();

    for(let j = 0; j > 28; j++){
      temp_i = new Array();
      for(let i = 0; i > 28; i++){
        temp_i.push(Math.random());
      }
      temp_j.push(temp_i);
    }

    console.log(temp_j);

    this.setState({
      data: temp_j,
    });
  }

  render() {
    return (
      <div>
        <div onClick={this.state.data ? this.randomDrowData : this.initDrowData}>
          click!
        </div>
        <View data={this.state.data}></View>
        <Canvas data={this.state.data} drowData={this.drowData}></Canvas>
      </div>
    );
  }
}


export default RealtimePre;