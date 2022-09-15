function CMenu() {
    var _pStartPosAudio;
    var _pStartPosPlay;
    var _pStartPosInfo;
    var _pStartPosFullscreen;

    var _oBg;
    var _oFBg;
    var _oButPlay;
    var _oButShare;
    var _oFade;
    var _oAudioToggle;
    var _oContainerReset;
    var _oContainerStack;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    var _oLogo;
    this._init = function() {
        s_iBestScore = getItem("box_best_score");
        if (s_iBestScore === null) {
            s_iBestScore = 0;
        }

        var iColorPos = Math.floor(Math.random() * COLOR_GRADIENTS_STACKS.length);
        _oBg = new createjs.Shape();
        _oBg.graphics.beginFill(COLOR_GRADIENTS_STACKS[iColorPos]).drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(_oBg);

        _oFBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oFBg);

        _oContainerStack = new createjs.Container();
        s_oStage.addChild(_oContainerStack);
        var iRate = 1.3;
        var aEdge = new Array();
        for (var i = 0; i < NUM_OF_EDGES_FOR_STACK; i++) {
            aEdge.push(new CEdge(START_EDGES_POSITION[i].startX * iRate, START_EDGES_POSITION[i].startY * iRate,
                START_EDGES_POSITION[i].endX * iRate, START_EDGES_POSITION[i].endY * iRate));
        }

        var iBgColorPos = iColorPos + 32;
        if (iBgColorPos >= COLOR_GRADIENTS_STACKS.length) {
            var iDif = iBgColorPos - COLOR_GRADIENTS_STACKS.length;
            iBgColorPos = iDif;
        }

        var oPos = {
            x: CANVAS_WIDTH_HALF - 122,
            y: CANVAS_HEIGHT_HALF + 30
        };

        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        _pStartPosPlay = {
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT - 380
        };
        _oButPlay = new CGfxButton(_pStartPosPlay.x, _pStartPosPlay.y, oSprite, s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);

        _oButPlay.pulseAnimation();
		
		var oSprite = s_oSpriteLibrary.getSprite('but_share');
        var _pStartPosShare = {
            x: _pStartPosPlay.x -100,
            y: _pStartPosPlay.y + 230
        };
		_oButShare = new CGfxButton(_pStartPosShare.x, _pStartPosShare.y, oSprite, s_oStage);
        _oButShare.addEventListener(ON_MOUSE_UP, this._onButShareRelease, this);
		
		
		var oSprite = s_oSpriteLibrary.getSprite('but_leaderboard');
        var _pStartPosleader = {
            x: _pStartPosPlay.x +100,
            y: _pStartPosPlay.y + 230
        };
		_oButLeader = new CGfxButton(_pStartPosleader.x, _pStartPosleader.y, oSprite, s_oStage);
        _oButLeader.addEventListener(ON_MOUSE_UP, this._onButLeaderRelease, this);
		

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {
                x: CANVAS_WIDTH - (oSprite.height / 2) - 15,
                y: (oSprite.height / 2) + 15
            };
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        var oSpriteLogo = s_oSpriteLibrary.getSprite("logo_menu");
        _oLogo = createBitmap(oSpriteLogo);
        _oLogo.x = CANVAS_WIDTH_HALF + 56;
        _oLogo.y = -oSpriteLogo.width * 0.5;
        _oLogo.regX = oSpriteLogo.width * 0.5;
        _oLogo.regY = oSpriteLogo.height * 0.5;
        _oLogo.rotation = -15;

        s_oStage.addChild(_oLogo);


        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if (ENABLE_FULLSCREEN === false) {
            _fRequestFullScreen = false;
        }

        if (_fRequestFullScreen && inIframe() === false) {
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen")
            _pStartPosFullscreen = {
                x: _pStartPosInfo.x + oSprite.width / 2 + 15,
                y: (oSprite.height / 2) + 15
            };
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x, _pStartPosFullscreen.y, oSprite, s_bFullscreen, s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreen, this);
        }



        _oContainerReset = new createjs.Container();
        s_oStage.addChild(_oContainerReset);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oLogo).wait(300).to({
            rotation: 0
        }, 1000, createjs.Ease.cubicOut);
        createjs.Tween.get(_oLogo).wait(300).to({
            y: CANVAS_HEIGHT_HALF - 96
        }, 1000, createjs.Ease.bounceOut);

        createjs.Tween.get(_oFade, {
            override: true
        }).to({
            alpha: 0
        }, 500, createjs.Ease.cubicOut).call(function() {
            _oFade.visible = false;
        });

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.refreshButtonPos = function(iNewX, iNewY) {

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }

        if (_fRequestFullScreen && inIframe() === false) {
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX, _pStartPosFullscreen.y + iNewY);
        }
    };

    this.unload = function() {
        _oButPlay.unload();
        _oButPlay = null;


        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        if (_fRequestFullScreen && inIframe() === false) {
            _oButFullscreen.unload();
        }

        s_oStage.removeAllChildren();

        s_oMenu = null;
    };

    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
		gradle.mute = s_bAudioActive;
        s_bAudioActive = !s_bAudioActive;
    };

    this._onButInfoRelease = function() {
        //on logo click here
        console.log('btn_info');
    };

    this._onButPlayRelease = function() {
		gradle.event('btn_play');
        if (isIOS() && s_oSoundTrack === null) {
            s_oSoundTrack = playSound("soundtrack", 1, true);
        }

        this.fadeAnim();

    };
	
	this._onButShareRelease = function() {
		gradle.event('btn_share');
	};
	
	this._onButLeaderRelease = function() {
		gradle.event('btn_profile');
	};

    this.resetFullscreenBut = function() {
        if (_fRequestFullScreen && inIframe() === false) {
            _oButFullscreen.setActive(s_bFullscreen);
        }
    };

    this._onFullscreen = function() {
        if (s_bFullscreen) {
            _fCancelFullScreen.call(window.document);
        } else {
            _fRequestFullScreen.call(window.document.documentElement);
        }

        sizeHandler();
    };

    this.fadeAnim = function() {
        var oParent = this;
        _oFade.visible = true;
        createjs.Tween.get(_oFade, {
            override: true
        }).to({
            alpha: 1
        }, MS_FADE_ANIM, createjs.Ease.cubicIn).call(function() {
            oParent.unload();
            s_oMain.gotoGame();
        });
    };

    s_oMenu = this;

    this._init();
}

var s_oMenu = null;