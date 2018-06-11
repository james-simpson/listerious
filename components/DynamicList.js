import React from 'react'
import { View } from 'react-native'
import { List, AddItemInput } from '.'
import _ from 'lodash'

class DynamicList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        { text: 'Noodles', completed: false },
        { text: 'Tofu', completed: false },
        { text: 'Soy sauce', completed: false },
        { text: 'Ginger', completed: false }
      ]
    }
  }

  openItems () {
    return this.state.items.filter(item => !item.completed)
  }

  closedItems () {
    return this.state.items.filter(item => item.completed)
  }

  toggleItemCheckbox (id) {
    const items = this.state.items
    const updatedItems = this.state.items.map(item =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    )
    this.setState({ items: updatedItems }) 
  }

  updateItemText (id, text) {
    const items = this.state.items
    const updatedItems = this.state.items.map(item =>
      item.id === id
        ? { ...item, text: text }
        : item
    )
    this.setState({ items: updatedItems })
  }

  addItem (itemText) {
    const item = { text: itemText, completed: false, id: _.uniqueId() }
    this.setState({
      items: [ ...this.state.items, item ]
    })
  }

  removeItem (id) {
    const updatedItems = this.state.items.filter(x => x.id !== id)
    this.setState({ items: updatedItems })
  }

  render () {
    return (
      <View>
        {/* Todo items*/}
        <List
          items={this.openItems()}
          onCompletedChange={id => this.toggleItemCheckbox(id)}
          onTextChange={(id, text) => this.updateItemText(id, text)}
          onDelete={id => this.removeItem(id)}
        />
        {/* Add a new item */}
        <AddItemInput
          style={{marginBottom: 20}}
          onAdd={itemText => this.addItem(itemText)}
        />
        {/* Completed items*/}
        <List
          items={this.closedItems()}
          onCompletedChange={id => this.toggleItemCheckbox(id)}
          onDelete={id => this.removeItem(id)}
        />
      </View>
    )
  }

  // Assign unique IDs to each list item when the component is mounted.
  // React will use these IDs as keys to keep track of each item.
  componentWillMount() {
    const items = this.state.items.map(
      item => ({ ...item, id: _.uniqueId()})
    )
    this.setState({ items })
  }
}

export default DynamicList