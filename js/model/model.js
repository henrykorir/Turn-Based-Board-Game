class Model{
	constructor(){
		this._state = {}
	}
	set players(players){
		this._state.players = players.slice() || [];
	}
	get players(){
		return this._state.players;
	}
	set currentPlayer(player){
		this._state.currentPlayer = player;
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
	set currentWeapon(weapon){
		this._state.currentWeapon = weapon;
	}
	get currentWeapon(){
		return this._state.currentWeapon;
	}
	set weapons(weapons){
		this._state.weapons = weapons.slice() || [];
	}
	get weapons(){
		return this._state.weapons;
	}
	set propableNextMoves(slots){
		this._state.slots = slots.slice() || [];
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
} 
