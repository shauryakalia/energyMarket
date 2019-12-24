import React from 'react';
import { Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import PropTypes from 'prop-types';

// Custom Imports
import { colors } from '../../theme';

// Class for carousel items component
const SlideItem = ({
    imgSrc, index, title,
}) => (
        < Slide index={index} >
            <div className="grid-x">
                <div className="cell small-5">
                    <div className="grid-y" style={{ margin: '15% 18% 0 35%' }}>
                        <div className="cell small-6 medium-8 large-2" style={{ color: colors.green, paddingTop: '2%' }}>
                            <h5>{title}</h5>
                        </div>
                    </div>
                </div>
                <div className="cell small-7" style={{ padding: '5% 0%' }}>
                    <ul>
                        <img src={imgSrc} alt="sample1" />
                    </ul>
                </div>
            </div>
        </Slide >
    );

SlideItem.propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
};

export default SlideItem;
