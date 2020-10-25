import Position from './position.js';
import Box from './box.js';
export default class Weapon{
	constructor(id, box, name , damage){
		this._id = id;
		this._box = box;
		this._name = name;
		this._damage = damage;
		this._taken = false;
	}
	set id(id){
		this._id = id;
	}
	
	get id(){
		return this._id;
	}
	set box(box){
		this._box = box;
	}
	get box(){
		return this._box;
	}
	set name(name){
		this._name = name;
	}
	get name(){
		return this._name;
	}
	set damage(damage){
		this._damage = damage;
	}
	get damage(){
		return this._damage;
	}
	set isTaken(isTaken){
		this._taken = isTaken;
	}
	get isTaken(){
		return this._taken;
	}
}