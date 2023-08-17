import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, Text } from 'react-native';
import { WHITE, PRIMARY, BACKCARROT } from '../Colors';
import MiniButton from '../Components/MiniButton';
import axios from 'axios';
import { useReducer } from 'react';
import { authFormReducer, initAuthForm} from "../Reducers/authFormReducer";
import { useUserState } from '../Contexts/UserContext';


const MapScreen = ({ route }) => {
  //const [form, dispatch] = useReducer(authFormReducer,initAuthForm);
  //const [user, setUser] = useUserState();
  const { storeName, address, latitude, longitude } = route.params;

  const mapUrl = `https://map.kakao.com/link/map/${latitude},${longitude}`;

  return (
    <View style={styles.container}>
      <WebView source={{ uri: mapUrl }} />
      <View style={styles.textContainer}>
        <Text style={styles.input}>{storeName}</Text>
        <Text style={styles.input}>{address}</Text>
        <MiniButton
          title="등록하기"
          onPress={() =>
            handleRegistration(storeName, address, latitude, longitude)
          }
        />
      </View>
    </View>
  );
};

const handleRegistration = async(storeName, address, latitude, longitude) => {
  // 여기에 등록 작업을 수행하는 코드를 작성합니다.
  // 예를 들어, 서버에 데이터를 보내는 등의 작업을 수행할 수 있습니다.
  const [user, setUser] = useUserState();
  console.log('user 정보:', user); // user 정보 확인
  console.log('user_id 확인:', user.user_id); 
  try {
  const response = await axios.post(
    `http://localhost:3000/api/list/map/${user.user_id}`,
    {
      "userId": user.user_id,
      "name": storeName,
      "address": address,
      "lat": latitude,
      "lng": longitude
    });
    //console.log('user_id 확인:', user.user_id);
  console.log('등록 작업 수행:',response.data)
  } catch (error) {
    console.error('등록 작업 오류:', error);//console.log('등록 작업 수행:', storeName, address, latitude, longitude);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    backgroundColor: BACKCARROT,
    justifyContent: 'center', // 수직 방향 가운데 정렬
    alignItems: 'center', // 수평 방향 가운데 정렬
    padding: 10,
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
