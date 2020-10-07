/**
*
*/
export default class View{
	constructor(){
		this.createBoard();
		this.renderNextPossiblePositions = this.renderNextPossiblePositions.bind(this);
	}
	
	createBoard = () => {
		for(let i = 0; i < 10; i++){
			for(let j = 0; j < 10; j++){
				let id = "" + i + j;
				$('#board').append('<div class="tile smoothfade" data-gridpos = "' + id.trim() + '"></div>');
			}
		}
	}
	
	renderObjects = ( data ) =>{
		for(let box of data.barriers){
			$('*[data-gridpos="'+ box.attr.trim() +'"]').addClass('barrier');
		}
		
		for(let player of data.players){
			$('*[data-gridpos="'+ player.box.attr.trim() +'"]').addClass('player' + (player.id + 1));
		}
		for(let weapon of data.weapons){
			if( !weapon.isTaken ){
				$('*[data-gridpos="'+ weapon.box.attr.trim() +'"]').addClass('weapon' +(weapon.id == 2  ? 1 : 2));
			}
		}
		this.currentPlayer = data.currentPlayer;
	}
	
	getCurrentPlayer = ( player ) => {
		this.currentPlayer =  player;
	}
	
	movePlayer = ( handler ) =>{
		for( let id = 0; id < 100; id++ ){
			let attr = id < 10 ? ('0' + id ): ("" + id);
			$(`*[data-gridpos=${ attr.trim() }]`).on("click", () =>{
				console.log($(`*[data-gridpos=${ attr.trim() }]`).hasClass("weapon1"))
				if($(event.target).hasClass("flashing")){
					event.stopPropagation();
					$('*[data-gridpos=' + (this.currentPlayer.box.attr) + ']').removeClass('player' + (this.currentPlayer.id + 1));
					$(event.target).addClass('player' + (this.currentPlayer.id + 1));
					event.preventDefault();
					handler(this.currentPlayer, $(event.target).attr("data-gridpos"));
				}
			});
		}
	}
	
	renderNextPossiblePositions = ( paths ) => {
		$("#board div").removeClass('flashing');
		paths.forEach(path =>{
			$(`div[data-gridpos=${ path }]`).toggleClass('flashing');
		});
	}
} 
