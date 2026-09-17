# CreAI for iPhone and Android

The CreAI app for the App Store and Google Play, built with [Capacitor](https://capacitorjs.com) (MIT).
It bundles the same interface as [app.creai.dev](https://app.creai.dev) on the device and talks to the
live API, with native pieces on top: system-browser sign-in that returns to the app (`creai://auth`),
native splash, status bar and haptics.

## Everyday

```bash
npm install
npm run sync      # pull the current app from app.creai.dev into www/, then copy into both platforms
npm run android   # opens Android Studio
npm run ios       # opens Xcode (macOS)
npm run assets    # regenerate icons and splash screens from assets/
```

Every push runs `build.yml`, which compiles an unsigned Android APK and an iOS simulator build.

## Store rules this app is built around

* **Not a wrapped website.** The interface ships inside the app; sign-in, voice and native UI live on the device.
* **Sign-in** opens in the system browser (Google blocks embedded web views) and returns through `creai://auth`
  with a one-time code.
* **Digital credits.** Apple and Google require their own billing for credits bought inside an app. Until
  store billing is added, the app shows the balance only and has no web checkout.
* **Sign in with Apple** is required on iOS once other social sign-in is offered. It must be added before the
  first App Store submission.

## Releasing (`release.yml`, run manually)

Set repository **variables** `IOS_ENABLED=true` / `ANDROID_ENABLED=true`, and these **secrets**:

| Secret | Where it comes from |
| --- | --- |
| `APPLE_TEAM_ID` | Apple Developer → Membership |
| `ASC_KEY_ID`, `ASC_ISSUER_ID` | App Store Connect → Users and Access → Integrations → App Store Connect API (role: App Manager) |
| `ASC_KEY_P8_BASE64` | That key's `.p8` file, base64-encoded |
| `ANDROID_KEYSTORE_BASE64` | Upload key: `keytool -genkeypair -v -keystore release.keystore -alias creai -keyalg RSA -keysize 2048 -validity 10000`, then base64 |
| `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD` | From the command above |
| `PLAY_SERVICE_ACCOUNT_JSON` | Google Play Console → Setup → API access → service account with release permissions |

iOS builds upload to TestFlight; Android builds go to the Play internal testing track as drafts.
Bundle ID / package name: `dev.creai.app`.
