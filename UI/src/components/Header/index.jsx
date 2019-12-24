import React from 'react';

// Custom Imports
import Navigation from '../Navigation';
import Clock from '../../components/Clock';

import { siteName, colors } from '../../theme';

import logo from '../../images/verde-blocks-logo_without_tagline.png';

// Class for page header
const Header = () => (
  <div className="header-container transition">
    <div id="hamBurgerID" className="hamburgerMenuPosition" onClick={() => {
      if (document.getElementsByClassName('hamChange') && document.getElementsByClassName('hamChange')[0]) {
        document.getElementsByClassName('hamChange')[0].classList.remove("hamChange");
      }
      else {
        document.getElementsByClassName('hamburgerMenuPosition')[0].classList.add("hamChange");
      }

      if (document.getElementsByClassName('displayMenuOff') && document.getElementsByClassName('displayMenuOff')[0]) {
        document.getElementsByClassName('displayMenuOff')[0].classList.remove('displayMenuOff');
      }
      else {
        document.getElementsByClassName('menu')[0].classList.add('displayMenuOff');
      }
    }}>
      <div className="hamburgerMenuIcon1"></div>
      <div className="hamburgerMenuIcon2"></div>
      <div className="hamburgerMenuIcon3"></div>
    </div>
    <div className="grid-x grid-padding-x" style={{ backgroundColor: colors.white }}>
      <div className="cell small-6">
        <ul className="header" style={{ siteName, backgroundColor: colors.white }}>
          <img alt="verde blocks" src={logo} className="logo" />
        </ul>
      </div>
      <div className="cell small-6 headerRightPanel">
      <div className="grid-x grid-padding-x" style={{ backgroundColor: colors.white, justifyContent: 'flex-end', paddingRight: '10%' }}>    <Clock /> </div>
        <ul className="menu displayMenuOff">
          <Navigation />
        </ul>
      </div>
    </div>

  </div>

);


export default Header;