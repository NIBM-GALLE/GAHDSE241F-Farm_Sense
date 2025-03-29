@echo off
"C:\\Program Files\\Java\\jdk-17\\bin\\java" ^
  --class-path ^
  "C:\\Users\\DELL\\.gradle\\caches\\modules-2\\files-2.1\\com.google.prefab\\cli\\2.1.0\\aa32fec809c44fa531f01dcfb739b5b3304d3050\\cli-2.1.0-all.jar" ^
  com.google.prefab.cli.AppKt ^
  --build-system ^
  cmake ^
  --platform ^
  android ^
  --abi ^
  arm64-v8a ^
  --os-version ^
  24 ^
  --stl ^
  c++_shared ^
  --ndk-version ^
  27 ^
  --output ^
  "C:\\Users\\DELL\\AppData\\Local\\Temp\\agp-prefab-staging5037844738422911683\\staged-cli-output" ^
  "C:\\Users\\DELL\\.gradle\\caches\\8.12\\transforms\\52a52e4c4792af3ca58b2df5dfea7545\\transformed\\react-android-0.78.1-debug\\prefab" ^
  "D:\\Final HDSE\\github code\\GAHDSE241F-Farm_Sense\\mobileapp\\android\\app\\build\\intermediates\\cxx\\refs\\react-native-reanimated\\52m5m604" ^
  "C:\\Users\\DELL\\.gradle\\caches\\8.12\\transforms\\1727645527b8d4a52140297d30f9ce10\\transformed\\hermes-android-0.78.1-debug\\prefab" ^
  "C:\\Users\\DELL\\.gradle\\caches\\8.12\\transforms\\bbbd7faada6db350ac59925f93ab342e\\transformed\\fbjni-0.7.0\\prefab"
