import React, { Component } from 'react';
import style from '../../styles/Question/question.scss'

export default class Question extends Component {
  render() {
    const {
      word,
      sentence,
      fade
    } = this.props
    const inlineStyle = {opacity: fade ? .2 : 1}
    return (
      <div className={style.questionWrap}>
        <div className={style.word} style={inlineStyle}>{word}</div>
        <div className={style.sentence} style={inlineStyle}>{sentence}</div>
      </div>
    )
  }
}
