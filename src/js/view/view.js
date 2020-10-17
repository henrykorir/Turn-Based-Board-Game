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
				$('*[data-gridpos="'+ weapon.box.attr.trim() +'"]')
				.addClass('weapon' +(weapon.id + 1));
			}
		}
		this.currentPlayer = data.currentPlayer;
	}
	
	getCurrentPlayer = ( player ) => {
		this.currentPlayer =  player;
	}
	
	rerenderWeaponAfterSwap = (currentWeapon, weaponToTake) => {
		let previousWeapon 	= currentWeapon.id + 1 ; 
		let newWeapon 		= weaponToTake.id + 1; 
		$(`*[data-gridpos=${ weaponToTake.box.attr.trim() }]`)
		.removeClass( 'weapon' + newWeapon)
		.toggleClass('weapon' + previousWeapon);
	}
	
	setBoxClickListener = ( handler ) => {
		for( let id = 0; id < 100; id++ ){
			let attr = ( id < 10 ) ? ('0' + id ): ("" + id);
			$(`*[data-gridpos=${ attr.trim() }]`).on("click", () =>{
				$(`*[data-gridpos=${ attr.trim() }]`).removeClass("weapon1 weapon2 weapon3 weapon4");
				if($(event.target).hasClass("flashing")){
					let playerClass = 'player' + (this.currentPlayer.id + 1)//get player css class
					$('*[data-gridpos=' + (this.currentPlayer.box.attr) + ']').toggleClass(playerClass); //remove player from source box
					$(event.target).removeClass(["weapon1", "weapon2", "weapon3", "weapon4"]);
					$(event.target).toggleClass(playerClass);// place player on to destination box
					handler(this.currentPlayer, $(event.target).attr("data-gridpos"));
				}
			});
		}
	}
	
	renderNextPossiblePositions = ( paths ) => {
		$("#board div").removeClass('flashing');
		paths.forEach( path => {
			$(`div[data-gridpos=${ path }]`).toggleClass('flashing');
		});
	}
} 
