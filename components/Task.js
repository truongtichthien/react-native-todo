import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function Task({ text, complete }) {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={[styles.square, complete ? styles.complete : {}]} />
        <Text style={styles.itemText}>{text}</Text>
      </View>
      {/* <View style={styles.circular}></View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    borderColor: '#55bcf6',
    borderWidth: 3,
    opacity: 0.8,
    borderRadius: 5,
    marginRight: 15
  },
  complete: {
    backgroundColor: '#55bcf6'
  },
  itemText: {
    maxWidth: '80%'
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55bcf6',
    borderWidth: 2,
    borderRadius: 5
  }
});

export default Task;