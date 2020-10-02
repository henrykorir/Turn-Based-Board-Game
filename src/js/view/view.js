
export default class View{
	constructor(){
		this.createBoard();
		this.placeObjects = this.placeObjects.bind(this);
		this.movePlayer = this.movePlayer.bind(this);
		this.probableNextMoves = this.probableNextMoves.bind(this);
	}
	
	createBoard(){
		for(let i = 0; i < 10; i++){
			for(let j = 0; j < 10; j++){
				let id = "" + i + j;
				$('#board').append('<div class="tile smoothfade" data-gridpos = "' + id.trim() + '"></div>');
			}
		}
	}
	placeObjects(data){
		console.log(data);
		for(let box of data.barriers){
			$('*[data-gridpos="'+ box.attr.trim() +'"]').css( 'background-color', '#333333');
		}
		for(let player of data.players){
			$('*[data-gridpos="'+ player.box.attr.trim() +'"]')
			.html('<div id=player'+ (player.id + 1) +' class ="player smoothmove"><span class=icon>♖</span></div>');
		}
		for(let weapon of data.weapons){
			if(!weapon.isTaken ){
				$('*[data-gridpos="'+ weapon.box.attr.trim() +'"]')
				.html('<div id=weapon'+ (weapon.id + 1) +' class ="player smoothmove"><span class=icon>&#9986;</span></div>');
			}
		}
		
	}
	
	movePlayer(handler){
		for(let id = 0; id < 100; id++){
			let attr = id < 10 ? ('0' + id ): ("" + id);
			$('*[data-gridpos="'+ attr.trim() +'"]').on("click", () =>{
				if($(event.target).hasClass("flashing")){
					let midY = $(event.target).position().top += ( $(event.target).width() / 2 );
					let midX = $(event.target).position().left += ( $(event.target).width() / 2 );
					let player = $("#player1");	
						
					player.animate(
						{
							"top":midY - (0.5 * player.width()), 
							"left":midX-(0.5*player.width())
						},
						{
							complete: function() {
								$("#board div").removeClass('flashing');
							}
						}
					);
					handler($(event.target).attr("data-gridpos"));
				}
			});
		}
	}
	probableNextMoves(attrs){
		attrs.forEach(attr =>{
			$('*[data-gridpos="'+ attr +'"]').addClass('flashing');
		});
	}
	
} 
