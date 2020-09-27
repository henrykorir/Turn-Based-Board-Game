import Position from './position.js';
import Weapon from './weapon.js';

export default class Player{
	constructor(id, position, points, weapon ){
		this._id = id;
		this._position = position;
		this._points = points;
		this._weapon = weapon;
	}
	set id(id){
		this._id = id;
	}
	get id(){
		return this._id;
	}
	set position(position){
		this._position = position;
	}
	get position(){
		return this._position;
	}
	set points(points){
		this._points = points;
	}
	get weapon(){
		return this._weapon;
	}
	set weapon(weapon){
		this._weapon = weapon;
	}
	get weapon(){
		return this._weapon;
	}
}


