import Position from './position.js';
import Weapon from './weapon.js';

export default class Player{
	constructor(id, box, points, weapon ){
		this._id = id;
		this._box = box;
		this._points = points;
		this._weapon = weapon;
		this._defend = false;
	}
	set id(id){
		this._id = id;
	}
	get id(){
		return this._id;
	}
	set box(attr){
		this._box = attr;
	}
	get box(){
		return this._box;
	}
	set points(points){
		this._points = points;
	}
	get points(){
		return this._points;
	}
	get weapon(){
		return this._weapon;
	}
	set weapon(weapon){
		this._weapon = weapon;
	}
	set defend(defend){
		this._defend = defend;
	}
	get defend(){
		return this._defend;
	}
}


