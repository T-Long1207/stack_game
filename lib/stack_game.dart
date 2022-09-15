
import 'package:flutter/services.dart';

const MethodChannel _channel = MethodChannel('stack_game');

/// Scanning Bar Code or QR Code return content
Future<String?> play() async => await _channel.invokeMethod('play');

/// Scanning Bar Code or QR Code return content
Future<String?> play2048() async => await _channel.invokeMethod('play2048');