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
	
	rerenderWeaponAfterSwap = ( state ) => {
		$('#board div').removeClass(['weapon1', 'weapon2', 'weapon3', 'weapon4', 'player1', 'player2']);
		for(let player of state.players){
			$('div[data-gridpos="'+ player.box.attr.trim() +'"]').addClass('player' + (player.id + 1));
		}
		for(let weapon of state.weapons){
			if( weapon.isTaken == false  ){
				if((weapon.box.id != state.players[0].box.id) && (weapon.box.id != state.players[1].box.id)){
					$('div[data-gridpos="'+ weapon.box.attr.trim() +'"]')
					.addClass('weapon' +(weapon.id + 1));
				}
			}
		}
		let src = './assets/weapon' + (this.currentPlayer.weapon.id + 1) + '.png';
		let alt = this.currentPlayer.weapon.name;
		let image_id = '#img-' + (this.currentPlayer.id + 1);
		$(image_id).attr('src',src).attr('alt',alt);
	}
	
	setBoxClickListener = ( handler ) => {
		for( let id = 0; id < 100; id++ ){
			let attr = ( id < 10 ) ? ('0' + id ): ("" + id);
			let player = this.currentPlayer;
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
			let currentPlayer = (action == 1 || action == 3) ? '#player1' : '#player2';
			let otherPlayer   = (currentPlayer == '#player1') ? '#player2' : '#player1';
			$(otherPlayer).find('.btn').removeClass('disabled');
			$(currentPlayer).find('.btn').addClass('disabled');
			handler( action );
		});
	}
	launchFightStage = (state) => {
		for(let player of state.players){
			let panel = '#player' + (player.id + 1);
			let weapon = '<div><p style=" padding-top: 2px; padding-bottom: 2px">' + player.weapon.name + ' : ' + player.weapon.damage + '</p></div>';
			$(panel).find('.btn').prepend(weapon);
			console.log(player);
		}
		$("#dashboard").css({'visibility':'visible'});
	}
	renderPointsLevel = ( id, level, defense ) => {
		let width = level + "%";
		let player = "#" + (id == 1 ? "player1" : "player2");
		let other  =  ((player == "#player1") ? "#player2" : "#player1");
		let progressbar = (id == 1) ? $('#progress-bar1') : $('#progress-bar2');
		let defended = '#player' + id + 'Defend';
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
