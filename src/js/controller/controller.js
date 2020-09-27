class Controller{
	constructor(model, view){
		this._model = model;
		this._view = view;
	}
	set model(model){
		this._model = model;
	}
	get model(){
		return this._model;
	}
	set view(view){
		this._view = view;
	}
	get view(){
		return this._view;
	}
}