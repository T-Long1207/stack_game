//Gradle Code
//gradlecode@outlook.com

function CMain(_0x3beb5e) {
    var is_update;
    var index_progress = 0x0;
    var total_progress = 0x0;
    var state = STATE_LOADING;
    var _0x51c1f7;
    var preloader;
    var menu;
    var help;
    var game;
    var congratulations;
    this.initContainer = function() {
        
        var canvas = document.getElementById('canvas');
        s_oStage = new createjs[('Stage')](canvas);
        createjs.Touch.enable(s_oStage);
        s_oStage.preventSelection = ![];
        s_bMobile = jQuery.browser.mobile;
        if (s_bMobile === ![]) {
            s_oStage.enableMouseOver(0x14);
            $('body').on('contextmenu', '#canvas', function(ev) {
                return ![];
            });
        }
        s_iPrevTime = new Date().getTime();
        createjs.Ticker.addEventListener('tick', this._update);
        createjs.Ticker.setFPS(30);
        if (navigator.userAgent.match(/Windows Phone/i)) {
            DISABLE_SOUND_MOBILE = !![];
        }
        s_oSpriteLibrary = new CSpriteLibrary();
        preloader = new CPreloader();
        is_update = !![];
    };
    this.soundLoaded = function() {
        index_progress++;
        var current_progress = Math.floor(index_progress / total_progress * 0x64);
        preloader.refreshLoader(current_progress);
        if (index_progress === total_progress) {
            this._onRemovePreloader();
        }
    };
    this._initSounds = function() {
        var sound_list = new Array();
        sound_list.push({
            'path': './sounds/',
            'filename': 'cut',
            'loop': ![],
            'volume': 0x1,
            'ingamename': 'cut'
        });
        sound_list.push({
            'path': './sounds/',
            'filename': 'click',
            'loop': ![],
            'volume': 0x1,
            'ingamename': 'click'
        });
        sound_list.push({
            'path': './sounds/',
            'filename': 'game_over',
            'loop': ![],
            'volume': 0x1,
            'ingamename': 'game_over'
        });
        sound_list.push({
            'path': './sounds/',
            'filename': 'perfect',
            'loop': ![],
            'volume': 0x1,
            'ingamename': 'perfect'
        });
        sound_list['push']({
            'path': './sounds/',
            'filename': 'soundtrack',
            'loop': !![],
            'volume': 0x1,
            'ingamename': 'soundtrack'
        });
        total_progress += sound_list.length;
        s_aSounds = new Array();
        for (var _0x15ca9b = 0x0; _0x15ca9b < sound_list.length; _0x15ca9b++) {
            s_aSounds[sound_list[_0x15ca9b].ingamename] = new Howl({
                'src': [sound_list[_0x15ca9b].path + sound_list[_0x15ca9b].filename + '.mp3', sound_list[_0x15ca9b].path + sound_list[_0x15ca9b].filename + '.ogg'],
                'autoplay': ![],
                'preload': !![],
                'loop': sound_list[_0x15ca9b].loop,
                'volume': sound_list[_0x15ca9b].volume,
                'onload': s_oMain.soundLoaded()
            });
        }
    };
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite('but_play', './images/but_play.png');
        s_oSpriteLibrary.addSprite('but_share', './images/but_share.png');
        s_oSpriteLibrary.addSprite('but_leaderboard', './images/but_leaderboard.png');
        s_oSpriteLibrary.addSprite('but_exit', './images/but_exit.png');
        s_oSpriteLibrary.addSprite('but_info', './images/but_info.png');
        s_oSpriteLibrary.addSprite('but_restart_small', './images/but_restart_small.png');
        s_oSpriteLibrary.addSprite('but_yes', './images/but_yes.png');
        s_oSpriteLibrary.addSprite('but_home', './images/but_home.png');
        s_oSpriteLibrary.addSprite('but_restart', './images/but_restart.png');
        s_oSpriteLibrary.addSprite('but_start', './images/but_start.png');
        s_oSpriteLibrary.addSprite('but_no', './images/but_no.png');
        s_oSpriteLibrary.addSprite('but_fullscreen', './images/but_fullscreen.png');
        s_oSpriteLibrary.addSprite('bg_menu', './images/bg_menu.png');
        s_oSpriteLibrary.addSprite('bg_game', './images/bg_game.png');
        s_oSpriteLibrary.addSprite('msg_box', './images/msg_box.png');
        s_oSpriteLibrary.addSprite('audio_icon', './images/audio_icon.png');
        s_oSpriteLibrary.addSprite('logo_menu', './images/logo_menu.png');
        s_oSpriteLibrary.addSprite('bg_score', './images/bg_score.png');
        s_oSpriteLibrary.addSprite('bg_bestscore', './images/bg_bestscore.png');
        total_progress += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    this._onImagesLoaded = function() {
        index_progress++;
        var _0xc6e11 = Math['floor'](index_progress / total_progress * 0x64);
        preloader['refreshLoader'](_0xc6e11);
        if (index_progress === total_progress) {
            this._onRemovePreloader();
        }
    };
    this._onAllImagesLoaded = function() {};
    this.preloaderReady = function() {
        this._loadImages();
        if (DISABLE_SOUND_MOBILE === ![] || s_bMobile === ![]) {
            this._initSounds();
        }
        is_update = !![];
    };
    this._onRemovePreloader = function() {
        preloader['unload']();
        if (!isIOS()) {
            s_oSoundTrack = playSound('soundtrack', 0x1, !![]);
        }
        this.gotoMenu();
    };
    this.gotoMenu = function() {
        menu = new CMenu();
        state = STATE_MENU;
    };
    this.gotoGame = function() {
        game = new CGame(_0x51c1f7);
        state = STATE_GAME;
    };
    this.gotoHelp = function() {
        help = new CHelp();
        state = STATE_HELP;
    };
    this.gotoCongratulations = function(_0x33560a, _0x5ae57f) {
        congratulations = new CCongratulations(_0x33560a, _0x5ae57f);
        state = STATE_MENU;
    };
    this.stopUpdate = function() {
        is_update = ![];
        createjs.Ticker.paused = !![];
        $('#block_game').css('display', 'block');
        if (DISABLE_SOUND_MOBILE === ![] || s_bMobile === ![]) {
            Howler['mute'](!![]);
        }
    };
    this.startUpdate = function() {
        s_iPrevTime = new Date()['getTime']();
        is_update = !![];
        createjs['Ticker'].paused = ![];
        $('#block_game').css('display', 'none');
        if (DISABLE_SOUND_MOBILE === ![] || s_bMobile === ![]) {
            if (s_bAudioActive) {
                Howler.mute(![]);
            }
        }
    };
    this._update = function(_0x3a2a64) {
        if (is_update === ![]) {
            return;
        }
        var _0x5f2bf9 = new Date().getTime();
        s_iTimeElaps = _0x5f2bf9 - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = _0x5f2bf9;
        if (s_iCntTime >= 0x3e8) {
            s_iCurFps = s_iCntFps;
            s_iCntTime -= 0x3e8;
            s_iCntFps = 0x0;
        }
        if (state === STATE_GAME) {
            game.update();
        }
        s_oStage.update(_0x3a2a64);
    };
    s_oMain = this;
    _0x51c1f7 = _0x3beb5e;
    ENABLE_CHECK_ORIENTATION = _0x51c1f7.check_orientation;
    ENABLE_FULLSCREEN = _0x3beb5e.fullscreen;
    this.initContainer();
}
var s_bMobile;
var s_bAudioActive = !![];
var s_bFullscreen = ![];
var s_iCntTime = 0x0;
var s_iTimeElaps = 0x0;
var s_iPrevTime = 0x0;
var s_iCntFps = 0x0;
var s_iCurFps = 0x0;
var s_oAdsLevel = 0x1;
var s_iBestScore;
var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundTrack = null;
var s_aSounds;