import Position from './position.js';
export default class Box {
	constructor(id, attr, status, position){
		this._id = id;
		this._attr = attr;
		this._status = status;
		this._position = position;
	}
	set id(id){
		this._id = id;
	}
	get id(){
		return this._id;
	}
	set attr(attr){
		this._attr = attr;
	}
	get attr(){
		return this._attr;
	}
	set status(status){
		this._status = status;
	}
	get status(){
		return this._status;
	}
	set position(position){
		this._position = position;
	}
	get position(){
		return this._position;
	}
}