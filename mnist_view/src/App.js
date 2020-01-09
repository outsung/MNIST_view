import React from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import './App.css';


async function getData() {
  const carsDataReq = await fetch('https://storage.googleapis.com/tfjs-tutorials/carsData.json');
  const carsData = await carsDataReq.json();

  const cleaned = carsData.map(car => ({
    mpg: car.Miles_per_Gallon,
    horsepower: car.Horsepower,
  })).filter(car => (car.mpg != null && car.horsepower != null));

  return cleaned;
}

function createModel() {
  // 선형 모델 만들기
  const model = tf.sequential();

  // 은닉층 1개 추가
  model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));

  // 출력층 추가
  model.add(tf.layers.dense({units: 1}));

  return model;
}

function convertToTensor(data){
  return tf.tidy(() => {
    // 데이터를 섞어준다.
    tf.util.shuffle(data);

    // 데이터를 텐서로 변환해준다.
    const inputs = data.map(d => d.horsepower);
    const labels = data.map(d => d.mpg);

    const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    // 0 ~ 1 범위만큼 데이터를 정규화 시킨다.
    const inputMax = inputTensor.max();
    const inputMin = inputTensor.min();
    const labelMax = labelTensor.max();
    const labelMin = labelTensor.min();

    const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
    const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

    return {
      inputs: normalizedInputs,
      labels: normalizedLabels,
      // 최대, 최소 값도 넘겨줘서 나중에 재사용 가능하게 해준다.
      inputMax,
      inputMin,
      labelMax,
      labelMin,
    }
  });
}

async function trainModel(model, inputs, labels){
  // 훈련 준비 (모델 컴파일)
  model.compile({
    optimizer: tf.train.adam(),
    loss: tf.losses.meanSquaredError,
    mertics: ['mse'],
  });

  const batchSize = 32;
  const epochs = 50;

  // 훈련 시작
  return await model.fit(inputs, labels, {
    batchSize,
    epochs,
    shuffle: true,
    callbacks: tfvis.show.fitCallbacks(
      { name: 'Training Performance' },
      ['loss', 'mse'],
      { height: 200, callbacks: ['onEpochEnd'] }
    )
  });
  

}

function testModel(model, inputData, normalizationData){
  const {inputMax, inputMin, labelMin, labelMax} = normalizationData;


  //
  const [xs, preds] = tf.tidy(() => {

    const xs = tf.linspace(0, 1, 100);
    const preds = model.predict(xs.reshape([100, 1]));

    const nuNormXs = xs
      .mul(inputMax.sub(inputMin))
      .add(inputMin);
    
    const nuNormPreds = preds
      .mul(labelMax.sub(labelMin))
      .add(labelMin);
      
    // 정규화 하지 않은 데이터 (Un-normalize)
    return [nuNormXs.dataSync(), nuNormPreds.dataSync()];
  });

  const predictedPoints = Array.from(xs).map((val, i)=>{
    return {x: val, y: preds[i]}
  });

  const originalPoints = inputData.map(d => ({
    x: d.horsepower, y: d.mpg,
  }));

  tfvis.render.scatterplot(
    {name: 'Model predictions X Original Data'},
    {values: [originalPoints, predictedPoints], series: ['original', 'predicted']},
    {
      xLabel: 'Horsepower',
      yLabel: 'MPG',
      height: 300
    }
  );
}


async function run(){
  const data = await getData();
  const values = data.map(d => ({
    x: d.horsepower,
    y: d.mpg,
  }));

  tfvis.render.scatterplot(
    {name: 'Horsepower X MPG'},
    {values}, 
    {
      xLabel: 'Horsepower',
      yLabel: 'MPG',
      height: 300
    }
  );

  const model = createModel();
  tfvis.show.modelSummary({name: 'Model Summary'}, model);
  
  const tensorData = convertToTensor(data);
  const {inputs, labels} = tensorData;

  await trainModel(model, inputs, labels);
  console.log('Done training');

  testModel(model, data, tensorData);

}




function main() {
  document.addEventListener('DOMContentLoaded', run);
}


function App() {
  main();
  return (
    <div className='backgound'>
      <h2>간단한 AND 제작 > {100}</h2>
    </div>
  );
}

export default App;
