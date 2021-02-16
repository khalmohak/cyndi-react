import React from 'react';

const staticSVG = (type) => {
  switch (type) {
    case "Exam":
      return (
        <img
          src='/static/cyndi_icon_exam.svg'
          className="logo"
          alt="cardHeader"
          width='100'
          height='125'
        />)
    case "Profile":
      return (
        <img
          src='/static/cyndi_icon_profile.svg'
          width='25'
          height='25'
        />)
    default:
      return (
        <img
          src='/static/exam.svg'
          className="logo"
          alt="cardHeader"
          width='100'
          height='125'
        />)
  }
}


export default staticSVG;
