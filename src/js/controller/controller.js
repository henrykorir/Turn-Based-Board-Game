import Position from '../model/Position.js';
import Box from '../model/Box.js';


export default class Controller{
	constructor(model, view){
		this._model = model;
		this._view = view;
		this.init = this.init.bind(this);
	}
	init(){
		this.createBoard();
	}
	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
	}
	/*
	placeObstacles(){
		let i = 1;
		let ids = [];
		while( i <= 12){
			let x = getRandomInt(0, 99);
			let id = x < 10 ? '0' + x : "" + x;
			ids.push(id);
			i++;
		}
		for( id of ids ){
			for(let i = 0; i < 100; i++){
				if(this.board[i].id == id.trim()){ 
					this.board[i].status = 0;
				}
			}
		}
	}
	*/
	placeWeapons(){
		
	}
	placePlayers(){
		
	}
	createBoard(){
		let grid = [];
		let index = 0;
		for(let i = 0; i < 10; i++){
			for(let j = 0; j < 10; j++){
				let attr = " " + i + j;
				grid.push(new Box(index, attr.trim(), 0, new Position(i, j)));
				index++;
			}
		}
		this._view.createBoard(grid);
		this._model.setGrid(grid);
	}
	legalBoxes(attr){
		let pos =  parseInt(attr);
		let x = attr.charAt(0);
		let y = attr.charAt(1);
		let active = []; //open slot for player to move to
				
		for(let i = 1; i < 4; i++){
			 let right = pos + i;
			 let left = pos - i;
			 let down = pos + (10 * i);
			 let top = pos - (10 * i);
			if(right <= parseInt(x + '9')) active.push((right < 10 ? '0' + right : right));
			if(down <= parseInt('9' + y)) active.push((down < 10 ? '0' + down : down));
			if(left >= parseInt(x + '0')) active.push((left < 10 ? '0' + left : left));
			if(top >= parseInt('0' + y)) active.push((top < 10 ? '0' + top : top));
		}
		this._view.probaleNextMove(active);
	}
}
//const App = new Controller(new View(), new Model());
//App.createBoard();
//export default { App };