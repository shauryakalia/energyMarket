import React from 'react';
import PropTypes from 'prop-types';

// Custom Imports
import RowItem from './RowItem';
import HeaderColumn from './HeaderColumn';

// Component to display table
class Table extends React.Component {
  render() {
    const { columns, data, role, updateRPPData, loggedInUserId, userTable } = this.props
    let column = columns.map((item) => {
      return (<HeaderColumn filter={this.props.filter} key={Math.random()} label={item.label} userTable={userTable} role={role}/>);
    });
    let rows = data.map((item) => {
      return (<RowItem filter={this.props.filter} key={Math.random()} role={role} {...item} loggedInUserId={loggedInUserId} updateRPPData={updateRPPData} userTable={userTable}></RowItem>);
    });
    return (<div className="table">
      <div className="grid-x grid-padding-x header" ref="header">{column}<div className="shadow"></div></div>
      {rows}
    </div>);
  }
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  role: PropTypes.string.isRequired,
};

export default Table;