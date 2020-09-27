import Position from './position.js';
export default class Box{
	constructor(id, status, position){
		this._id = id;
		this._status = status;
		this._position = position;
	}
	set id(id){
		this._id = id;
	}
	get id(){
		return this._id;
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