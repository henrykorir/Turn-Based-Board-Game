import Position from './model/Position.js'
import Box from './model/Box.js'
export default class View{
	constructor(){
		this._board = this.createBoard().slice() || [];
		this._weapons = [];
		this._players = [];
	}
	createBoard(){
		let board = [];
		for(let i = 0; i < 10; i++){
			for(let j = 0; j < 10; j++){
				let id = " " + i + j;
				board.push(new Box(id, 1, new Position(i, j)));
			}
		}
		this.placeObstacles();
		return board;
	}
	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
	}
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
	placeWeapons(){
		
	}
	placePlayers(){
		
	}
} 
