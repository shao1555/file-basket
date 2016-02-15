import React from 'react';

class App extends React.Component {
  getInitialState() {
    return {
      name: 'World'
    }
  }
  render() {
    return (
      <div>
        Hello, {this.state.name}!
      </div>
    )
  }
}

React.reander(
  <App />,
  document.getElementById('container')
);
