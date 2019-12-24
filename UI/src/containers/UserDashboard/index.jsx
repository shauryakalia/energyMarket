import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import Formsy from 'formsy-react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import 'react-notifications/lib/notifications.css';
import io from 'socket.io-client';

// Custom Imports
import Table from '../../components/Table/Table';
import GetUserRPPDetails from '../../utils/actions/getuserrpp.action';
import { HOST_URL } from '../../constant';

import '../../components/Table/Table.css';
import { colors } from '../../theme';

let cols = [
  {
    icon: "",
    label: "RPP"
  },
  {
    icon: "",
    label: "Delivery Period"
  },
  {
    icon: "",
    label: "Volume"
  },
  {
    icon: "",
    label: "Status"
  },
  {
    icon: "",
    label: "Action"
  }
]

// Class for User dashboard
class UserDashboard extends React.Component {
  socket = io.connect(HOST_URL);// server ip+port
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      data: null,
      filter: JSON.parse(sessionStorage.getItem('user')).data.role === 'admin' ? 'Created' : 'New',
      limit: 4,
      offset: 0,
      user: JSON.parse(sessionStorage.getItem('user')),
    };
    this.changeValue = this.changeValue.bind(this);
    this.updateRPPData = this.updateRPPData.bind(this);
  }

  // Function to be called on value change of user type
  changeValue(value) {
    this.setState({ filter: value.value, offset: 0 }, function () {
      this.props.GetUserRPPDetails(this.state.user.data.userId, this.state.filter, this.state.user.data.role, 1);
    });
  }

  componentWillMount() {
    this.socket = io.connect(HOST_URL);
    var soc = this.socket;
    this.socket.on('connect', function (data) {
      console.log(data);
      soc.emit('register', { userId: JSON.parse(sessionStorage.getItem('user')).data.userId, userRole: JSON.parse(sessionStorage.getItem('user')).data.role });
    });
    this.socket.on('notification', obj => {
      NotificationManager.info('', obj.text, 450000)
      this.updateRPPData();
    });
    this.props.GetUserRPPDetails(this.state.user.data.userId, this.state.filter, this.state.user.data.role, 1);
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  updateRPPData() {
    this.setState({ offset: 0 });
    this.props.GetUserRPPDetails(this.state.user.data.userId, this.state.filter, this.state.user.data.role, 1);
  }

  setColor(e) {
    var status = e.target.classList.contains('active');

    e.target.classList.add(status ? 'inactive' : 'active');
  }

  // Function to be called to receive props
  componentWillReceiveProps(nextProps) {
    const { error } = nextProps.userRPPDetails;
    if (error) {
      if (error.data) {
        NotificationManager.error(error.data.error);
      } else {
        NotificationManager.error('Sorry, something went wrong');
      }
    } else {
      if (nextProps.userRPPDetails.data !== null) {
        this.setState({
          data: nextProps.userRPPDetails.data.answer,
          count: nextProps.userRPPDetails.data.count
        })
      }
    }
  }
  async checkNotifications() {
    await this.socket.on('notification', obj => {
      NotificationManager.info('', obj.text, 450000)
      this.updateRPPData();
    });
  }
  render() {
    let content = null
    let tableContent = null
    let pageLinks = ""
    let pageLinksCount = null
    let displayProp = "grid-x grid-padding align-right align-right-override displayOn"
    let calcWidth = 0
    const pageLinksSize = []


    if (this.state.data && this.state.data.length > 0) {
      pageLinksCount = (this.state.count > 2 ? Math.floor(this.state.count / 4) : 1);

      if (this.state.count > 2 && this.state.count % 4 > 0) {
        pageLinksCount = pageLinksCount + 1;
      }

      calcWidth = pageLinksCount * 50;

      if (pageLinksCount <= 1) {
        displayProp = "grid-x grid-padding align-right align-right-override displayOff";
      }
      else {
        displayProp = "grid-x grid-padding align-right align-right-override displayOn";
      }

      for (let i = 1; i <= pageLinksCount; i++) {
        pageLinksSize.push({
          index: i
        });
      }

      pageLinks = pageLinksSize.map((val) => {
        return (
          <div key={Math.random()} className='cell small-2'>
            <div className="pageLink">
              <button
                className={val.index === this.props.userRPPDetails.page ? 'active' : ''} onClick={(e) => {
                  this.setState({ offset: (val.index - 1) * 4 }, (e) => {
                    this.props.GetUserRPPDetails(this.state.user.data.userId, this.state.filter, this.state.user.data.role, val.index);
                  });
                }}>{val.index}</button>
            </div>
          </div>
        );
      });

      tableContent =
        <div className="grid-y">
          <div className="cell small-6 medium-8 large-10 container" style={{ color: colors.black, marginTop: '0.5%' }}>
            <Table loggedInUserId={this.state.user.data.userId} data={this.state.data} columns={cols} role={this.state.user.data.role} updateRPPData={this.updateRPPData} filter={this.state.filter} />
          </div>
          <div className={displayProp}>
            <div>
              <button className="previousButton" disabled={this.state.offset <= 0}
                onClick={() => {
                  this.setState({ offset: this.state.offset - this.state.limit }, () => {
                    this.props.GetUserRPPDetails(this.state.user.data.userId, this.state.filter, this.state.user.data.role, Math.ceil(this.state.offset / this.state.limit) + 1);
                  });
                }}>&lt;&lt; PREVIOUS</button>
            </div>
            <div className="grid-x pageLinkMargins" style={{ width: calcWidth + "px" }}>{pageLinks}</div>
            <div>
              <button className="previousButton nextButton" disabled={this.state.offset + this.state.limit === this.state.count || this.state.offset + this.state.limit > this.state.count}
                onClick={() => {
                  this.setState({ offset: this.state.offset + this.state.limit }, () => {
                    this.props.GetUserRPPDetails(this.state.user.data.userId, this.state.filter, this.state.user.data.role, Math.ceil(this.state.offset / this.state.limit) + 1);
                  });
                }}>NEXT &gt;&gt;</button>
            </div>
          </div>
          <div style={{
            display: 'flex', height: '35px', alignSelf: 'flex-end', marginRight: '1%'
          }}>
          </div>
        </div>
    }
    else {
      tableContent =
        <div className="grid-y">
          <div className="cell small-6 medium-8 large-10 container" style={{ color: colors.black }}>
            <div className="noDataExists">No data available for the request.</div>
          </div>
        </div>
    }

    if (this.state.user.data.role === 'admin') {
      content = <div className="cell small-10">
        <Formsy style={{ width: '200px' }} onSubmit={this.submit}
          onValid={this.enableButton} onInvalid={this.disableButton} className="rpp">
          <Select
            name="filter"
            placeholder={this.state.filter}
            onChange={this.changeValue}
            options={[
              { value: "Created", label: "Created", placeholder: "Created" },
              { value: "Funded", label: "Funded", placeholder: "Funded" },
              { value: "Initiated", label: "Initiated", placeholder: "Initiated" },
              { value: "Inprogress", label: "In Progress", placeholder: "Inprogress" },
              { value: "Expired", label: "Expired", placeholder: "Expired" },
              { value: "Rejected", label: "Rejected", placeholder: "Rejected" },
              { value: "Completed", label: "Completed", placeholder: "Completed" }
            ]} />
        </Formsy>
      </div>
    }
    else if (this.state.user.data.role === 'seller') {
      content = <div className="cell small-9">
        <Formsy style={{ width: '200px' }} onSubmit={this.submit}
          onValid={this.enableButton} onInvalid={this.disableButton} className="rpp">
          <Select
            name="filter"
            placeholder={this.state.filter}
            onChange={this.changeValue}
            options={[
              { value: "New", label: "New", placeholder: "New" },
              { value: "Pending", label: "Pending Bids", placeholder: "Pending" },
              { value: "Inprogress", label: "In-Progress", placeholder: "Inprogress" },
              { value: "Completed", label: "Completed", placeholder: "Completed" }
            ]} />
        </Formsy>
      </div>
    }
    else {
      content = <div className="cell small-9">
        <div style={{ background: 'white', border: 'solid 1px #0B175F', borderRadius: '5px', paddingLeft: '2%', paddingTop: '1%',width: '180px' }}>
          <NavLink to='/rpp' style={{ arginLeft: 'auto', marginRight: 'auto' }}> <h5 style={{ color: colors.navyBlue, fontWeight: 'bold', }}><i className="fa fa-tasks" aria-hidden="true"></i> Create RPP</h5></NavLink>
        </div>
      </div>
    }
    return (
      <div className="grid-x app-content" style={{ background: colors.lightGreen, border: colors.white }}>
        <div>
        </div>
        <div className="cell small-12">
          <div className="cell small-6 medium-8 large-2" style={{
            color: colors.black, paddingTop: '2%',
            paddingLeft: '5%'
          }}>
            <h5 style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>Hi {(this.state.user.data.role === 'admin' ? this.state.user.data.role : this.state.user.data.companyName)},</h5>
          </div>
          <div className="grid-y" style={{ margin: '2% 5% 0 5%' }}>
            <div className="grid-x app-content" style={{ background: colors.lightGreen, border: colors.white }}>
              {content}
              <div className="cell small-2">
                {/* <Clock /> */}
                {(this.state.user.data.role === 'admin') && <div style={{ background: 'white', border: 'solid 1px #0B175F', borderRadius: '5px', paddingLeft: '5%', width: '180px' }}>
                  <NavLink to='/register' style={{ marginLeft: 'auto', marginRight: 'auto' }}> <h5 style={{ color: colors.navyBlue, fontWeight: 'bold', }}><i className="fa fa-user-circle" aria-hidden="true"></i> Register User</h5></NavLink>
                </div>}
              </div>
            </div>
          </div>
          {tableContent}

        </div>
      </div>
    )
  }
}

UserDashboard.propTypes = {
  GetUserRPPDetails: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userRPPDetails: state.getUserRPPDetailsReducer,
});

export default connect(mapStateToProps, {
  GetUserRPPDetails,
})(UserDashboard);