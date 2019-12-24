import React from 'react';
import PropTypes from 'prop-types';

// Custom Imports
import { colors } from '../../theme';

// Function to be called for open external links
const onNavigation = (link) => {
    window.open(link, '_blank');
    return false;
}

// Component to display News and Events
const NewsAndEvent = ({ content, date, link, title }) => (
    <div className="" style={{ margin: '3%', width: '26%' }}>
        <div className="cell small-6 medium-8 large-2" style={{ color: colors.green }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', paddingBottom: '4%' }}>{title}</div>
            <div style={{ fontSize: '14px', textDecoration: 'underline', paddingBottom: '3%' }}>{date}</div>
        </div>

        <div className="cell small-6 medium-4 large-10" style={{ color: colors.navyBlue, paddingBottom: '3%' }}>
            {content}
        </div>
        <div className="cell small-6 medium-4 large-10" style={{ color: colors.red, textDecoration: 'underline' }}>
            <button
                type="button"
                className="link-button"
                onClick={() => onNavigation(link)}>
                Read More &gt; &gt;
</button>
        </div>
    </div >
);

NewsAndEvent.propTypes = {
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default NewsAndEvent;
