import React, { Component } from 'react'
import style from '../../styles/List/list.scss'

export default class List extends Component {
  render() {
    const { list } = this.props
    return (
      <div className={style.listWrap}>
        {
          Object.keys(list).map(key => {
            const {
              sentence: s,
              word: w
            } = list[key]
            const start = 0
            const end = s.length
            const head = s.substring(start, s.indexOf(w))
            const tail = s.substring(s.indexOf(w) + w.length, end)
            return (
              <div key={key} className={style.sentenceWrap}>
                <span className={style.head}>{head}</span>
                <span className={style.word}>{w}</span>
                <span className={style.tail}>{tail}</span>
              </div>
            )
          })
        }
      </div>
    )
  }
}
