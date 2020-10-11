import Position from '../model/position.js';
import Box from '../model/box.js';
import Weapon from '../model/weapon.js';
import Player from '../model/player.js';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}

/**
*
*/
export default class Controller{
	constructor(model, view){
		this._model = model;
		this._view = view;
		
		this.init = this.init.bind(this);
		this._model.bindUserChanged(this.onPlayerChanged);
		this.onPlayerChanged = this.onPlayerChanged.bind(this);
	}
	
	init = () => {
		this.createGrid().createBarriers().createPlayers().createWeapons();
		this._view.renderObjects(this._model.state);
		this._view.setClickListener(this.onPlayerMoved);
	}
	
	createGrid = () => {
		let grid = [];
		let index = 0;
		for ( let i = 0 ; i < 10 ; i++ ) {
			for ( let j = 0; j < 10; j++ ) {
				let attr = " " + i + j;
				grid.push(new Box(index, attr.trim(), 0, new Position(i, j)));
				index++;
			}
		}
		this._model.setGrid( grid );
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
		}
		return this;
	}
	
	createPlayers = () => {
		let index, grid = [...this._model.state.grid];
		for ( let i = 0 ; i < 2 ; i++ ) {
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
		this._model.currentPlayer = this._model.players[0];
		return this;
	}
	
	createWeapons = () => {
		let index, grid = [...this._model.state.grid];
		for ( let i = 2 ; i < 4 ; i++ ) {
		/*1. generate random index*/
		/*2. use the index to retrive a square in the grid*/
		/*3a. if the square is occupied got to 1*/
		/*1,2,3a*/	while(((index = getRandomInt(0,99)) == grid[index].id) && grid[index].status != 0){}; //collision avoidance
		/*3b  otherwise set the box as occupied*/
			this._model.state.grid[index].status = 1;
		/*4 */
			this._model.setWeapon(new Weapon(i, this._model.state.grid[index],((i < 3) ? "bishop" : "queen"),grid[index].position,50 *( i + 1 )));
		}
		return this;
	}
	
	onPlayerMoved = ( player , dest ) =>{
		/*1. move current player and then choose the next player*/
		let index = parseInt(dest);
		this._model.grid[player.box.id].status = 0; //set source  box as empty
		this._model.grid[index].status = 3; //set destination box as occupied
		this._model.players[player.id].box = this._model.grid[index];
		//Below is the turn taking point which causes the onPlayerChanged() callback to be fired
		this._model.currentPlayer = this._model.players[player.id == 0 ? 1 : 0]; 
	}
	
	onPlayerChanged = ( player ) => {
		let attr = player.box.attr;
		let pos =  parseInt(attr);
		let x = attr.charAt(0);
		let y = attr.charAt(1);
		let grid = [...this._model.state.grid];
		let active = [
			...this.rightOpenPositions(grid, pos, x),
			...this.leftOpenPositions(grid, pos, x),
			...this.downOpenPositions(grid, pos, y),
			...this.topOpenPositions(grid, pos, y)
		]; //open boxes for player to move to
		this._view.getCurrentPlayer( player );
		this._view.renderNextPossiblePositions( active );
	}
	
/****************************************************************************
* The functions below determines the next posible positions to move 		*
* the current player														*
*****************************************************************************/	
	rightOpenPositions = ( grid, attr, x ) => {
		let positions = [];
		for( let i = 1; i < 4; i++ ) {
			let right = attr + i;
			if(right <= parseInt(x + '9')){
				if(grid[right].status > 1) break;
				positions.push(grid[right].attr);
			}
		}
		return positions;
	}
	leftOpenPositions = (grid, attr, x) => {
		let positions = [];
		for( let i = 1; i < 4; i++ ){
			let left = attr - i;
			if(left >= parseInt(x + '0')){
				if(grid[left].status > 1) break;
				positions.push(grid[left].attr);
			}
		}
		return positions;
	}
	downOpenPositions = (grid, attr, y) => {
		let positions = [];
		for(let i = 1; i < 4; i++){
			let down = attr + (10 * i);
			if(down <= parseInt('9' + y)){
				if(grid[down].status > 1) break;
				positions.push(grid[down].attr);
			}
		}
		return positions;
	}
	topOpenPositions = (grid, attr, y) => {
		let positions = [];
		for ( let i = 1; i < 4; i++ ) {
			let top = attr - (10 * i);
			if(top >= parseInt('0' + y)){
				if(grid[parseInt(top)].status > 1) break;
				positions.push(grid[top].attr);
			}
		}
		return positions;
	}
}
