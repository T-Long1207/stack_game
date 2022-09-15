package com.healer.stack_game;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import io.flutter.embedding.engine.plugins.FlutterPlugin;
import io.flutter.embedding.engine.plugins.activity.ActivityAware;
import io.flutter.embedding.engine.plugins.activity.ActivityPluginBinding;
import io.flutter.plugin.common.EventChannel;
import io.flutter.plugin.common.MethodCall;
import io.flutter.plugin.common.MethodChannel;
import io.flutter.plugin.common.MethodChannel.MethodCallHandler;
import io.flutter.plugin.common.MethodChannel.Result;
import io.flutter.plugin.common.PluginRegistry;

/** StackGamePlugin */
public class StackGamePlugin implements FlutterPlugin, ActivityAware, MethodCallHandler, PluginRegistry.ActivityResultListener  {
  /// The MethodChannel that will the communication between Flutter and native Android
  ///
  /// This local reference serves to register the plugin with the Flutter Engine and unregister it
  /// when the Flutter Engine is detached from the Activity
  private MethodChannel channel;
  private final static String TAG = "StackGame";

  private Result result = null;
  private Activity activity;
  private final int REQUEST_CODE = 100;
  private final int REQUEST_IMAGE = 101;

  @Override
  public void onAttachedToEngine(@NonNull FlutterPluginBinding flutterPluginBinding) {
    channel = new MethodChannel(flutterPluginBinding.getBinaryMessenger(), "stack_game");
    channel.setMethodCallHandler(this);
    MainApplication.getInstance();

    EventChannel  eventFinish = new EventChannel(flutterPluginBinding.getBinaryMessenger(), "random_number_channel");
    eventFinish.setStreamHandler(MainApplication.getInstance().getActionStreamHandler());

  }

  @Override
  public void onMethodCall(@NonNull MethodCall call, @NonNull Result result) {

    Log.i(TAG, "onMethodCall: " + call.method);
    switch (call.method) {
      case "play":
        Log.i(TAG, "play");
        this.result = result;
        play();
        break;
      case "play2048":
        this.result = result;
        play2048();
      default:
        result.notImplemented();
        break;
    }
  }

  private void play() {
    Intent intent = new Intent(activity, MainActivity.class);
    activity.startActivityForResult(intent, REQUEST_CODE);
  }

  private void play2048(){
    Intent intent = new Intent(activity, GamePlayTwoActivity.class);
    activity.startActivityForResult(intent, REQUEST_CODE);
  }

  @Override
  public void onDetachedFromEngine(@NonNull FlutterPluginBinding binding) {
    channel.setMethodCallHandler(null);
    channel = null;

  }

  @Override
  public void onAttachedToActivity(@NonNull ActivityPluginBinding binding) {
    activity = binding.getActivity();
    binding.addActivityResultListener(this);
  }

  @Override
  public void onDetachedFromActivityForConfigChanges() {
    onDetachedFromActivity();
    Log.i(TAG, "onDetachedFromActivityForConfigChanges: ");
  }

  @Override
  public void onReattachedToActivityForConfigChanges(@NonNull ActivityPluginBinding binding) {
    Log.i(TAG, "onReattachedToActivityForConfigChanges: ");
    onAttachedToActivity(binding);
  }

  @Override
  public void onDetachedFromActivity() {
    activity = null;
    Log.i(TAG, "onDetachedFromActivity: ");
  }

  @Override
  public boolean onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    if (requestCode == REQUEST_CODE) {
      if (resultCode == Activity.RESULT_OK && data != null) {

      } else {
        String errorCode = data != null ? data.getStringExtra("ERROR_CODE") : null;
        if (errorCode != null) {
          this.result.error(errorCode, null, null);
        }
      }
      return true;
    } else if (requestCode == REQUEST_IMAGE) {

      return true;
    }
    return false;
  }
}
