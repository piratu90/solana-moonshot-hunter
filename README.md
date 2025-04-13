
# SolanaShot Trading Bot

## Wallet Connection
This application supports connecting to Phantom wallet and other Solana wallets.

## Creating an Executable

To create an executable from this application, you can use Electron. Here's how:

### 1. Install Required Dependencies

```bash
npm install --save-dev electron electron-builder
```

### 2. Add Build Scripts to package.json

Add these scripts to your package.json:

```json
"scripts": {
  "electron:start": "electron .",
  "electron:build": "electron-builder",
  "package:mac": "electron-builder build --mac",
  "package:win": "electron-builder build --win",
  "package:linux": "electron-builder build --linux"
}
```

### 3. Add Electron Configuration to package.json

```json
"main": "electron.js",
"build": {
  "appId": "com.solanashot.app",
  "productName": "SolanaShot",
  "files": [
    "dist/**/*",
    "electron.js"
  ],
  "mac": {
    "category": "public.app-category.finance"
  },
  "win": {
    "target": "nsis"
  },
  "linux": {
    "target": "AppImage"
  }
}
```

### 4. Build the App

```bash
npm run build
npm run electron:build
```

The executable will be created in the `dist` directory.

## Development

```bash
npm run dev          # Run web version
npm run electron:start  # Run desktop version during development
```
