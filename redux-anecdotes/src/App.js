import React from 'react';
import { createStore } from 'redux'
import counterReducer from './reducer'
import actionFor from './actionCreator'

const store = createStore(counterReducer)
class App extends React.Component {
  handleClick = (id) => () => {
    this.props.store.dispatch(
      actionFor.like(id)
    )
  }
  handleAdd = (event) => {
    event.preventDefault()
    this.props.store.dispatch(actionFor.anecdoteCreation(event.target.content.value)) 
    event.target.content.value = ''


  }

  render() {
    const order=(eka, toka) => toka.votes-eka.votes
    const anecdotes = this.props.store.getState().sort(order)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleClick(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.handleAdd}>
          <div><input name="content"/></div>
          <button >create</button> 
        </form>
      </div>
    )
  }
}

export default App