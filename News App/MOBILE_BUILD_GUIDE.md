# Mobile App Build Guide (Without Android Studio)

This guide will help you build and run your React app as a mobile application using Capacitor without needing Android Studio.

## Prerequisites

1. **Node.js** (v16 or higher)
2. **Java Development Kit (JDK) 17**
3. **Android SDK Command Line Tools**
4. **Gradle** (will be downloaded automatically)

## Setup Instructions

### 1. Install Java JDK 17
Download and install JDK 17 from Oracle or use OpenJDK:
```bash
# Check if Java is installed
java -version
```

### 2. Install Android SDK Command Line Tools
1. Download Android SDK Command Line Tools from: https://developer.android.com/studio#command-tools
2. Extract to a folder (e.g., `C:\Android\cmdline-tools`)
3. Set environment variables:
   - `ANDROID_HOME=C:\Android`
   - `ANDROID_SDK_ROOT=C:\Android`
   - Add to PATH: `C:\Android\cmdline-tools\latest\bin`

### 3. Install Android SDK Components
```bash
# Accept licenses
sdkmanager --licenses

# Install required SDK components
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
```

### 4. Install Dependencies
```bash
npm install
```

## Build Commands

### Development Build
```bash
# Build for development and open in default Android emulator/device
npm run android:dev
```

### Production Build
```bash
# Build for production and prepare for Android
npm run android:build
```

### Manual Build Process
```bash
# 1. Build the web app
npm run build

# 2. Sync with Capacitor
npm run sync:android

# 3. Build APK using Gradle (from android directory)
cd android
./gradlew assembleDebug

# 4. Install APK on connected device
adb install app/build/outputs/apk/debug/app-debug.apk
```

## Running on Device/Emulator

### Using ADB (Android Debug Bridge)
```bash
# List connected devices
adb devices

# Install APK on device
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Run app on device
adb shell am start -n com.newsapp.mobile/.MainActivity
```

### Using Emulator
1. Download Android Emulator from SDK Manager
2. Create AVD (Android Virtual Device):
```bash
avdmanager create avd -n MyEmulator -k "system-images;android-34;google_apis;x86_64"
```
3. Start emulator:
```bash
emulator -avd MyEmulator
```

## Build Outputs

- **Debug APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK**: `android/app/build/outputs/apk/release/app-release.apk`

## Troubleshooting

### Common Issues:

1. **JAVA_HOME not set**: Set JAVA_HOME environment variable to JDK installation path
2. **Android SDK not found**: Ensure ANDROID_HOME and ANDROID_SDK_ROOT are set correctly
3. **Gradle build fails**: Run `./gradlew clean` in android directory and try again
4. **Permission denied**: Run `chmod +x gradlew` in android directory

### Environment Variables (Windows)
Add these to your system environment variables:
```
JAVA_HOME=C:\Program Files\Java\jdk-17
ANDROID_HOME=C:\Android
ANDROID_SDK_ROOT=C:\Android
PATH=%PATH%;%ANDROID_HOME%\cmdline-tools\latest\bin;%ANDROID_HOME%\platform-tools
```

## App Features Already Configured

✅ **Capacitor Integration**: App is ready for mobile deployment
✅ **Android Back Button**: Properly handles Android back button navigation
✅ **Status Bar**: Configured for mobile appearance
✅ **App Icons**: Android app icons are set up
✅ **Splash Screen**: Mobile splash screen configured
✅ **Mobile-Optimized UI**: Responsive design for mobile devices

## Next Steps

1. Test the app on a physical device or emulator
2. Configure app signing for release builds
3. Optimize performance for mobile devices
4. Add additional Capacitor plugins as needed (camera, geolocation, etc.)

## Useful Commands

```bash
# Check Capacitor configuration
npx cap doctor

# Update Capacitor
npx cap update

# Add iOS platform (if needed later)
npx cap add ios

# Live reload during development
npx cap run android --livereload --external
```