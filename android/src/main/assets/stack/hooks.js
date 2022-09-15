var gradle = { log: function(val){val && console.log( gradle.isMobile && (typeof val === 'object') ? JSON.stringify(val) : val );},
/**
	GRADLE - KNOWLEDGE IS POWER
	***** JACOB SERVICES LLC ***
    ***** PROPRIETARY CODE *****
    @author : gradle (jacob.services@outlook.com)
	@date: 01/26/2021 14:43:00
	@version: 7.0.0
	copyright @2021
*/
	isTesting: true,

	intervalAds    : 3,     //Ads each interval for example each 3 times
    
	enableLeaderboard  : false,
	
	//Game settings :
	//===============
		stack_velocity : 15, //SUBTRACT THIS SCORE EVERY FAILED LAUNCH
	
	
	
	//Events manager :
	//================
    event: function(ev, msg){
		if(gradle.process(ev,msg))
        switch(ev){

		case 'first_start':   //First start
			//gradle.showInter();
			break;

		case 'btn_play':   //Button Play
            gradle.showInter();
			break;
			
		case 'btn_retry':  //button Retry
			gradle.checkInterval() && gradle.showInter();
			break;
		
		case 'grame_over': //btn home on the dialog game over
			//gradle.showInter();
			break;
			
		case 'test':
			//gradle.checkInterval() && gradle.showInter();
			break;
		
        }
    },





    //Ready : /!\ DO NOT CHANGE, ONLY IF YOU ARE AN EXPERT.
    //=========================
	start: function(){
		function onTouchPreventDefault(event) {
			//event.preventDefault();
		}
		document.addEventListener("touchmove", onTouchPreventDefault, false);
		document.addEventListener("touchstart", onTouchPreventDefault, false);
	
		
		//gradle.hideSplash();
		
		function handleVisibilityChange() {
			window.gradle_ad || (document[hidden] ? (isPageVisible = !1, gradle.pause()) : (isPageVisible = !0))
		}


		void 0 !== document.hidden ? (hidden = "hidden", visibilityChange = "visibilitychange") : void 0 !== document.msHidden ? (hidden = "msHidden", visibilityChange = "msvisibilitychange") : void 0 !== document.webkitHidden && (hidden = "webkitHidden", visibilityChange = "webkitvisibilitychange"), void 0 === document.addEventListener || void 0 === document[hidden] ? gradle.event("Browser doesn't support the Page Visibility API.") : document.addEventListener(visibilityChange, handleVisibilityChange, !1);

		$(document).ready(function() {
            oMain = new CMain({
                stack_velocity: gradle.stack_velocity, //SUBTRACT THIS SCORE EVERY FAILED LAUNCH
                fullscreen: false, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
                check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
                num_levels_for_ads: gradle.intervalAds //NUMBER OF TURNS PLAYED BEFORE AD SHOWING //
            });
            
			setTimeout(function() {
				sizeHandler();
			}, 500);
            setTimeout(function(){sizeHandler();}, 600);
        });
        //setTimeout(function(){sizeHandler();gradle.event_ext('hide_splash');}, 600);
    },
	pause: function(){
		console.log('gradle pause ...');
		Howler.mute(true);
    },
	resume: function(){
		console.log('gradle resume ...');
		!gradle.mute && Howler.mute(false);
    },

    run: function() {
        gradle.event('first_start');
		gradle.isMobile = ( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) );
        document.addEventListener("visibilitychange", gradle.onVisibilityChanged, false);
		gradle.start();
    },

	mute: false,
    event_ext: function(val){
		if(this.isMobile && typeof jacob!='undefined'){
			jacob.do_event(val);
		}
	},

	old_ev: null,
    process: function(ev, msg){
		if(gradle.old_ev ==ev){
			if(ev=='button_share' || ev=='button_play'){
				console.log('repeat');
				//return false;
			}
		}
        if(ev=='state_game_create'){
			null != game && (game.sound.mute = !1, game.paused = !1);
			//this.triggerEvent(document.getElementById('game'), 'click');
		}
		switch(ev){
            case 'btn_more':
                gradle.event_ext('show_more');
                break;
            case 'btn_privacy':
                gradle.event_ext('show_privacy');
                break;
            case 'btn_share':
                gradle.event_ext('show_share');
                break;
            case 'btn_profile':
                gradle.event_ext('show_profile');
                break;
            case 'btn_exit_game':
                gradle.event_ext('exit_game');
                break;
        }
		gradle.old_ev = ev;
		gradle.log(ev,msg);
		return true;
    },

    showInter: function(){
        if(!gradle.isMobile) return;
        gradle.log('jacob|show_inter');
    },
	
	score : 0,
    save_score(score, level){
        gradle.event_ext('save_score|'+score+'|'+level);
    },

	onVisibilityChanged : function(){
	    if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden){
			gradle.pause();
		}else{
			gradle.resume();
		}
	},

	currentInterval : 0,
	checkInterval: function(){
		return (++gradle.currentInterval==gradle.intervalAds) ? !(gradle.currentInterval=0) : !1;
	}
};
var oMain;
gradle.run();
