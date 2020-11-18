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
* the game brain
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
		this._view.setBoxClickListener(this.onPlayerMoved);
		this._view.setFightingClickHandler(this.onFighting);
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
			while(
					((index = getRandomInt(0,99)) == grid[index].id) && 
					(grid[index].status  > 0) && 
					(this.isOtherPlayerAdjacent(grid, grid[index]) == true)
			){};
		/*3b. otherwise set the box as occupied*/
			this._model.state.grid[index].status = 3;
		/*3c. create the item*/
			let damage = 10;
			let weapon = new Weapon(i, this._model.state.grid[index] ,((i < 1) ? "knife" : "scissor"), damage );
			weapon.isTaken = true;
			this._model.setWeapon(weapon);
			this._model.setPlayer(new Player(i,grid[index],100, weapon));
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
			let damage = 10 * i ;
			this._model.setWeapon(new Weapon(i, this._model.state.grid[index],((i < 3) ? "handle" : "scimitar"),damage));
		}
		return this;
	}
	
	onPlayerMoved = ( currentPlayer , dest ) => {
		let player = currentPlayer;
		let srcPosition = player.box.position;
		let srcSquare = this._model.grid.find(square => square.attr == player.box.attr);
		/*A) if landing on a destination*/
			let destSquare = this._model.grid.find(square => square.attr == dest);
			//1. if destination has a weapon
			if(destSquare.status == 1){
				//1a. drop the current weapon at hand somewhere
				this._model.weapons[player.weapon.id].isTaken = false;
				//1b. take the weapon on the destination
				let destWeapon = this._model.weapons.find(weapon => weapon.box.attr == dest);
				this._model.weapons[player.weapon.id].box = destWeapon.box;
				this._model.players[player.id].weapon = destWeapon;
				this._model.players[player.id].box = destWeapon.box;
				this._model.weapons[destWeapon.id].isTaken = true;
				//1c. place the player on the destination box[1 - 3]
				this._model.grid[destSquare.id].status = 3;
				//render UI
				this._view.rerenderWeaponAfterSwap( this._model.state/*weaponToDrop, weaponToTake*/);
			}
			//2. else if destination is empty
			else{
				//2a. place the player on the destination
				this._model.players[player.id].box = destSquare;
				this._model.players[player.id].weapon.box = destSquare;
				this._model.weapons[player.weapon.id].box = destSquare;
				this._model.grid[destSquare.id].status = 3;
			}
		
		/*B) if leaving a square */
			let weapon = this._model.weapons.find(weapon => weapon.box.id == srcSquare.id);
			//1. if there is a weapon meant for the square
			if(weapon !== undefined){
				//1a. place the weapon on the square
				this._model.grid[srcSquare.id].status = 1;
				//render UI
				this._view.rerenderWeaponAfterSwap( this._model.state/*weaponToDrop, weaponToTake*/);
			}
			//2. otherwise 
			else{
				//2a. set the square as unoccupied
				this._model.grid[srcSquare.id].status = 0;
			}
		/*C) if passing over squares */
			//1. look for square with a weapon
			let grid = [...this._model.grid];
			let square = this.lookForWeapon(grid, srcPosition, destSquare.position);
			//2. if square has a weapon
			if(square != null){
				if(square.id != srcSquare.id && square.id != destSquare.id){
					//2a. enumerate all weapons
					let weaponToTake = this._model.weapons.find(weapon => weapon.box != null && weapon.box.id == square.id && weapon.isTaken == false);
					let weaponToDrop = this._model.players[player.id].weapon;
					//2b. drop the current weapon at hand
					this._model.weapons[weaponToDrop.id].isTaken = false;
					this._model.weapons[weaponToDrop.id].box = square;
					//2c. pick the weapon on the box
					this._model.weapons[weaponToTake.id].box = this._model.players[player.id].box;
					this._model.weapons[weaponToTake.id].isTaken = true;
					this._model.players[player.id].weapon = this._model.weapons[weaponToTake.id];
					//render UI
					this._view.rerenderWeaponAfterSwap( this._model.state/*weaponToDrop, weaponToTake*/);
				}
			}
		if(this.isOtherPlayerAdjacent(grid, player.box.position)){
			this._model.fighting = true;
			this._view.launchFightStage(this._model.state);
		}
		//switch player
		this._model.currentPlayer = this._model.players[currentPlayer.id == 0 ? 1 : 0]; 
	}
	
	onPlayerChanged = ( state ) => {
		let attr = state.currentPlayer.box.attr;
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
		this._view.getCurrentPlayer( state.currentPlayer );
		this._view.renderNextPossiblePositions( active );
			
	}
	
	onFighting = ( action ) => {
		let p1, p2, damage, points, id;
		let attack = false;
		p1 = (action == 1 || action == 3) ? 0 : 1; //index of active player
		p2 = ( p1 == 0 ) ? 1 : 0; //index of player to be fought
		switch( action ){
			case 1:
			case 2:
				this._model.players[p1].defend = false;
				damage = this._model.players[p1].weapon.damage;
				points = this._model.players[p2].points;
				if( this._model.players[p2].defend == true )
					points -= (0.5 * damage);
				else 
					points -= damage;
				this._model.players[p2].points = points;
				attack = true;
				break;
				
			case 3:
			case 4:
				this._model.players[p1].defend = true;
				attack = false;
				break;
		}
		if( attack == true ){
			id =  p2 + 1; 
			this._view.renderPointsLevel( id , points, this._model.players[p2].defend );
		}
	}
	
	lookForWeapon = (grid, positionA, positionB) => {
		let box = null, start, end, x, y;
		if((positionA.x === positionB.x)){ //x-axis
			let start = (positionA.y > positionB.y) ? positionB.y : positionA.y;
			let end = Math.abs(positionA.y - positionB.y);
			for(let i = start; i <= ( start + end ); i++){
				let index = parseInt("" + positionA.x + i );
				if(grid[index].status == 1){
					box = grid[index];
					break;
				}
			}
		}
		else if(positionA.y === positionB.y){ // y-axis
			let start = (positionA.x > positionB.x) ? positionB.x : positionA.x;
			let end = Math.abs(positionA.x - positionB.x);
			for(let i = start ; i <= ( start + end ); i++){
				let index = parseInt("" + i + positionA.y );
				if(grid[index].status == 1){
					box = grid[index];
					break;
				}
			}
		}
		return box;
	}
	
	isOtherPlayerAdjacent = (grid, position) => {
		let x = position.x;
		let y = position.y;
		if(
			((x + 1) <= 9 && grid[parseInt(`${x + 1}${y}`)].status == 3) || 
			((x - 1) >= 0 && grid[parseInt(`${x - 1}${y}`)].status == 3) || 
			((y + 1) <= 9 && grid[parseInt(`${x}${y + 1}`)].status == 3) || 
			((y - 1) >= 0 && grid[parseInt(`${x}${y - 1}`)].status == 3)
		)
		return true;
		return false;
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
