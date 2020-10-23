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
			if(box.status == 2) $('div[data-gridpos="'+ box.attr.trim() +'"]').addClass('barrier');
		}
		
		for(let player of data.players){
			$('div[data-gridpos="'+ player.box.attr.trim() +'"]').addClass('player' + (player.id + 1));
		}
		for(let weapon of data.weapons){
			if( !weapon.isTaken ){
				$('div[data-gridpos="'+ weapon.box.attr.trim() +'"]')
				.addClass('weapon' +(weapon.id + 1));
			}
		}
		this.currentPlayer = data.currentPlayer;
	}
	
	getCurrentPlayer = ( player ) => {
		this.currentPlayer =  player;
	}
	
	rerenderWeaponAfterSwap = (currentWeapon, weaponToTake) => {
		let previousWeapon 	= 'weapon' + (currentWeapon.id + 1) ; 
		let newWeapon 		= 'weapon' + (weaponToTake.id + 1); 
		console.log($(`div[data-gridpos=${ weaponToTake.box.attr.trim() }]`).attr('class'));
		if(($(`div[data-gridpos=${ weaponToTake.box.attr.trim() }]`).hasClass("player1") == false) || ($(`div[data-gridpos=${ weaponToTake.box.attr.trim() }]`).hasClass("player2") == false)){
			$(`div[data-gridpos=${ weaponToTake.box.attr.trim() }]`)
			.removeClass(newWeapon)
			.toggleClass(previousWeapon);
		}
	}
	
	setBoxClickListener = ( handler ) => {
		for( let id = 0; id < 100; id++ ){
			let attr = ( id < 10 ) ? ('0' + id ): ("" + id);
			$(`div[data-gridpos=${ attr.trim() }]`).on("click", () =>{
				if($(event.target).hasClass("flashing")){
					let playerClass = 'player' + (this.currentPlayer.id + 1)//get player css class
					$('div[data-gridpos=' + (this.currentPlayer.box.attr) + ']').toggleClass(playerClass); //remove player from source box
					$(event.target).toggleClass(playerClass);// place player on to destination box
					$("#board div").removeClass('flashing');
					setTimeout(handler, 200, this.currentPlayer, $(event.target).attr("data-gridpos"));
				}
			});
		}
	}
	
	renderNextPossiblePositions = ( paths ) => {
		paths.forEach( path => {
			$(`div[data-gridpos=${ path }]`).toggleClass('flashing');
		});
	}
	
	launchFightStage = () => {
		let w = 100, w1 = 100;
		$("#dashboard").css({'visibility':'visible'});
		$("#player1Attack").on('click', function(){
			w -= 1;
			let width = w + '%';
			if(w >= 1)$("#progress-bar2").css({'width': width}).text(width);
			else $("#progress-bar2").css({'width': 100 + "%", "background" : "#ddd"}).text("0%");
			
		});
		$("#player2Attack").on('click', function(){
			w1 -= 1;
			let width = w1 + '%';
			if(w1 >= 1)$("#progress-bar1").css({'width': width}).html(width);
			else $("#progress-bar1").css({'width': 100 + "%", "background" : "#ddd"}).html("0%");
		});
	}
} 
