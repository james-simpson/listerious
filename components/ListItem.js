import React from 'react'
import { StyleSheet, Text, TextInput, View, CheckBox, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

ListItem = ({
  text,
  completed,
  id,
  onTextChange,
  onCompletedChange,
  onDelete
}) => (
  <View style={styles.listItem}>
    <View style={styles.checkboxAndText}>
      <CheckBox
        value={completed}
        onValueChange={() => onCompletedChange()}
      />
      {completed ?
        <Text style={getTextStyle(completed)}>{text}</Text>
      : <TextInput
        style={getTextStyle(completed)}
        value={text}
        onChangeText={text => onTextChange(text)}
        underlineColorAndroid='rgba(0,0,0,0)'
      />}
    </View>
    <View>
      <Icon
        name="circle-with-cross"
        size={22}
        style={styles.deleteButton}
        color='#5b5b59'
        onPress={() => onDelete()}
      />
    </View>
  </View>
)

const getTextStyle = completed => {
  const style = { fontSize: 20, paddingLeft: 5 }
  if (completed) {
    style.textDecorationLine = 'line-through'
    style.textDecorationStyle = 'solid'
  }
  return style
}

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 10
  },
  checkboxAndText: { flex: 1, flexDirection: 'row' },
  deleteButton: { marginTop: 5, paddingRight: 10 }
})

export default ListItem