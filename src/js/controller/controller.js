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
		this._model.bindUserChanged(this.onPlayerChanged);
		
	}
	init = () => {
		this.createBoard().createBarriers().createPlayers().createWeapons();
		this._view.placeObjects(this._model.state);
		this._model.currentPlayer = this._model.state.players[0];
		this._view.movePlayer(this.onPlayerMoved);
		
		this.onPlayerChanged(this._model.state);
	}
	createBoard = () => {
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
	createBarriers = () => {
		let index, grid = [...this._model.state.grid];
		for(let n = 1; n <= 12; n++){
		/*1. generate random index*/
		/*2. use the index to retrive a square in the grid*/
		/*3a. if the square is occupied got to 1*/
			while(((index = getRandomInt(0,99)) == grid[index].id) && grid[index].status != 0){};
		/*3b  otherwise set the box as occupied*/
			this._model.state.grid[index].status = 2;
			this._model.setBarrier(this._model.state.grid[index]);
			//barriers.push(new Box(grid[index].id, grid[index].attr, this._model.grid[index].status, grid[index].position));
		}
		return this;
	}
	createPlayers = () => {
		let index, grid = [...this._model.state.grid];
		for(let i = 0; i < 2; i++){
		/*1. generate random index*/
		/*2. use the index to retrive a square in the grid*/
		/*3a. if the square is occupied got to 1*/
			while(((index = getRandomInt(0,99)) == grid[index].id) && grid[index].status != 0){};
		/*3b. otherwise set the box as occupied*/
			this._model.state.grid[index].status = 3;
		/*3c. create the item*/
			let weapon = new Weapon(i, this._model.state.grid[index],((i < 2) ? "pawn" : "knight"),grid[index].position,50 *( i + 1 ));
			weapon.isTaken = true;
			this._model.setWeapon(weapon);
			this._model.setPlayer(new Player(i,grid[index],grid[index].position,100, weapon));
		}
		return this;
	}
	createWeapons = () => {
		let index, grid = [...this._model.state.grid];
		for(let i = 2; i < 4; i++){
		/*1. generate random index*/
		/*2. use the index to retrive a square in the grid*/
		/*3a. if the square is occupied got to 1*/
			while(((index = getRandomInt(0,99)) == grid[index].id) && grid[index].status != 0){};
		/*3b  otherwise set the box as occupied*/
			this._model.state.grid[index].status = 1;
		/*4  repeat until count is 12*/
			this._model.setWeapon(new Weapon(i, this._model.state.grid[index],((i < 3) ? "bishop" : "queen"),grid[index].position,50 *( i + 1 )));
		}
		return this;
	}
	
	onPlayerMoved = ( player , dest ) =>{
		let src = player.box.attr;
		/*1. move current player and then choose the next player*/
		this._model.state.grid[player.id].status = 0; //set source  box as empty
		this._model.state.grid[parseInt(dest)].status = 3; //set destination box as occupied
		console.log(this._model.state.players, player);
		this._model.state.players[player.id].box = this._model.state.grid[parseInt(dest)];
		this._model.currentPlayer = (player.id == 0) ? this._model.players[1] :  this._model.players[0];
	}
	onPlayerChanged = ( state ) =>{
		let attr = state.currentPlayer.box.attr;
		let pos =  parseInt(attr);
		let x = attr.charAt(0);
		let y = attr.charAt(1);
		let active = []; //open slot for player to move to
		let grid = [...state.grid];
		for(let i = 1; i < 4; i++){
			let right = pos + i;
			let left = pos - i;
			let down = pos + (10 * i);
			let top = pos - (10 * i);
			if(right <= parseInt(x + '9')){
				if(grid[right].status < 2){
					//console.log("right",right, grid[right]);
					active.push(grid[right].attr);
				}
			}
			if(down <= parseInt('9' + y)){
				if(grid[down].status < 2) {
					//console.log("down",down, grid[down]);
					active.push(grid[down].attr);
				}
			}
			if(left >= parseInt(x + '0')){
				if(grid[left].status < 2){
					//console.log("left",left, grid[left]);
					active.push(grid[left].attr);
				}
			}
			if(top >= parseInt('0' + y)){
				if(grid[top].status < 2){
					//console.log("top",top, grid[top]);
					active.push(grid[top].attr);
				}
			}
		}
		this._view.getCurrentPlayer(state.currentPlayer);
		this._view.showNextPaths(active);
	}
}
