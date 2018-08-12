import React from 'react'

class HeloWorld extends React.Component {
  constructor (props) {
    super(props)

    this.gameStartClick = this.gameStartClick.bind(this)
    this.goMainClick = this.goMainClick.bind(this)
    this.fightComputerClick = this.fightComputerClick.bind(this)
    this.comeOnComputerClick = this.comeOnComputerClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      screenState: 'main',
      value: ''
    }

    this.fightList = [
      {
        type: 'me',
        word: '안녕하세요...',
        meaning: ''
      },
      {
        type: 'com',
        word: '먼저 하거라... 어리석은 양이여...',
        meaning: ''
      }
    ]
  }

  gameStartClick () {
    this.setState({screenState: 'gameMain'})
  }

  goMainClick () {
    this.setState({screenState: 'main'})
  }

  fightComputerClick () {
    this.setState({screenState: 'fightComputer'})
  }

  comeOnComputerClick () {
    this.setState({screenState: 'fake'})
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  handleSubmit (event) {
    this.fightList.push({
      type: 'me',
      word: this.state.value,
      meaning: ''
    })
    this.setState({value: ''})
    event.preventDefault()
  }

  render () {
    const props = this

    return (
      <div>
        <Greeting {...props} />
      </div>
    )
  }
}

function GameStart (props) {
  return (
    <div className='container'>
      <div className='main'>
        <span className='xd'>Do You Join ?</span>
        <br />
        <span className='nuts'>by goocci</span>
        <br />
        <br />
      </div>
      <div className='gameStartBtnDiv'>
        <button id='gameStartBtn' onClick={props.goMainClick}>
          <span id='gameStartBtnText'>Go Main</span>
        </button>
        <button id='gameStartBtn' onClick={props.fightComputerClick}>
          <span id='gameStartBtnText'>Fight Computer</span>
        </button>
      </div>
    </div>
  )
}

function Main (props) {
  return (
    <div className='container'>
      <div className='main'>
        <span className='xd'>End Word</span>
        <br />
        <span className='nuts'>by goocci</span>
        <br />
        <br />
      </div>
      <div className='gameStartBtnDiv'>
        <button id='gameStartBtn' onClick={props.gameStartClick}>
          <span id='gameStartBtnText'>Game Start</span>
        </button>
      </div>
    </div>
  )
}

function FightComputer (props) {
  return (
    <div className='container'>
      <div className='main'>
        <span className='xd'>Hi! My Name Is Computer ^^</span>
        <br />
        <span className='nuts'>by goocci</span>
        <br />
        <br />
      </div>
      <div className='gameStartBtnDiv'>
        <button id='gameStartBtn' onClick={props.comeOnComputerClick}>
          <span id='gameStartBtnText'>Come On !! Computer</span>
        </button>
      </div>
    </div>
  )
}

function Fake (props) {
  const fightList = props.fightList
  const listItems = fightList.map((item, index) =>
    <li key={index} className={item.type}>
      {item.type}:
      {item.word} <br />
      {item.meaning}
    </li>
  )
  return (
    <div className='container'>
      <div className='fight-com'>
        {listItems}
      </div>
      <form className='word-input' onSubmit={props.handleSubmit}>
        <label>
          <input type='text' value={props.state.value} onChange={props.handleChange} />
        </label>
      </form>
    </div>
  )
}

function Greeting (props) {
  const screenState = props.state.screenState
  if (screenState === 'gameMain') return <GameStart {...props} />
  else if (screenState === 'main') return <Main {...props} />
  else if (screenState === 'fightComputer') return <FightComputer {...props} />
  else if (screenState === 'fake') return <Fake {...props} />
}

export default HeloWorld
