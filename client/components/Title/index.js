import React, { Component } from 'react'
import style from '../../styles/App/title.scss'

export default class Title extends Component {
  render() {
    return (
      <div className={style.titleWrap}>
        <div className={style.en}>More Than a Word</div>
        <div className={style.tw}></div>
      </div>
    )
  }
}
