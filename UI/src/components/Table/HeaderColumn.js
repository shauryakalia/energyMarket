import React from 'react'
import PropTypes from 'prop-types';

// Component to display table header
const HeaderColumn = ({ label, filter, creditLimit, role }) => (
   ((filter==='buyer' && label!=='Plant Photos') || filter!=='buyer' && role=='admin' ||  role=='seller' || label!=='Update Credits' && role=='buyer') 
   && <div className={(label === "Delivery Period" || label === "Volume") ? 'cell small-3 hcol' : 'cell small-2 hcol'}>{label}</div>
    );

HeaderColumn.propTypes = {
    label: PropTypes.string.isRequired,
};

export default HeaderColumn;