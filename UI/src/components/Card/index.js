import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// Custom Imports
import { colors } from '../../theme';

// Component for cards on homepage
const Card = ({ title, to }) => (
    <div className="effect">
        <div className="card-container">
            <div style={{ backgroundColor: colors.lightBlue, width: '280px', height: '225px' }} />
            <div className="card-divider" style={{ background: colors.white }}>
                <NavLink to={to} style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    onClick={() => {
                        switch (to) {
                            case "/aboutus":
                                document.getElementsByClassName('active')[0].classList.remove('active');
                                document.getElementsByName('aboutus')[0].classList.add('active');
                                break;
                            case "/contact":
                                document.getElementsByClassName('active')[0].classList.remove('active');
                                document.getElementsByName('contact')[0].classList.add('active');
                                break;
                            case "/":
                                document.getElementsByClassName('active')[0].classList.remove('active');
                                document.getElementsByName('todo')[0].classList.add('active');
                                break;
                            default:
                                break;
                        }
                    }} > <h6 style={{ color: colors.green, fontWeight: 'bold', }}>{title}</h6></NavLink>
            </div>
        </div>
    </div>
);

Card.propTypes = {
    title: PropTypes.string,
    to: PropTypes.string,
};

export default Card;
