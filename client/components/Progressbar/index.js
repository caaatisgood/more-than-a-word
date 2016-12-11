import React, { Component } from 'react'
import classnames from 'classnames'
import Timer from '../../helpers/timer'
import style from '../../styles/Progressbar/progressbar.scss'

let timer

export default class Progressbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: this.props.active
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.active && nextProps.active) {
      this.setState({ active: true })
      timer = new Timer(() => {
        this.setState({
          active: false
        })
      }, (nextProps.second) * 1000 - 50)
    }

    if (!this.props.pause && nextProps.pause) {
      timer.pause()
    }

    if (this.props.pause && !nextProps.pause) {
      timer.resume()
    }
  }
  render() {
    const { active, second, pause } = this.props
    const duration = second + 's'
    const state = pause ? 'paused' : 'running'
    const inlineStyle = {
      WebkitAnimationDuration: duration,
      animationDuration: duration,
      WebkitAnimationPlayState: state,
      animationPlayState: state
    }
    const barClassName = classnames({
      [style.bar]: true,
      [style.active]: this.state.active
    })
    return (
      <div className={style.barWrap}>
        <div className={barClassName} style={inlineStyle}></div>
      </div>
    )
  }
}
