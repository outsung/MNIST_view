import React from 'react';
import { create, all } from 'mathjs';
import './App.css';

const math = create(all, { });

function App() {

  let x = [1.0, 2.0, 3.0];
  let y = [2.0, 4.0, 6.0];


  // +
  let res = math.add(x, y);
  console.log(res);

  // - 
  res = math.subtract(x, y);
  console.log(res);

  // *
  res = math.dotMultiply(x, y);
  console.log(res);

  // / 
  res = math.dotDivide(x, y);
  console.log(res);


  // 브로드캐스트 확인
  res = math.dotDivide(x, 2.0);
  console.log(res);


  


  return (
    <div className="backgound">
      <h2>하이 {res} </h2>
    </div>
  );
}

export default App;
