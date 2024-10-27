<div align="center">
	<img src="https://static.gomarketme.net/assets/gmm-icon.png" alt="GoMarketMe"/>
	<br>
    <h1>gomarketme-react-native-expo</h1>
	<p>Affiliate Marketing for React Native Expo-Based iOS and Android Apps.</p>
</div>

## Installation

### Using npm

```bash
npm install gomarketme-react-native-expo
```

### Using yarn

```bash
yarn add gomarketme-react-native-expo
```

### Using pnpm

```bash
pnpm add gomarketme-react-native-expo
```


## Usage

To initialize GoMarketMe, import the `gomarketme-react-native-expo` package and create a new instance of `GoMarketMe`:

```tsx
import GoMarketMe from 'gomarketme-react-native-expo';

export default function App() {

  const initializeSDK = async () => {
    await GoMarketMe.initialize('YOUR_API_KEY'); // Replace with your actual API key
  };

  initializeSDK();
  
  return (
    <View style={styles.container}>
      <Text>My App</Text>
      <StatusBar style="auto" />
    </View>
  );
}
```

Make sure to replace API_KEY with your actual GoMarketMe API key. You can find it on the product onboarding page and under Profile > API Key.

## Support

If you encounter any problems or issues, please contact us at [integrations@gomarketme.co](mailto:integrations@gomarketme.co) or visit [https://gomarketme.co](https://gomarketme.co).