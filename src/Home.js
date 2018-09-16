import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import './Home.css';

@observer
class Home extends React.Component {

  constructor(props) {
    super(props);
    if (props.state && props.state.list && props.state.list.forEach) {
      props.state.list.forEach(m => {
        let message = new Message(m.text, m.upPoints, m.downPoints);
        messages.list.push(message);
      })
    }
  }

  handleNewMessage = e => {
    if (e.key === 'Enter') {
      messages.list.push(new Message(e.target.value));
      e.target.value = '';
      console.log(messages)
    }
  }

  incrementPoints = message => {
    message.upPoints++;
    this.saveState()
  }

  decrementPoints = message => {
    message.downPoints++;
  }

  saveState = () => {
    fetch('/api/state', {
      method: "POST",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: "same-origin",
      body: JSON.stringify(messages)
    })
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
              <Ratings onClick={() => this.incrementPoints(m)} icon='thumb_up' points={m.upPoints} />
              <span style={{ marginLeft: '48px' }}></span>
              <Ratings onClick={() => this.decrementPoints(m)} icon='thumb_down' points={m.downPoints} />

            </li>)}
          </ul>
        </section>
      </main>
    );
  }
}

export default Home;

const Ratings = ({ points, icon, onClick }) => (
  <span onClick={onClick} style={{ position: 'relative' }}>
    <span>{points}</span>
    <i className='handIcon material-icons'>{icon}</i>
  </span>
)

class Messages {
  @observable
  list
  constructor() {
    this.list = [];
  }
}
class Message {
  @observable
  text
  @observable
  upPoints
  @observable
  downPoints
  constructor(message, upPoints = 0, downPoints = 0) {
    console.log(message, upPoints, downPoints)
    this.text = message;
    this.upPoints = upPoints;
    this.downPoints = downPoints;
  }
}

const messages = new Messages();