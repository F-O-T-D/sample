import { TextInput, View } from 'react-native';
import { BACKCARROT, GRAY } from '../Colors';
import EmptyList from '../Components/EmptyList';
import List from '../Components/List';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InputFAB from '../Components/InputFAB';
import { useNavigation } from '@react-navigation/native';
import { MapRoutes } from '../Navigations/Routes';
import React, { useState, useEffect } from 'react';
import { useUserState } from '../Contexts/UserContext';

const ListScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const [restauList, setRestauList] = useState([]);
  const [user, setUser] = useUserState();

  // 가게 정보를 불러오는 함수 (예시 코드, 실제 API 호출로 대체 필요)
  const fetchRestauList = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/list/${userId}/store`);
      const data = await response.json();
      setRestauList(data); // 가게 정보를 state에 저장
    } catch (error) {
      console.error('가게 정보를 불러오는데 오류 발생:', error);
    }
  };

  useEffect(() => {
    // 사용자 ID를 이용하여 가게 정보를 가져옴
    const userId = user.user_id; // 실제 사용자 아이디로 대체 필요
    fetchRestauList(userId);
  }, []);
  const restauList1 = [
    { id: 1, name: '수아당' },
    { id: 2, name: '언앨리셰프' },
  ];
  //db에서 가져올때 storeid필수

  const buttonPress = () => {
    navigation.navigate(MapRoutes.MAP);
  };

  return (
    <View
      style={{ flex: 1, paddingBottom: bottom, backgroundColor: BACKCARROT }}
    >
      {restauList.length ? <List data={restauList} /> : <EmptyList />}
      <InputFAB onSubmit={buttonPress} />
    </View>
  );
};
// 버튼에서 위도 경도 전달해 주면 된다..
export default ListScreen;
