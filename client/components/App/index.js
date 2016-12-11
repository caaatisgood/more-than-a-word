import React, { Component } from 'react'
import classnames from 'classnames'
import firebase from 'firebase'
import { Icon } from 'react-fa'
// import Title from '../Title'
// import List from '../List'
import Timer from '../../helpers/timer'
import Question from '../Question'
import Progressbar from '../Progressbar'
import style from '../../styles/App/app.scss'

let countdownTimer

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sentences: null,
      loading: true,
      pause: false,
      progress: {
        active: false,
        percent: 0,
        interval: 0
      },
      fadeQuestion: false,
      question: {
        time: 0,
        timePercent: 0,
        index: null,
        word: null,
        sentence: null
      }
    }
  }

  _randSentence() {
    this.setState({
      progress: {
        ...this.state.progress,
        active: false
      }
    })
    if (this.state.sentences) {
      const {
        question: { index },
        sentences
      } = this.state

      const count = Object.keys(sentences).length
      let rand
      let check = true
      while (check) {
        rand = Math.floor(Math.random() * count)
        if (rand !== index) check = false
      }

      const time = Math.floor(sentences[rand].sentence.length/10) * 1000

      this.setState({
        progress: {
          ...this.state.progress,
          active: true
        },
        question: {
          ...this.state.question,
          time,
          index: rand,
          word: sentences[rand].word,
          sentence: sentences[rand].sentence
        }
      })

      // start countdown
      countdownTimer = new Timer(() => {
        this._randSentence()
      }, time)
    }
  }

  _mouseDown() {
    countdownTimer.pause()
    this.setState({
      pause: true
    })
  }

  _mouseUp() {
    countdownTimer.resume()
    this.setState({
      pause: false
    })
  }

  _add(e) {

  }

  componentWillMount() {
    var config = {
      apiKey: 'AIzaSyAIrH2I8dzKZBrN6kqgd6RNLTeoROCJtvw',
      authDomain: 'more-than-a-word.firebaseapp.com',
      databaseURL: 'https://more-than-a-word.firebaseio.com',
      storageBucket: 'more-than-a-word.appspot.com',
      messagingSenderId: '129349084787'
    }
    firebase.initializeApp(config)

    const sentencesRef = firebase.database().ref('sentences')
    sentencesRef.on('value', data => {
      this.setState({
        sentencesRef,
        sentences: data.val(),
        loading: false
      })
      countdownTimer && countdownTimer.clear()
      this._randSentence()
    })
  }

  render() {
    const {
      pause,
      progress: {
        active,
        percent,
        interval
      },
      fadeQuestion,
      question: {
        time,
        sentence,
        word
      },
      loading
    } = this.state
    const addBtnWrapClassName = classnames({
      [style.addBtnWrap]: true,
      [style.show]: !loading
    })
    const addBtnClassName = classnames({
      [style.addBtn]: true,
      [style.activeBtn]: fadeQuestion
    })
    const spinnerClassName = classnames({
      [style.spinner]: true,
      [style.hide]: !loading
    })
    return (
      <div
        className={style.appWrap}
        onMouseDown={this._mouseDown.bind(this)}
        onMouseUp={this._mouseUp.bind(this)}>

        <Progressbar
          active={active}
          second={time/1000}
          pause={pause}/>

        {
          /*
          <div className={addBtnWrapClassName}>
            <button
              className={addBtnClassName}
              onClick={this._add.bind(this)}>
              +
            </button>
          </div>
          */
        }

        <div className={style.content}>
          <Icon name="spinner" spin className={spinnerClassName}/>

          <div className={style.questionWrap}>
            <Question
              word={word}
              sentence={sentence} 
              fade={fadeQuestion}/>
          </div>

        </div>

        <footer className={style.footer}>
          Designed by {' '}
          <a href="https://github.com/imrobinized" className={style.author}>
            @imrobinized
          </a>
        </footer>

      </div>
    )
  }
}
