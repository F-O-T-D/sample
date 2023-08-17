import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { WHITE, PRIMARY } from '../Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUserState } from '../Contexts/UserContext';

const ListItem = memo(({ item }) => {
  const [user, setUser] = useUserState();

  const handingDelete = (item) => {
    axios.delete(
      `http://localhost:3000/api/list/${user.user_id}/store/${item.id}`
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.task}>
        <Text>{item.name}</Text>
      </View>
      <Pressable onPress={() => handingDelete({item})}hitSlop={10}>
        <MaterialCommunityIcons
          name="trash-can"
          size={20}
          color={PRIMARY.DEFAULT}
        />
      </Pressable>
    </View>
  );
});

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: PRIMARY.DEFAULT,
    backgroundColor: WHITE,
    flexDirection: 'row',
    alignItems: 'center',
  },
  task: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default ListItem;
