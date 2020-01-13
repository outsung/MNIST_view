import React from 'react';
import './Canvas.css';


/*
props = {
	drowData

}
*/

function Canvas(){

	setFillStyle = (value) => {
		value *= 255;
		return "rgb("+value+","+value+","+value+")";
	}



	viewData = () => {
		const hView = document.getElementById('canvas');
		const hDrow = hView.getContext('2d')

		let data = this.props();

		if(!data){
			console.log('error!');
			return 0;
		}

			
		let index_j = 0;
		let index_i = 0;
		for(let j = 0; j < 28; j++){
			index_j = j * 15;
			for(let i = 0; i < 28; i++){
				index_i = i * 15;
				// canvas drow !
				hDrow.fillStyle = setFillStyle(data[j, i]);
				hDrow.fillRect(index_i,index_j,15,15);
			}
		}
	};

	hDrowData = (event) => {
		const x = event.pageX;
		const y = event.pageY;
		this.props.drowData(x, y);
	}


	viewData();
	return(
		<canvas id='canvas' className='canvas' onClick={this.hDrowData}></canvas>
	);
}

export default Canvas;