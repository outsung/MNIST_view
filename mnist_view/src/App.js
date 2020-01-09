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



// 계단 함수
function step_function(x){
  //let y = x > 0;
  let y = math.larger(x, 0);
  return math.number(y);
}


// 시그모이드
function sigmoid(x){
  // 1 / (1 + math.exp(-x))
  
  let tmp = math.chain(math.dotMultiply(-1, x))
                .exp()
                .add(1)
                .done();
  
  let y = math.dotDivide(1, tmp);

  return y;
}

// ReLU 함수
function relu(x){
  // math.maximum(0, x)

  let zero = math.zeros(math.size(x));
  const max = math.max;
  let y = math.apply([zero, x], 0, max);

  return y;
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
  console.log(res); // [1, 1, 0]


  console.log("---sigmoid---");
  res = sigmoid([-1.0, 1.0, 2.0]);
  console.log(res); // [0.26894142, 0.73105858, 0.88079708]

  
  console.log("---relu---");
  res = relu([-1.0, 1.0, 2.0]);
  console.log(res); // [0, 1.0, 2.0]


  let A,B;
  console.log("---matrix---");
  A = math.matrix([[1,3,4], [4,5,6]]);
  B = math.matrix([[1,2], [3,4], [5,6]]);
  res = math.dot(A, B);
  console.log(res); // [[22, 28], [49, 64]]


  return (
    <div className="backgound">
      <h2>간단한 AND 제작 > {100}</h2>
    </div>
  );
}

export default App;
