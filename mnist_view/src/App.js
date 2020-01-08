import React from 'react';
import { create, all } from 'mathjs';
import './App.css';

const math = create(all, { });

function AND(x1, x2){

  let x = math.matrix([x1, x2]);
  let w = math.matrix([0.5, 0.5]);
  let b = -0.7;

  //tmp = sum(x * w) + b;
  let tmp = math.chain(math.dotMultiply(x, w))
                .sum()
                .add(b)
                .done();

  if(tmp <= 0){
    return 0;
  }
  else{
    return 1;
  }

}

function NAND(x1, x2){

  let x = math.matrix([x1, x2]);
  let w = math.matrix([-0.5, -0.5]);
  let b = 0.7;

  //tmp = sum(x * w) + b;
  let tmp = math.chain(math.dotMultiply(x, w))
                .sum()
                .add(b)
                .done();

  if(tmp <= 0){
    return 0;
  }
  else{
    return 1;
  }

}


function OR(x1, x2){

  let x = math.matrix([x1, x2]);
  let w = math.matrix([0.5, 0.5]);
  let b = -0.2;

  //tmp = sum(x * w) + b;
  let tmp = math.chain(math.dotMultiply(x, w))
                .sum()
                .add(b)
                .done();

  if(tmp <= 0){
    return 0;
  }
  else{
    return 1;
  }

}

function XOR(x1, x2){

  let s1 = NAND(x1, x2);
  let s2 = OR(x1, x2);

  let y = AND(s1, s2);
  return y;
}

function step_function(x){
  //let y = x > 0;
  let y = math.larger(x, 0);
  return math.number(y);
}



function App() {

  let res = 0;

  console.log("---NAND---");
  res = NAND(0, 1); // 0
  console.log("0 && 1 => " + res);
  res = NAND(0, 0); // 0
  console.log("0 && 0 => " + res);
  res = NAND(1, 1); // 1
  console.log("1 && 1 => " + res);
  res = NAND(1, 0); // 0
  console.log("1 && 0 => " + res);


  console.log("---OR---");
  res = OR(0, 1); // 0
  console.log("0 || 1 => " + res);
  res = OR(0, 0); // 0
  console.log("0 || 0 => " + res);
  res = OR(1, 1); // 1
  console.log("1 || 1 => " + res);
  res = OR(1, 0); // 0
  console.log("1 || 0 => " + res);


  console.log("---XOR---");
  res = XOR(0, 1); // 0
  console.log("0 xor 1 => " + res);
  res = XOR(0, 0); // 0
  console.log("0 xor 0 => " + res);
  res = XOR(1, 1); // 1
  console.log("1 xor 1 => " + res);
  res = XOR(1, 0); // 0
  console.log("1 xor 0 => " + res);
  

  console.log("---step_function---");
  res = step_function([1, 2, -2]);
  console.log(res);

  // 71 쪽 까지

  return (
    <div className="backgound">
      <h2>간단한 AND 제작 > {res}</h2>
    </div>
  );
}

export default App;
