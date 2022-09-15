package com.healer.stack_game;

import android.os.Handler;

import io.flutter.plugin.common.EventChannel;

public class ActionStreamHandler implements  EventChannel.StreamHandler{
    EventChannel.EventSink sink;
    private Handler handler;
    Runnable runnable = new Runnable() {
        @Override
        public void run() {
            sink.success(1);
        }
    };

    public void finishActivity(){
        handler.post(runnable);
    }

    @Override
    public void onListen(Object arguments, EventChannel.EventSink events) {
        sink = events;
        handler = new Handler();
        handler.post(runnable);
    }

    @Override
    public void onCancel(Object arguments) {
        sink = null;
        handler.removeCallbacks(runnable);
    }
}
