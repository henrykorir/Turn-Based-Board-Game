
export default class View{
	constructor(){
		this.createBoard();
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
	
	movePlayer(handler){
		//console.log($("#board").children());
		for(let id = 0; id < 100; id++){
			let attr = id < 10 ? ('0' + id ): ("" + id);
			$('*[data-gridpos="'+ attr.trim() +'"]').on("click", () =>{
				if($(event.target).hasClass("legal")){
					let midY = $(event.target).position().top += ( $(event.target).width() / 2 );
					let midX = $(event.target).position().left += ( $(event.target).width() / 2 );
					let player = $("#player");		
					player.css({"top":midY - (0.5 * player.width()), "left":midX-(0.5*player.width())});
					$("#board div").removeClass('legal');
					handler($(event.target).attr("data-gridpos"));
				}
			});
		}
	}
	probableNextMoves(attrs){
		attrs.forEach(attr =>{
			$('*[data-gridpos="'+ attr +'"]').addClass('legal');
		});
	}
	
} 
