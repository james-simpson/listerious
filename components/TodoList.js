import React from 'react'
import { View, Text } from 'react-native'
import { List, AddItemInput } from '.'
import _ from 'lodash'
import api from '../api'

class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      loading: false,
      updateInProgress: false
    }

    this.loadItems()
  }

  componentDidMount() {
    setInterval(() => { this.loadItems() }, 1000)
  }

  loadItems () {
    if (!this.state.updateInProgress) {
      return api.getAll()
        .then(response => {
          this.setState({
            items: response.data,
            loading: false
          })
        })
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

  updateItemName (id, name) {
    const updatedItems = this.state.items.map(item =>
      item.id === id
        ? { ...item, name: name }
        : item
    )
    this.setState({ items: updatedItems })
  }

  addItem (itemName) {
    const tempId = _.uniqueId()
    const item = { name: itemName, completed: false, id: tempId }
    this.setState({
      items: [ ...this.state.items, item ],
      updateInProgress: true
    })

    api.add(itemName)
      .then(id => {
        const updatedItems = this.state.items.map(item =>
          item.id === tempId
            ? { ...item, id: id }
            : item
        )
        this.setState({
          items: updatedItems,
          updateInProgress: false
        })
      })
  }

  removeItem (id) {
    const updatedItems = this.state.items.filter(x => x.id !== id)
    this.setState({
      items: updatedItems,
      updateInProgress: true
    })
    api.delete(id).then(() => {
      this.setState({ updateInProgress: false })
    })
  }

  render () {
    if (this.state.loading) {
      return <Text style={{ fontSize: 20 }}>Loading...</Text>
    }

    return (
      <View>
        {/* Todo items*/}
        <List
          items={this.openItems()}
          onCompletedChange={id => this.toggleItemCheckbox(id)}
          onTextChange={(id, name) => this.updateItemName(id, name)}
          onDelete={id => this.removeItem(id)}
        />
        {/* Add a new item */}
        <AddItemInput
          style={{marginBottom: 20}}
          onAdd={itemName => this.addItem(itemName)}
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

export default TodoList