import React, { Component } from 'react';
import List from './List'
import './App.css';

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}
/*function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}*/
class App extends Component {
  state = this.props;
  //const omittedCard = omit(cardId, allCards);
  handleAdd = (id) => {
    const cardyCard = newRandomCard();
    console.log(cardyCard.id);
    const currentList = this.state.store.lists.map(list => {
      if (list.id === id) {
        return {
          ...list,
          cardIds: [...list.cardIds, cardyCard.id]
        };
      }
        return list;
    })


    /*this.setState({
      store: {
        lists: currentList,
        allcards: {
          ...this.state.store.allCards,
          [cardyCard.id]: cardyCard,
          
      }
    }})
    console.log(this.state);*/

  }
  
  handleDelete = (cardId) => {
    const updatedLists = this.state.store.lists.map(list => {
      list.cardIds = list.cardIds.filter(id => id !== cardId);
      return list
    });

    this.setState({
        store : {
          lists: updatedLists,
          allCards: this.state.store.allCards,
      }})
  }

  render() {
    const { store } = this.state;
    console.log(store);
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              handleDelete = {this.handleDelete}
              handleAdd = {this.handleAdd}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
