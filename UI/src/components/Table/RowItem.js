
import React from 'react';
import moment from 'moment'
import momentTz from 'moment'
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import Formsy from 'formsy-react';
import Simplert from 'react-simplert';

//Custom Imports
import RowContent from './RowContent';
import TextField from '../../components/Forms/TextField';
import BackendServices from '../../Services/BackendServices';
import { PHOTO_URL } from '../../constant';

import { colors } from '../../theme';
import { th } from 'date-fns/esm/locale';

// Component to display items in table-row
class RowItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false, status: this.props.status,
      openModal: false,
      value: '',
      RECVolume: 0,
      RECAmount: 0,
      EnergyVolume: 0,
      EnergyAmount: 0,
      RECValue: 0,
      creditAvailable: this.props.creditAvailable,
      creditLimit: this.props.creditLimit,
      creditModal: false,
      energyFee: 0,
      RECFee: 0,

    }
    this.handleChange = this.handleChange.bind(this);
    this.fundRPP = this.fundRPP.bind(this);
    this.initiateRPP = this.initiateRPP.bind(this);
    this.rejectRPP = this.rejectRPP.bind(this);
    this.bidRPP = this.bidRPP.bind(this);
    this.rebidRPP = this.rebidRPP.bind(this);
    this.resolveTie = this.resolveTie.bind(this);
    this.submitType = this.submitType.bind(this);
    this.transaction = this.transaction.bind(this);
    this.closeSimplert = this.closeSimplert.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.notifyBuyer = this.notifyBuyer.bind(this);
    this.creditModal = this.creditModal.bind(this);
    this.updateCredit = this.updateCredit.bind(this);
  }

  closeSimplert() {
    this.props.userTable ? this.setState({
      showAlert: false
    }) : this.props.updateRPPData();
  }

  // Function to be called to submit form
  submitType(e, loggedInUserId, id, sellerId, filter, daysToDue, role, buyerId, energyFee, RECFee) {
    this.setState({
      openModal: false
    })
    switch (this.state.status) {
      case "Created":
        return this.fundRPP(e, loggedInUserId, id);

      case "Funded":
        return this.initiateRPP(e, loggedInUserId, id);

      case "Initiated":
        return filter === "New" ? this.bidRPP(e, loggedInUserId, id, energyFee) : this.rebidRPP(e, loggedInUserId, id, energyFee, RECFee)

      case "Inprogress":
        if (role === 'admin') {
          this.transaction(e, loggedInUserId, id, sellerId);
        } else if (role === 'buyer' && daysToDue < 5) {
          return this.refundRPP(e, loggedInUserId, id);
        }
        break;
      default:
        return;
    }
  }


  // Function to be called on value change
  handleChange(value, name) {
    this.setState({
      [name]: value,
    });
  }

  updateCredit = (e, loggedInUserId, userId, role) => {
    e.preventDefault();
    this.setState({
      creditModal: false
    })
    BackendServices.updateCredit(loggedInUserId, role.toLowerCase(), userId, parseFloat(this.state.creditLimit), parseFloat(this.state.creditAvailable)).then((response) => {
      this.creatAlert("success", "Request Completed Successfully", `You have successfully updated the credits.`)
    })
      .catch((err) => {
        if (err.response) {
          this.creatAlert("error", "Error", `${err.response.data.message}`)
        } else {
          this.creatAlert("error", "Error", "Something went wrong. Please login again.")
        }
      });
  }

  bidRPP = (e, loggedInUserId, rppId, energyFee, RECFee) => {
    e.preventDefault();
    BackendServices.bidRPP(loggedInUserId, rppId, parseFloat(this.state.value), parseFloat(this.state.RECValue), parseFloat(this.state.value) + parseFloat(this.state.RECValue)).then((response) => {
      this.creatAlert("success", "Request Completed Successfully", `You have successfully placed the bid.`)
    })
      .catch((err) => {
        if (err.response) {
          this.creatAlert("error", "Error", `${err.response.data.message}`)
        } else {
          this.creatAlert("error", "Error", "Something went wrong. Please login again.")
        }
      });
  }

  rebidRPP = (e, loggedInUserId, rppId, energyFee, RECFee) => {
    e.preventDefault();
    BackendServices.rebidRPP(loggedInUserId, rppId, parseFloat(this.state.value), parseFloat(this.state.RECValue), parseFloat(this.state.value) + parseFloat(this.state.RECValue)).then((response) => {
      this.creatAlert("success", "Request Completed Successfully", `${response.data.message}`)
    })
      .catch((err) => {
        if (err.response) {
          this.creatAlert("error", "Error", `${err.response.data.message}`)
        } else {
          this.creatAlert("error", "Error", "Something went wrong. Please login again.")
        }
      });
  }

  fundRPP = (e, loggedInUserId, rppId) => {
    e.preventDefault();
    BackendServices.fundRPP(loggedInUserId, rppId, this.state.value).then((response) => {
      this.creatAlert("success", "Request Completed Successfully", `${response.data.message}`)
    })
      .catch((err) => {
        if (err.response) {
          this.creatAlert("error", "Error", `${err.response.data.message}`)
        } else {
          this.creatAlert("error", "Error", "Something went wrong. Please login again.")
        }
      });
  }

  refundRPP = (e, loggedInUserId, rppId) => {
    e.preventDefault();
    BackendServices.refundRPP(loggedInUserId, rppId, this.state.value).then((response) => {
      this.creatAlert("success", "Request Completed Successfully", `${response.data.message}`)
    })
      .catch((err) => {
        if (err.response) {
          this.creatAlert("error", "Error", `${err.response.data.message}`)
        } else {
          this.creatAlert("error", "Error", "Something went wrong. Please login again.")
        }
      });
  }

  initiateRPP = (e, loggedInUserId, rppId) => {
    e.preventDefault();
    BackendServices.initiateRPP(loggedInUserId, rppId, this.state.energyFee, this.state.RECFee).then((response) => {
      this.creatAlert("success", "Request Completed Successfully", `${response.data.message}`)
    })
      .catch((err) => {
        if (err.response) {
          this.creatAlert("error", "Error", `${err.response.data.message}`)
        } else {
          this.creatAlert("error", "Error", "Something went wrong. Please login again.")
        }
      });
  }

  rejectRPP = (e, loggedInUserId, rppId) => {
    this.onCloseModal();
    e.preventDefault();
    BackendServices.rejectRPP(loggedInUserId, rppId).then((response) => {
      this.creatAlert("success", "RPP Rejected Successfully", `${response.data.message}`)
    })
      .catch((err) => {
        this.creatAlert("error", "Error", `${err.response.data.message}`)
      });
  }

  resolveTie = (e, loggedInUserId, rppId) => {
    e.preventDefault();
    BackendServices.resolveTie(loggedInUserId, rppId).then((response) => {
      this.creatAlert("success", "Request Completed Successfully", `${response.data.message}`)
    })
      .catch((err) => {
        if (err.response) {
          this.creatAlert("error", "Error", `${err.response.data.message}`)
        } else {
          this.creatAlert("error", "Error", "Something went wrong. Please login again.")
        }
      });
  }

  notifyBuyer = (e, loggedInUserId, rppId, buyerId) => {
    e.preventDefault();
    BackendServices.notifyBuyer(loggedInUserId, rppId, buyerId).then((response) => {
      this.creatAlert("success", "Request Completed Successfully", `${response.data.message}`)
    })
      .catch((err) => {
        if (err.response) {
          this.creatAlert("error", "Error", `${err.response.data.message}`)
        } else {
          this.creatAlert("error", "Error", "Something went wrong. Please login again.")
        }
      });
  }

  transaction = (e, loggedInUserId, rppId, sellerId) => {
    e.preventDefault();
    BackendServices.transaction(loggedInUserId, rppId, this.state.RECVolume, this.state.EnergyVolume, this.state.RECAmount, this.state.EnergyAmount, sellerId, this.state.value).then((response) => {
      this.creatAlert("success", "Request Completed Successfully", `${response.data.message}`)
    })
      .catch((err) => {
        if (err.response) {
          this.creatAlert("error", "Error", `${err.response.data.message}`)
        } else {
          this.creatAlert("error", "Error", "Something went wrong. Please login again.")
        }
      });
  }

  onOpenModal = (e) => {
    this.setState({ openModal: true });
  };

  creditModal = (e) => {
    this.setState({ creditModal: true });
  };

  onCloseModal = () => {
    this.setState({ openModal: false, creditModal: false });
  };

  // Function to be called for toggling rows
  toggleRow(e) {
    this.setState({ open: !this.state.open });
  }

  getTimezone(timezone) {
    switch (timezone) {
      case "Pacific/Honolulu":
        return "HST";

      case "America/Anchorage":
        return "AKST";

      case "America/Los_Angeles":
        return "PST"

      case "America/Denver":
        return "MST"

      case "America / Chicago":
        return "CST"

      default:
        return "EST";
    }
  }

  // Function to get action type
  getActionType(role, status, filter, daysToDue, id, loggedInUserId, buyerId) {
    var button = null;
    switch (status) {
      case 'Created':
        button = (role === 'buyer' ?
          <button className="buttonProp buttonBg1"
            onClick={e => { this.onOpenModal(e) }}
          >Fund</button> : <button className="buttonProp buttonBg2" onClick={this.toggleRow.bind(this)}>View</button>);
        return button;

      case 'Funded':
        return (role === 'admin' ? <button className="buttonProp buttonBg3" onClick={e => { this.onOpenModal(e) }}>Initiate</button> : <button className="buttonProp buttonBg2" onClick={this.toggleRow.bind(this)}>View</button>);

      case 'Tied':
        return (role === 'buyer' ? <button className="buttonProp buttonBg3" onClick={e => { this.onOpenModal(e) }}>Choose Seller</button> : <button className="buttonProp buttonBg2" onClick={this.toggleRow.bind(this)}>View</button>);

      case 'Initiated':
        return (role === 'seller' ? filter === 'New' ? <button className="buttonProp buttonBg4"
          onClick={e => { this.onOpenModal(e) }}>Bid</button>
          : <button className="buttonProp buttonBg5" onClick={e => { this.onOpenModal(e) }}>Rebid</button>
          : <button className="buttonProp buttonBg2" onClick={this.toggleRow.bind(this)}>View</button>);

      case 'Inprogress':
        let view;
        if (role === 'admin') {
          if (daysToDue < 5) {
            view = <div><button className="buttonProp buttonBg5" onClick={e => { this.onOpenModal(e) }}>Payment</button> <button className="buttonProp buttonBg5" onClick={(e) => this.notifyBuyer(e, loggedInUserId, id, buyerId)}>Notify Buyer</button></div>;
          } else {
            view = <button className="buttonProp buttonBg5" onClick={e => { this.onOpenModal(e) }}>Payment</button>;
          }
        } else if (role === 'buyer' && daysToDue < 5) {
          view = <button className="buttonProp buttonBg1" onClick={e => { this.onOpenModal(e) }}>Re-Fund</button>
        } else {
          view = <button className="buttonProp buttonBg2" onClick={this.toggleRow.bind(this)}>View</button>;
        }
        return view;

      default:
        return (<button className="buttonProp buttonBg2" onClick={this.toggleRow.bind(this)}>View</button>)
    }
  }

  creatAlert(alertType, alertTitle, alertMessage) {
    this.setState({
      showAlert: true,
      alertType,
      alertTitle,
      alertMessage
    })
  }

  render() {
    const { open, openModal, creditModal } = this.state
    const { id, deliveryTimeFrom, deliveryTimeTo, volume, role, filter, loggedInUserId, sellerId, daysToDue, buyerId, timezone, userTable, email, phone, companyName, address, signetAccount, contactName, plantPhotos, creditLimit, creditAvailable, userId, energyFee, RECFee } = this.props


    console.log("energyFee", energyFee)
    let classes, content = '', timezoneForData;
    if (open) {
      classes = 'open';
    }
    content = this.getActionType(role, this.state.status, filter, daysToDue, id, loggedInUserId, buyerId);
    timezoneForData = this.getTimezone(timezone)
    return (
      <div className={classes}>
        <Simplert
          showSimplert={this.state.showAlert}
          type={this.state.alertType}
          title={this.state.alertTitle}
          message={this.state.alertMessage}
          disableOverlayClick={true}
          onClose={this.closeSimplert}
        />
        <Modal open={creditModal} onClose={this.onCloseModal} center>
          <Formsy>
            <div className="grid-x grid-padding-x paddingTop">
              <div className="cell text-color" style={{ paddingTop: '2%' }}>
                <TextField id="CreditLimit" type="number" name="creditLimit" label="Credit Limit" value={this.state.creditLimit}
                  setValue={this.handleChange}
                  min='0'
                  required
                />
                <TextField id="CreditAvailable" type="number" name="creditAvailable" label="Credit Available" value={this.state.creditAvailable}
                  setValue={this.handleChange}
                  min='0'
                  required
                />
              </div>
            </div>
            <div className="cell small-6 medium-4 large-12 content" style={{ color: colors.regularGray }}>
              <div style={{ display: 'flex', padding: '2%' }}>
                <div className="small-3">
                  <button className="buttonStyle buttonBgCancel" style={{ width: "180px", height: "40px" }} onClick={(e) => { this.onCloseModal(e) }}>CANCEL </button>
                </div>
                <div className="small-3" style={{ paddingLeft: '2%' }}>
                  <button className="buttonStyle buttonBgSubmit" style={{ width: "180px", height: "40px" }} onClick={e => { this.updateCredit(e, loggedInUserId, userId, filter) }}>SUBMIT</button>
                </div>
              </div>
            </div>
          </Formsy>
        </Modal >
        <Modal open={openModal} onClose={this.onCloseModal} center>
          <Formsy>
            <div className="grid-x grid-padding-x paddingTop">
              <div className='small-6 text-color' style={{ paddingLeft: '2%' }}>
                <div> <b>Primary Power Source: </b>{this.props.primaryPowerSource}</div>
                <div> <b>Initial Response By: </b>{momentTz.tz(moment(new Date(parseInt(this.props.initialResponseBy))).format(''), timezone).format('YYYY-MM-DD HH:mm')} {timezoneForData}</div>
              </div>
              <div className='small-6 text-color'>
                <div> <b>Volume: </b>{volume / 1000} MWh</div>
                <div> <b>REC Volume: </b>{this.props.RECVolume} MWh</div>
              </div>
              <div className="cell text-color" style={{ paddingTop: '2%' }}>

                {this.state.status === 'Funded' && (<React.Fragment>
                  <TextField id="energyFee" type="number" name="energyFee" label="Energy Fee (In dollars)" placeholder="Energy Fee"
                    min='0'
                    setValue={this.handleChange}
                    required
                  />
                  {this.props.RECVolume !== 0 && <TextField id="RECFee" type="number" name="RECFee" label="REC Fee (In dollars)" placeholder="REC Fee"
                    setValue={this.handleChange}
                    min='0'
                    required
                  />}
                </React.Fragment>
                )
                }
                {this.state.status !== "Funded" && <TextField id="escrowReciepts" type="text" name="value" label={this.state.status === "Created" || this.state.status === "Inprogress" ? "Receipt Number" : "Energy Bid Value (In dollars)"} placeholder={this.state.status === "Created" ? "Escrow Receipt" : "Enter Value"}
                  setValue={this.handleChange}
                  validations={{ matchRegexp: /^(?=.*?[1-9])\d+(\.\d+)?$/ }}
                  validationErrors={{
                    matchRegexp: 'Please enter valid input',
                  }}
                  required
                />}
                {(this.state.status === "Initiated" && this.props.RECVolume !== 0) ? <TextField id="RECValue" type="text" name="RECValue" label="REC Bid Value (In dollars)" placeholder="Enter Value"
                  setValue={this.handleChange}
                  required
                /> : ''}
                {JSON.parse(sessionStorage.getItem('user')).data.role === 'seller' && (<div>
                  <div ><b>Energy fee (In dollars): {energyFee}</b></div>
                  {this.props.RECVolume !== 0 && <div ><b>REC fee (In dollars): {RECFee}</b></div>}
                  <div style={{ borderTop: 'solid 1px black', marginTop: '3%', paddingTop: '1%' }}> <h4><b>Total Value (In dollars):</b> {this.state.value && this.state.RECValue ? parseFloat(this.state.value) + parseFloat(this.state.RECValue) + parseFloat(energyFee) + parseFloat(RECFee) : this.state.value ? parseFloat(this.state.value) + parseFloat(energyFee) + parseFloat(RECFee) : this.state.RECValue ? parseFloat(this.state.RECValue) + parseFloat(energyFee) + parseFloat(RECFee) : null}  </h4></div>
                </div>
                )}
                {(this.state.status === "Inprogress") && JSON.parse(sessionStorage.getItem('user')).data.role !== 'buyer' && (<div>
                  <TextField id="RECAmount" type="number" name="RECAmount" label="REC Amount" placeholder="REC Amount"
                    setValue={this.handleChange}
                    min='0'
                    required
                  />
                  <TextField id="EnergyAmount" type="number" name="EnergyAmount" label="Energy Amount" placeholder="Energy Amount"
                    min='0'
                    setValue={this.handleChange}
                    required
                  />
                  <TextField id="RECVolume" type="number" name="RECVolume" label="REC Volume" placeholder="REC Volume"
                    setValue={this.handleChange}
                    min='0'
                    required
                  />
                  < TextField id="EnergyVolume" type="number" name="EnergyVolume" label="Energy Volume" placeholder="Energy Volume"
                    setValue={this.handleChange}
                    rpp={true}
                    min='0'
                    required
                  />

                </div>)
                }
              </div>
              <div className="cell small-6 medium-4 large-12 content" style={{ color: colors.regularGray }}>
                <div style={{ display: 'flex', padding: '2%' }}>
                  <div className="small-offset-5 small-3">
                    <button className="buttonStyle buttonBgCancel" style={{ width: "180px", height: "40px" }} onClick={(e) => { this.state.status === "Funded" ? this.rejectRPP(e, loggedInUserId, id) : this.onCloseModal(e) }}>{this.state.status === "Funded" ? 'REJECT RPP' : 'CANCEL'} </button>
                  </div>
                  <div className="small-3" style={{ paddingLeft: '2%' }}>
                    <button className="buttonStyle buttonBgSubmit" style={{ width: "180px", height: "40px" }} onClick={e => { this.submitType(e, loggedInUserId, id, sellerId, filter, daysToDue, role, buyerId, energyFee, RECFee) }}>{this.state.status === "Funded" ? 'ACCEPT RPP' : 'SUBMIT'} </button>
                  </div>
                </div>
              </div>
            </div>
          </Formsy>
        </Modal >
        {!userTable ? (<React.Fragment>
          <div className="grid-x grid-padding-x heading">
            <div className="cell small-2 col cursorHand" onClick={this.toggleRow.bind(this)}> {id}</div>
            <div className="cell small-3 col cursorHand" onClick={this.toggleRow.bind(this)}>
              {
                momentTz.tz(moment(new Date(parseInt(deliveryTimeFrom))).format('YYYY-MM-DD'), timezone).format('YYYY-MM-DD HH:mm')
              }  to  {
                momentTz.tz(moment(new Date(parseInt(deliveryTimeTo))).format('YYYY-MM-DD'), timezone).format('YYYY-MM-DD HH:mm')} {timezoneForData}</div>
            <div className="cell small-3 col cursorHand" onClick={this.toggleRow.bind(this)}>  {volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} kWh ({(volume / 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} MWh)</div>
            <div className="cell small-2 col cursorHand" onClick={this.toggleRow.bind(this)}>{this.state.status === 'Inprogress' ? 'In Progress' : this.state.status}</div>
            <div className="cell small-2 col">{content}</div>
          </div>
          <RowContent open={open} data={this.props} timezoneForData={timezoneForData} timezone={timezone} filter={filter} status={this.state.status} />
          {this.props.children}
        </React.Fragment>) :
          <div className="grid-x grid-padding-x heading">
            <div className="cell small-2 col"> {email}</div>
            <div className="cell small-2 col">
              {address}
            </div>
            <div className="cell small-2 col"> {contactName}</div>
            <div className="cell small-2 col">{phone}</div>
            <div className="cell small-2 col">{signetAccount}</div>
            <div className="cell small-2 col">{companyName}</div>
            <div className="cell small-2 col">{creditAvailable}</div>
            <div className="cell small-2 col">{creditLimit}</div>
            {filter.toLowerCase() === 'seller' && <div className="cell small-2 col">{plantPhotos ?
              plantPhotos.map((i) => {
                return <a href={`${PHOTO_URL}uploads/${i}`} target="_blank" style={{ marginLeft: 'auto', marginRight: 'auto' }}
                > <h6 style={{ fontWeight: 'bold', }}>{i}</h6></a>
              })
              : 'No photo available'}
            </div>

            }
            {role === 'admin' && <div className="cell small-2 col">    <button className="buttonProp buttonBg1"
              onClick={e => { this.creditModal(e) }}
            >Update Limit</button> </div>}
          </div>}
      </div >
    )
  }
}

RowItem.propTypes = {
  id: PropTypes.number.isRequired,
  deliveryTimeFrom: PropTypes.string.isRequired,
  deliveryTimeTo: PropTypes.string.isRequired,
  volume: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};
export default RowItem;
