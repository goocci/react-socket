import React from 'react'

class HeloWorld extends React.Component {
  constructor (props) {
    super(props)

    this.gameStartClick = this.gameStartClick.bind(this)
    this.goMainClick = this.goMainClick.bind(this)
    this.state = {screenState: false}
  }

  gameStartClick () {
    this.setState({screenState: true})
  }

  goMainClick () {
    this.setState({screenState: false})
  }

  render () {
    const screenState = this.state.screenState
    let button

    if (screenState) {
      button = <GoMainButton onClick={this.goMainClick} />
    } else {
      button = <GameStartButton onClick={this.gameStartClick} />
    }

    return (
      <div>
        <Greeting screenState={screenState} />
        {button}
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
    </div>
  )
}

function Greeting (props) {
  const screenState = props.screenState
  if (screenState) {
    return <GameStart />
  }
  return <Main />
}

function GameStartButton (props) {
  return (
    <div className='gameStartBtnDiv'>
      <button id='gameStartBtn' onClick={props.onClick}>
        <span id='gameStartBtnText'>Game Start</span>
      </button>
    </div>
  )
}

function GoMainButton (props) {
  return (
    <div className='gameStartBtnDiv'>
      <button id='gameStartBtn' onClick={props.onClick}>
        <span id='gameStartBtnText'>Go Main</span>
      </button>
    </div>
  )
}

export default HeloWorld
