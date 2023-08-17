import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, Text } from 'react-native';
import { WHITE, PRIMARY, BACKCARROT } from '../Colors';

const latitude = 37.5512;
const longitude = 126.9882;

const MapScreen = () => {
  const [storeName, setStoreName] = React.useState('');

  const mapUrl = `https://map.kakao.com/link/map/${latitude},${longitude}`;

  return (
    <View style={styles.container}>
      <WebView source={{ uri: mapUrl }} />
      <View style={styles.textContainer}>
        <Text style={styles.input} />
        <Text style={styles.input} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    backgroundColor: BACKCARROT,
    justifyContent: 'center', // 수직 방향 가운데 정렬
    alignItems: 'center', // 수평 방향 가운데 정렬
  },
  input: {
    height: 40,
    borderColor: PRIMARY.DEFAULT,
    borderWidth: 2,
    margin: 10,
    padding: 10,
    width: 300,
    borderRadius: 20,
  },
});

export default MapScreen;
