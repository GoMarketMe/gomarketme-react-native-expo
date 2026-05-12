# Deprecated: use `gomarketme-react-native` instead

> **This Expo-specific GoMarketMe package/sample app is deprecated.**
>
> Expo apps are now supported by the main GoMarketMe React Native SDK v5+.

Please use the main React Native SDK going forward:

```bash
npm install gomarketme-react-native@latest
```

```ts
import GoMarketMe from 'gomarketme-react-native';
```

## Why this is deprecated

GoMarketMe previously maintained a separate Expo-specific package/sample app for React Native Expo projects.

That is no longer necessary. The main GoMarketMe React Native SDK v5+ now works with Expo apps using its own native bridges.

## What to use instead

Use:

- npm package: `gomarketme-react-native`
- GitHub repository: https://github.com/GoMarketMe/gomarketme-react-native
- npm page: https://www.npmjs.com/package/gomarketme-react-native

Do not use:

- `gomarketme-react-native-expo`

## Migration from `gomarketme-react-native-expo`

### 1. Remove the old Expo-specific package

```bash
npm uninstall gomarketme-react-native-expo
```

### 2. Install the main React Native SDK

```bash
npm install gomarketme-react-native@latest
```

### 3. Update your imports

```diff
- import GoMarketMe from 'gomarketme-react-native-expo';
+ import GoMarketMe from 'gomarketme-react-native';
```

### 4. Follow the main SDK setup instructions

Please follow the latest setup instructions in the main React Native SDK repository:

https://github.com/GoMarketMe/gomarketme-react-native

## Status of this package/sample app

This package/sample app is kept online only to help existing users find the correct migration path.

It is no longer actively maintained and should not be used for new integrations.

## Need help?

If you have questions about migrating your Expo app to the main GoMarketMe React Native SDK, please contact GoMarketMe support [integrations@gomarketme.co](mailto:integrations@gomarketme.co) or visit [https://gomarketme.co](https://gomarketme.co).
