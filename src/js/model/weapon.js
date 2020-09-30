import Position from './Position.js';
export default class Weapon{
	constructor(id, name, position, damage){
		this._id = id;
		this._position = position;
		this._damage = damage;
	}
	set id(id){
		this._id = id;
	}
	get id(){
		return this._id;
	}
	set name(name){
		this._name = name;
	}
	get name(){
		return this._name;
	}
	set position(position){
		this._position = position;
	}
	get position(){
		return this._position;
	}
	set damage(damage){
		this._damage = damage;
	}
	get damage(){
		return this._damage;
	}
}