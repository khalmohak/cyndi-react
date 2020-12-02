import React, { Component } from 'react';
import {Typography} from '@material-ui/core'
// import './App.css';
 
class CardHeader extends Component {
  render() {
    return (
      
    <img
      src='/static/cardHeader.svg'
      className="logo"
      alt="cardHeader"
      width='550'
      height='175'
    />
    )
  }
}

export default CardHeader 