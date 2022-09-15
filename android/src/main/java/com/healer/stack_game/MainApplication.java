package com.healer.stack_game;

import io.flutter.app.FlutterApplication;

public class MainApplication extends FlutterApplication {
    private static MainApplication instance = null;
    private static ActionStreamHandler _actionStreamHandler;


    public static MainApplication getInstance() {
        if (instance == null) {
            instance = new MainApplication();
            _actionStreamHandler = new ActionStreamHandler();
        }


        return instance;
    }

    ActionStreamHandler getActionStreamHandler() {
        return _actionStreamHandler;
    }

}
