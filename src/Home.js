import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import './Home.css';

@observer
class Home extends React.Component {

  handleNewMessage = e => {
    if (e.key === 'Enter') {
      messages.list.push(new Message(e.target.value));
      e.target.value = '';
      console.log(messages)
    }
  }

  render() {
    return (
      <main className='row'>
        <section className='col s8'>
          <h5>Enter a message to begin</h5>
          <label>Enter your message</label>
          <input onKeyPress={this.handleNewMessage}/>
        </section>
        <br/>
        <section className='col s12'>
          <ul className='collection'>
          {messages.list.map(m => <li className='collection-item'>{m.text}</li>)}
          </ul>
        </section>
      </main>
    );
  }
}

export default Home;

class Messages {
  @observable
  list
  constructor(){
    this.list = [];
  }
}
class Message {
  @observable
  text
  constructor(message) {
    this.text = message
  }
}

const messages = new Messages();