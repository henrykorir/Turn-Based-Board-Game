
export default class View{
	constructor(){
		this.createBoard();
	}
	
	createBoard = () => {
		for(let i = 0; i < 10; i++){
			for(let j = 0; j < 10; j++){
				let id = "" + i + j;
				$('#board').append('<div class="tile smoothfade" data-gridpos = "' + id.trim() + '"></div>');
			}
		}
	}
	
	placeObjects = ( data ) =>{
		for(let box of data.barriers){
			//$('*[data-gridpos="'+ box.attr.trim() +'"]').css( 'background-color', '#333333');
			$('*[data-gridpos="'+ box.attr.trim() +'"]').addClass('barrier');
		}
		
		for(let player of data.players){
			$('*[data-gridpos="'+ player.box.attr.trim() +'"]')
			.html('<div id=player' + (player.id + 1) + ' class ="player smoothmove"><img src = ' + ( player.id == 0 ? "../../assets/player1.png width = 32 height = 32 /> " : "../../assets/player2.png width = 34 height = 34 />" )+'</div>');
		}
		for(let weapon of data.weapons){
			if( !weapon.isTaken ){
				$('*[data-gridpos="'+ weapon.box.attr.trim() +'"]')
				.html('<div id=weapon'+ (weapon.id + 1) + ' class ="player smoothmove"><img src = ' + ( weapon.id == 0 ? "../../assets/weapon1.png width = 32 height = 32 /> " : "../../assets/weapon2.png width = 34 height = 34 />" )+'</div>');
			}
		}
	}
	
	getCurrentPlayer = ( player ) => {
		this.currentPlayer =  player;
	}
	
	movePlayer = ( handler ) =>{
		for( let id = 0; id < 100; id++ ){
			let attr = id < 10 ? ('0' + id ): ("" + id);
			$('*[data-gridpos="'+ attr.trim() +'"]').on("click", () =>{
				//console.log("src = ", this.currentPlayer.box.attr, "dest = ", $(event.target).attr("data-gridpos"));
				if($(event.target).hasClass("flashing")){
					let midY = $(event.target).position().top += ( $(event.target).width() / 2 );
					let midX = $(event.target).position().left += ( $(event.target).width() / 2 );
					let player = $("#player" + (this.currentPlayer.id + 1));
					player.css(
						{
							"top":midY - ( 0.5 * player.width() ), 
							"left":midX -( 0.5 * player.width() )
						}
					);
					$("#board div").removeClass('flashing');
					handler(this.currentPlayer, $(event.target).attr("data-gridpos"));
				}
			});
		}
	}
	
	showNextPaths = ( paths ) =>{
		paths.forEach(path =>{
			$('*[data-gridpos="'+ path +'"]').addClass('flashing');
		});
	}
} 
