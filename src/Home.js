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
          <input onKeyPress={this.handleNewMessage} />
        </section>
        <br />
        <section className='col s8'>
          <ul className='collection'>
            {messages.list.map(m => <li className='collection-item'>
              <p>{m.text}</p>
              <Ratings icon='thumb_up' points={m.upPoints} />
              <span style={{ marginLeft: '48px' }}></span>
              <Ratings icon='thumb_down' points={m.downPoints} />

            </li>)}
          </ul>
        </section>
      </main>
    );
  }
}

export default Home;

const Ratings = ({ points, icon }) => (
  <span style={{ position: 'relative' }}>
    <span>{points}</span>
    <i className='handIcon material-icons'>{icon}</i>
  </span>
)

class Messages {
  @observable
  list
  constructor() {
    this.list = [new Message('hlo')];
  }
}
class Message {
  @observable
  text
  @observable
  upPoints
  @observable
  downPoints
  constructor(message) {
    this.text = message;
    this.upPoints = 0;
    this.downPoints = 0;
  }
}

const messages = new Messages();