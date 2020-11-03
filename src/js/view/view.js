/**
*
*/
export default class View{
	constructor(){
		this.renderBoard();
		this.renderNextPossiblePositions = this.renderNextPossiblePositions.bind(this);
	}
	
	renderBoard = () => {
		for(let i = 0; i < 10; i++){
			for(let j = 0; j < 10; j++){
				let id = "" + i + j;
				$('#board').append('<div class="box smoothfade" data-gridpos = "' + id.trim() + '"></div>');
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
		let src = './assets/weapon' + (weaponToTake.id + 1) + '.png';
		let alt = weaponToTake.name;
		let image_id = '#img-' + (this.currentPlayer.id + 1);
		$(image_id).attr('src',src).attr('alt',alt);
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
	
	setFightingClickHandler = ( handler ) => {
		$("#player1Attack, #player2Attack, #player1Defend, #player2Defend")
		.on('click', ( event ) => {
			let action; 
			switch( event.target.id ){
				case 'player1Attack':
					action = 1;
					break;
				case 'player2Attack':
					action = 2;
					break;
				case 'player1Defend':
					action = 3;
					break;
				case 'player2Defend':
					action = 4;
					break;
			}
			handler( action );
		});
	}
	launchFightStage = () => {
		$("#dashboard").css({'visibility':'visible'});
	}
	renderPointsLevel = ( id, level ) => {
		let width = level + "%";
		let player = "#" + (id == 1 ? "player1" : "player2");
		let other  =  ((player == "#player1") ? "#player2" : "#player1");
		let progressbar = (id == 1) ? $('#progress-bar1') : $('#progress-bar2');
		if(level >= 1){
			progressbar.css({'width' : width}).text(width);
		}
		else{
			progressbar.css({'width': 100 + "%", "background" : "#ddd"}).html("0%");
			$(player).remove();
			$(other).children('.btn').children().remove();
			$("div[class=modal-dialog]").css("width","25%");
			$("div[class=modal-title]").text("WINNER");
		}
	}
} 
