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
import BackendServices from '../../Services/BackendServices'
import GetUserRPPDetails from '../../utils/actions/getuserrpp.action';
import { HOST_URL } from '../../constant';

import '../../components/Table/Table.css';
import { colors } from '../../theme';

let cols = [
    {
        icon: "",
        label: "Email"
    },
    {
        icon: "",
        label: "Address"
    },
    {
        icon: "",
        label: "Contact Name"
    },
    {
        icon: "",
        label: "Contact Number"
    },
    {
        icon: "",
        label: "Signet Account"
    },
    {
        icon: "",
        label: "Company Name"
    },
    {
        icon: "",
        label: "Credit Available"
    },
    {
        icon: "",
        label: "Credit Limit"
    },
    {
        icon: "",
        label: "Plant Photos"
    },
    {
        icon: "",
        label: "Update Credits"
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
            filter: 'Seller',
            limit: 4,
            offset: 0,
            user: JSON.parse(sessionStorage.getItem('user')),
            users: []
        };
        this.changeValue = this.changeValue.bind(this);
    }

    // Function to be called on value change of user type
    changeValue(value) {
        this.setState({ filter: value.value, offset: 0 }, function () {
            BackendServices.getUsersByAdmin(JSON.parse(sessionStorage.getItem('user')).data.role,JSON.parse(sessionStorage.getItem('user')).data.userId, (this.state.filter))
                .then(res => {
                    console.log(res.data.data)
                    this.setState({
                        users: res.data.data
                    })
                }, error => {
                    if (error.response) {
                        this.creatAlert("error", "Error", `${error.response.data.message}`)
                    } else {
                        this.creatAlert("error", "Error", "Something went wrong. Please login again.")
                    }
                });
        });
    }

    componentWillMount() {
        BackendServices.getUsersByAdmin(JSON.parse(sessionStorage.getItem('user')).data.role,JSON.parse(sessionStorage.getItem('user')).data.userId, (this.state.filter === 'Seller' ? 'seller' : 'buyer'))
            .then(res => {
                console.log(res.data.data)
                this.setState({
                    users: res.data.data
                })
            }, error => {
                if (error.response) {
                    this.creatAlert("error", "Error", `${error.response.data.message}`)
                } else {
                    this.creatAlert("error", "Error", "Something went wrong. Please login again.")
                }
            });
    }

    render() {
        let content = null
        let tableContent = null

        if (this.state.users && this.state.users.length > 0) {
            tableContent =
                <div className="grid-y">
                    <div className="cell small-6 medium-8 large-10 container" style={{ color: colors.black, marginTop: '0.5%' }}>
                        <Table loggedInUserId={this.state.user.data.userId} data={this.state.users} columns={cols} role={this.state.user.data.role} filter={this.state.filter} userTable="true" />
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
        content = <div className="cell small-10">
            <Formsy style={{ width: '200px' }} onSubmit={this.submit}
                onValid={this.enableButton} onInvalid={this.disableButton} className="rpp">
                <Select
                    name="filter"
                    placeholder={this.state.filter}
                    onChange={this.changeValue}
                    options={[
                        { value: "seller", label: "Seller", placeholder: "Seller" },
                        { value: "buyer", label: "Buyer", placeholder: "Buyer" },
                    ]} />
            </Formsy>
        </div>
        return (
            <div className="grid-x app-content" style={{ background: colors.lightGreen, border: colors.white }}>
                <div>
                </div>
                <div className="cell small-12">
                    <div className="grid-y" style={{ margin: '2% 5% 0 5%' }}>
                        <div className="grid-x app-content" style={{ background: colors.lightGreen, border: colors.white }}>
                             { JSON.parse(sessionStorage.getItem('user')).data.role==='admin' &&  content}
                        </div>
                    </div>
                    {tableContent}
                </div>
            </div>
        )
    }
}

export default UserDashboard;