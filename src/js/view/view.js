
export default class View{
	constructor(){
		this.board = $('#board');
	}
	createBoard(grid){
		grid.forEach(square =>{
			this.board.append('<div class="tile smoothfade" data-gridpos = "' + square.attr + '"></div>');
		});
	}
	probableNextMoves(attrs){
		attrs.forEach(attr =>{
			$('*[data-gridpos="'+ attr +'"]').addClass('legal');
		});
	}
} 
