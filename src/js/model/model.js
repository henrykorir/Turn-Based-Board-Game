import Position from './position.js';
import Player from './player.js';
import Weapon from './weapon.js';

export default class Model{
	constructor(){
		this._state = {
			currentPlayer: {},
			players: [],
			weapons: [],
			barriers: [],
		};
		this.bindUserChanged = this.bindUserChanged.bind(this);
	}
	bindUserChanged = ( callback ) => {
		this.onPlayerChanged = callback;
	}
	set grid(grid){
	}
	get grid(){
		return this._state.grid;
	}
	getGrid(){
		return this._state.grid;
	}
	
	get barriers(){
		return this._state.barriers;
	}
	setPlayer(player){
		this._state.players.push(player);
	}
	getPlayer(id){
		return this._state.players[id];
	}
	set players(players){
		this._state.players = players.slice();
	}
	get players(){
		return this._state.players;
	}
	set currentPlayer(player){
		this._state.currentPlayer = player;
		this.onPlayerChanged(player);
	}
	get currentPlayer(){
		return this._state.currentPlayer;
	}
	set currentBox(box){
		this._state.currentBox = box;
	}
	get currentBox(){
		return this._state.currentBox;
	}
	setWeapon(weapon){
		this._state.weapons.push(weapon);
	}
	getWeapon(id){
		return this._state.weapons[id];
	}
	set currentWeapon(weapon){
		this._state.currentWeapon = weapon;
	}
	get currentWeapon(){
		return this._state.currentWeapon;
	}
	set setWeapons(weapon){
		this._state.weapons.push(weapon);
	}
	set weapons(weapons){
		this._state.weapons = weapons.slice();
	}
	get weapons(){
		return this._state.weapons;
	}
	set propableNextMoves(slots){
		this._state.slots = slots.slice();
	}
	get propableNextMoves(){
		return this._state.slots;
	}
	set state(state){
		this._state = state;
	}
	get state(){
		return this._state;
	}
	setGrid(grid){
		this._state.grid = [...grid];
	}
	setBarrier(barrier){
		this._state.barriers.push(barrier);
	}
} 
