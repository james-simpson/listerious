import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem } from '.'

List = ({ items, onCompletedChange, onTextChange, onDelete }) =>
  items.map((item, i) => (
    <ListItem
      text={item.text}
      completed={item.completed}
      onCompletedChange={() => onCompletedChange(item.id)}
      onTextChange={text => onTextChange(item.id, text)}
      onDelete={text => onDelete(item.id)}
      key={item.id}
    />
  )
)

export default List