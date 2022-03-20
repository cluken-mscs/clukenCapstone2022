import { Component } from 'react';

import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component'
import './App.css';

class App extends Component {
// local state is information that only this component is aware of and can modify and read from
constructor() {
  // use 'super()' in order to call 'constructor' method from 'Component'
  super();

  this.state = {
    monsters: [],
    searchField: ''
  };
}

componentDidMount() {
  console.log('componentDidMount');
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => this.setState(
      () => {
          return {monsters: users};
      },
    )
  );
}

onSearchChange = (event) => {
  const searchField = event.target.value.toLocaleLowerCase();
  this.setState(
    () => {
    return { searchField };
    }
  );
}

render() {

    const { monsters, searchField,  } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = this.state.monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
    <div className="App">
      <SearchBox
        className='search-box'
        onChangeHandler={onSearchChange} 
        placeholder='search monster'/>
      <CardList monsters = {filteredMonsters} />
        
    </div>
    );
  }
}
export default App;
