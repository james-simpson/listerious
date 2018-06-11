import React from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import { DynamicList } from './components'

class App extends React.Component {

  render () {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        {/* keyboardShouldPersistTaps='always' allows moving focus from
            one TextInput to another within a ScrollView in one touch */}
        <ScrollView keyboardShouldPersistTaps='always'>
            <DynamicList/>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f781',
    justifyContent: 'center',
    paddingTop: 80,
    paddingLeft: 20,
    paddingRight: 20
  }
})

export default App