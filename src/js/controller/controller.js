import Position from '../model/position.js';
import Box from '../model/box.js';
import Weapon from '../model/weapon.js';
import Player from '../model/player.js';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}

export default class Controller{
	constructor(model, view){
		this._model = model;
		this._view = view;
		
		this.init = this.init.bind(this);
		this._view.movePlayer(this.handleMovingPlayer);
	}
	init(){
		this.createBoard()
		.createBarriers()
		.createPlayers()
		.createWeapons();
		console.log(this._model.state);
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
		this._model.setGrid(grid);
		return this;
	}
	createBarriers(){
		let index, grid = this._model.grid;
		for(let n = 1; n <= 12; n++){
		/*1. generate random index*/
		/*2. use the index to retrive a square in the grid*/
		/*3a. if the square is occupied got to 1*/
			while(((index = getRandomInt(0,99)) == grid[index].id) && grid[index].status != 0){};
		/*3b  otherwise set the box as occupied*/
			this._model.grid[index].status = 1;
			this._model.setBarrier(this._model.grid[index]);
			//barriers.push(new Box(grid[index].id, grid[index].attr, this._model.grid[index].status, grid[index].position));

			
		}
		
		return this;
	}
	createPlayers(){
		let index, grid = this._model.grid;
		for(let i = 0; i < 2; i++){
		/*1. generate random index*/
		/*2. use the index to retrive a square in the grid*/
		/*3a. if the square is occupied got to 1*/
			while(((index = getRandomInt(0,99)) == grid[index].id) && grid[index].status != 0){};
		/*3b. otherwise set the box as occupied*/
			this._model.grid[index].status = 3;
		/*3c. create the item*/
			let weapon = new Weapon(i, ((i < 2) ? "pawn" : "knight"),grid[index].position,50 *( i + 1 ));
			this._model.setWeapon(weapon);
			this._model.setPlayer(new Player(i,grid[index],grid[index].position,100, weapon));
		}
		this._model.currentPlayer = this._model.players[0];
		return this;
	}
	createWeapons(){
		let index, grid = this._model.grid;
		for(let i = 2; i < 4; i++){
		/*1. generate random index*/
		/*2. use the index to retrive a square in the grid*/
		/*3a. if the square is occupied got to 1*/
			while(((index = getRandomInt(0,99)) == grid[index].id) && grid[index].status != 0){};
		/*3b  otherwise set the box as occupied*/
			this._model.grid[index].status = 2;
		/*4  repeat until count is 12*/
			this._model.setWeapon(new Weapon(i, ((i < 3) ? "bishop" : "queen"),grid[index].position,50 *( i + 1 )));
		}
		return this;
	}
	handleMovingPlayer = attr =>{
		console.log("Update");
		/*1. move current player and then choose thenext player*/
		for(let index in this._model.grid){
			if(this._model.grid[index].attr.trim() == attr.trim()){
				this._model.grid[index].status = 3;
				this._model.currentPlayer.box = attr;
				let id = this._model.currentPlayer.id;
				//this._model.players[id].box = attr;
				//this._model.currentPlayer = (id == 0) ? this._model.players[1] :  this._model.players[0];
				break;
			}
		}
		
		/*2. */
	
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
		this._view.probableNextMoves(active);
		this._model.probableNextMoves = active;
	}
}
