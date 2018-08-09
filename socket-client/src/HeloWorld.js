import React from 'react'

class HeloWorld extends React.Component {
  constructor (props) {
    super(props)

    this.gameStartClick = this.gameStartClick.bind(this)
    this.goMainClick = this.goMainClick.bind(this)
    this.fightComputerClick = this.fightComputerClick.bind(this)
    this.comeOnComputerClick = this.comeOnComputerClick.bind(this)
    this.state = {screenState: 'main'}
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
  return (
    <div className='container'>
      <div className='fakeImg'>
        <img src='https://i.pinimg.com/originals/49/3a/cf/493acf37eb8dc9279a1ecdf8e41e385a.gif' />
      </div>
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
