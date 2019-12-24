import React from 'react';

// Custom Imports
import Copyright from '../Copyright';

import { colors, socialSitesIcons } from '../../theme';

// Compenent for displaying Page footer
const Footer = () => (
  <div className="grid-x" style={{
    backgroundColor: colors.gray, color: colors.lightGray, 

  }}>
    <div className="cell small-4">
      <div className="grid-y" style={{ margin: '15%' }}>
        <div className="cell small-4 medium-8 large-2">
          <h6 style={{ fontWeight: 'bold' }}>TELEPHONE NUMBER</h6>
        </div>
        <div className="cell small-4 medium-4 large-10">
          <p style={{ fontSize: '15px' }}>Toll free: 877-977-2636</p>
        </div>
      </div>
    </div>
    <div className="cell small-4">
      <div className="grid-y" style={{ margin: '15%' }}>
        <div className="cell small-4 medium-8 large-2">
          <h6 style={{ fontWeight: 'bold' }}>PHYSICAL ADDRESS</h6>
        </div>
        <div className="cell small-4 medium-4 large-10 copyright-text">
          <div>45 Commerce Drive</div>
          <div>Wymomissing, PA 19610</div>
        </div>
      </div>
    </div>
    <div className="cell small-4">
      <div className="grid-y" style={{ margin: '15%' }}>
        <div className="cell small-4 medium-8 large-2">
          <h6>
            {' '}
            <i className="fab fa-twitter " style={socialSitesIcons} />
            {' '}
            <i className="fab fa-facebook-f" style={socialSitesIcons} />
            {' '}
            <i className="fab fa-linkedin-in" style={socialSitesIcons} />
          </h6>
        </div>
        <div className="cell small-4 medium-4 large-10">
          <Copyright />
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
