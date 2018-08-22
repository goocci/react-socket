import React from 'react'
import axios from 'axios'

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

    let value = this.state.value
    let endWod = value.substr(value.length - 1)
    this.setState({ value: '' })
    event.preventDefault()

    let that = this
    axios.get(`http://127.0.0.1:8080/scrape?endWord=${endWod}`)
      .then((response) => {
        console.log(response)
        that.fightList.push({
          type: 'com',
          word: response.data[0].word,
          meaning: response.data[0].meaning
        })

        that.setState({ value: '' })
      })
      .catch((error) => {
        console.log(error)
      })
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
  let name = ''
  let lastCharRemoved = ''
  let lastChar = ''
  const listItems = fightList.map((item, index) => {
    if (item.type === 'com') {
      name = ' 단어의 신 '
      lastCharRemoved = item.word.slice(0, item.word.length - 1)
      lastChar = item.word.slice(item.word.length - 1)
      return <li key={index} className={item.type}>
        [<span className='comName'>{name}</span>] <br />
        {lastCharRemoved}
        <span className='lastWord'>{lastChar}</span> <br />
        {item.meaning}
      </li>
    }

    if (item.type === 'me') {
      name = ' 허접 '
      lastCharRemoved = item.word.slice(0, item.word.length - 1)
      lastChar = item.word.slice(item.word.length - 1)
      return <li key={index} className={item.type}>
        [<span className='meName'>{name}</span>] <br />
        {lastCharRemoved}
        <span className='lastWord'>{lastChar}</span> <br />
        {item.meaning}
      </li>
    }
  })

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
