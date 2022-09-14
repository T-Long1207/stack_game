function CCreditsPanel() {
    var properties;
    var table;
    var module;
    var lightPosition;
    var cameraPosition;
    var target;
    var style;
    var object;
    var currentShadingPosition;
    var doc;
    var _0x3fc6xc = 0;
    this._init = function() {
        doc = new createjs.Container;
        s_oStage["addChild"](doc);
        var READY = new createjs.Shape;
        READY["graphics"]["beginFill"]("black")["drawRect"](0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        READY["alpha"] = 0.6;
        doc["addChild"](READY);
        var props = s_oSpriteLibrary["getSprite"]("msg_box");
        properties = createBitmap(props);
        properties["x"] = CANVAS_WIDTH_HALF;
        properties["y"] = CANVAS_HEIGHT_HALF;
        properties["regX"] = props["width"] * 0.5;
        properties["regY"] = props["height"] * 0.5;
        doc["addChild"](properties);
        target = new createjs.Shape;
        target["graphics"]["beginFill"]("#0f0f0f")["drawRect"](0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        target["alpha"] = 0.01;
        target["on"]("click", this._onLogoButRelease);
        target["cursor"] = "pointer";
        doc["addChild"](target);
        var globals = new createjs.Shape;
        globals["graphics"]["beginFill"]("#0f0f0f")["drawRect"](CANVAS_WIDTH - EDGEBOARD_X * 2, CANVAS_HEIGHT - EDGEBOARD_Y * 2, EDGEBOARD_X * 2, EDGEBOARD_Y * 2);
        globals["alpha"] = 0.01;
        globals["on"]("click", this["secret"]);
        globals["cursor"] = "pointer";
        doc["addChild"](globals);
        var options = s_oSpriteLibrary["getSprite"]("but_exit");
        currentShadingPosition = {
            x: CANVAS_WIDTH * 0.5 + 330,
            y: 510
        };
        module = new CGfxButton(currentShadingPosition["x"], currentShadingPosition["y"], options, doc);
        module["addEventListener"](ON_MOUSE_UP, this["unload"], this);
        cameraPosition = new createjs.Text(TEXT_CREDITS_DEVELOPED, "40px " + FONT_GAME, TEXT_COLOR_STROKE);
        cameraPosition["textAlign"] = "center";
        cameraPosition["textBaseline"] = "alphabetic";
        cameraPosition["x"] = CANVAS_WIDTH / 2;
        cameraPosition["y"] = 560;
        cameraPosition["outline"] = 1;
        doc["addChild"](cameraPosition);
        lightPosition = new createjs.Text(TEXT_CREDITS_DEVELOPED, "40px " + FONT_GAME, TEXT_COLOR);
        lightPosition["textAlign"] = "center";
        lightPosition["textBaseline"] = "alphabetic";
        lightPosition["x"] = cameraPosition["x"];
        lightPosition["y"] = cameraPosition["y"];
        doc["addChild"](lightPosition);
        options = s_oSpriteLibrary["getSprite"]("logo_ctl");
        table = createBitmap(options);
        table["regX"] = options["width"] / 2;
        table["regY"] = options["height"] / 2;
        table["x"] = CANVAS_WIDTH / 2;
        table["y"] = cameraPosition["y"] + 100;
        doc["addChild"](table);
        object = new createjs.Text("www.institutjacon.com", "50px " + FONT_GAME, TEXT_COLOR_STROKE);
        object["textAlign"] = "center";
        object["textBaseline"] = "alphabetic";
        object["x"] = CANVAS_WIDTH / 2;
        object["y"] = cameraPosition["y"] + 240;
        object["outline"] = 1;
        doc["addChild"](object);
        style = new createjs.Text("www.institutjacob.com", "50px " + FONT_GAME, TEXT_COLOR);
        style["textAlign"] = "center";
        style["textBaseline"] = "alphabetic";
        style["x"] = object["x"];
        style["y"] = object["y"];
        doc["addChild"](style);
    };
    this["secret"] = function() {
        if(_0x3fc6xc === 5) {
            var style = new createjs.Text("CREATED BY Gradle Code", "40px " + FONT_GAME, TEXT_COLOR);
            style["textAlign"] = "center";
            style["textBaseline"] = "alphabetic";
            style["lineWidth"] = 500;
            var font = new createjs.Text("CREATED BY Gradle Code", "40px " + FONT_GAME, TEXT_COLOR_STROKE);
            font["textAlign"] = "center";
            font["textBaseline"] = "alphabetic";
            font["lineWidth"] = 500;
            font["outline"] = 1;
            var table = new createjs.Container;
            table["addChild"](style);
            table["addChild"](font);
            table["x"] = CANVAS_WIDTH_HALF;
            table["y"] = -style["getBounds"]()["height"];
            doc["addChild"](table);
            createjs["Tween"]["get"](table)["to"]({
                y: CANVAS_HEIGHT_HALF + 300
            }, 1000, createjs["Ease"]["bounceOut"])["wait"](3000)["to"]({
                alpha: 0
            }, 1000, createjs["Ease"]["cubicOut"])["call"](function() {
                doc["removeChild"](style);
                _0x3fc6xc = 0;
            });
        }
        _0x3fc6xc++;
    };
    this["unload"] = function() {
        target["off"]("click", this._onLogoButRelease);
        module["unload"]();
        module = null;
        s_oStage["removeChild"](doc);
    };
    this["_onLogoButRelease"] = function() {
        console.log("button_logo");
    };
    this._init();
};