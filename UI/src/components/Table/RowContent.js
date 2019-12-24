import React from 'react';
import moment from 'moment'
import momentTz from 'moment'
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import Formsy from 'formsy-react';

// Custom Imports
import { colors } from '../../theme';
import TextField from '../../components/Forms/TextField';
import BackendServices from '../../Services/BackendServices';
import { timingSafeEqual } from 'crypto';
//import RppTimer from './RppTimer';
import Timer from './Timer';

const updateCost = (val) => {
  if (val === undefined) {
    val = 0;
  }

  let cval = parseFloat(val).toFixed(2);
  cval = numberWithCommas(cval);
  return '$' + cval;
}

const numberWithCommas = (x) => {
  if (x === undefined) {
    x = 0;
  }

  let parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

// Component to display accordion in table-row
class RowContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      datum: [],
      timer: '',
      initialResponseByTs: this.props.data.initialResponseBy,
      output_jsx: null,
      openLastBid: false,
      bidData: [],
    }
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onOpenLastBid = this.onOpenLastBid.bind(this);
  }

  onOpenModal = (e) => {
    this.setState({ openModal: true }, function () {
      var that = this;
      BackendServices.transactionRecord(JSON.parse(sessionStorage.getItem('user')).data.userId, this.props.data.id)
        .then(res => {
          this.setState({
            datum: res.data.data
          })
        }, error => {
          if (error.response) {
            that.creatAlert("error", "Error", `${error.response.data.message}`)
          } else {
            that.creatAlert("error", "Error", "Something went wrong. Please login again.")
          }
        });
    });
  };

  onCloseModal = () => {
    this.setState({ openModal: false, openLastBid: false });
  };


  onOpenLastBid = (e) => {
    this.setState({ openLastBid: true }, function () {
      var that = this;
      BackendServices.getUserLastBid(JSON.parse(sessionStorage.getItem('user')).data.userId, JSON.parse(sessionStorage.getItem('user')).data.role, this.props.data.id)
        .then(res => {
          this.setState({
            bidData: JSON.parse(sessionStorage.getItem('user')).data.role === 'seller' ? res.data.data : res.data.data[0]
          })
        }, error => {
          if (error.response) {
            that.creatAlert("error", "Error", `${error.response.data.message}`)
          } else {
            that.creatAlert("error", "Error", "Something went wrong. Please login again.")
          }
        });
    });
  }

  componentDidMount() {
    new Date().getTime() <= this.state.initialResponseByTs ?
      setTimeout(() => {
        this.setState({ output_jsx: this.getTimerInAction() })

      }, this.state.initialResponseByTs - new Date().getTime())
      :
      this.setState({ output_jsx: this.getTimerInAction() })
  }

  getTimerInAction = () => {
    var curr_ts = new Date().getTime();   //ts in msec
    var { initialResponseByTs } = this.state;  //ts in msec
    var updatedInitialResponseByTs = parseInt(this.state.initialResponseByTs) + (15 * 60 * 1000);// ts in msec
    if (curr_ts >= initialResponseByTs && curr_ts <= updatedInitialResponseByTs) {
      return <Timer timerCounts={updatedInitialResponseByTs - curr_ts} />
    }
    return null;
  }
  render() {
    console.log("datau:", this.state.dataum)
    const { data, open, timezoneForData, timezone } = this.props
    return (
      <div style={{ paddingLeft: '2%', backgroundColor: colors.white }}>
        <Modal open={this.state.openModal} onClose={this.onCloseModal} center>
          {this.state.datum.length === 0 ?
            <div className="grid-y">
              <div className="cell small-6 medium-8 large-10" style={{ color: colors.black, padding: '10%' }}>
                No data available for the request.
              </div>
            </div>
            :

            <div className="grid-x grid-padding-x paddingTop">
              <div className="cell text-color">
                <div className="cell small-6 align-left">
                  <table style={{ textAlign: 'center' }}>
                    <tr><th style={{ width: '150px' }}>REC Volume</th><th style={{ width: '150px' }}>REC Amount</th><th style={{ width: '150px' }}>Energy Volume</th><th style={{ width: '150px' }}>Energy Amount</th><th style={{ width: '150px' }}>Timestamp</th><th style={{ width: '150px' }}>Receipt Number</th></tr>
                    {this.state.datum.map((item, i) => (
                      <tr style={{ border: 'solid 1px black' }}>
                        <td style={{ border: 'solid 1px black', color: colors.navyBlue, }}>{item.RECVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}MWh</td>
                        <td style={{ border: 'solid 1px black', color: colors.navyBlue, }}>${item.RECAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td style={{ border: 'solid 1px black', color: colors.navyBlue, }}>{item.EnergyVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}MWh</td>
                        <td style={{ border: 'solid 1px black', color: colors.navyBlue, }}>${item.EnergyAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td style={{ border: 'solid 1px black', color: colors.navyBlue, }}>{momentTz.tz(moment(new Date(parseInt(item.timestamp))).format('')).format('YYYY-MM-DD HH:mm')}</td>
                        <td style={{ border: 'solid 1px black', color: colors.navyBlue, }}>{item.recieptNumber}</td>
                      </tr>
                    ))}
                  </table>
                </div></div></div>
          }
        </Modal >
        <Modal open={this.state.openLastBid} onClose={this.onCloseModal} center>
          {this.state.bidData.length === 0 ?
            <div className="grid-y">
              <div className="cell small-6 medium-8 large-10" style={{ color: colors.black, padding: '10%' }}>
                No data available for the request.
              </div>
            </div>
            :

            <div className="grid-x grid-padding-x paddingTop">
              <div className="cell text-color">
                <div className="cell small-6 align-left">
                  <table style={{ textAlign: 'center' }}>
                    <tr>{JSON.parse(sessionStorage.getItem('user')).data.role === 'admin' &&
                      <th style={{ width: '150px' }}>Company Name</th>}
                      <th style={{ width: '150px' }}>Energy Bid/MWh</th>
                      {this.props.RECVolume !== 0 && <th style={{ width: '150px' }}>REC Bid/MWh</th>}
                      <th style={{ width: '150px' }}>Energy Fee</th>
                      {data.RECVolume !== 0 && <th style={{ width: '150px' }}>REC Fee</th>}
                      <th style={{ width: '150px' }}>Total Bid/MWh</th></tr>

                    {JSON.parse(sessionStorage.getItem('user')).data.role === 'admin' && this.state.bidData.map((item, i) => (
                      <tr style={{ border: 'solid 1px black' }}>
                        <td style={{ border: 'solid 1px black', color: colors.navyBlue, }}>{item.companyName}</td>
                        <td style={{ border: 'solid 1px black', color: colors.navyBlue, }}>${item.energyValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        {this.props.RECVolume !== 0 && <td style={{ border: 'solid 1px black', color: colors.navyBlue, }}>${item.RECValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>}
                        <td style={{ border: 'solid 1px black', color: colors.navyBlue, }}>${data.energyFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>

                        {data.RECVolume !== 0 && <td style={{ border: 'solid 1px black', color: colors.navyBlue, }}>${data.RECFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>}
                        <td style={{ border: 'solid 1px black', color: colors.navyBlue, }}>${(parseFloat(item.totalValue) + parseFloat(data.energyFee) + parseFloat(data.RECFee)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                      </tr>
                    ))}

                    {JSON.parse(sessionStorage.getItem('user')).data.role === 'seller' && (
                      <tr style={{ border: 'solid 1px black' }}>
                        <td style={{ border: 'solid 1px black', color: colors.navyBlue, }}>${this.state.bidData.energyValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        {this.props.RECVolume !== 0 && <td style={{ border: 'solid 1px black', color: colors.navyBlue, }}>${this.state.bidData.RECValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>}
                        <td style={{ border: 'solid 1px black', color: colors.navyBlue, }}>${data.energyFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>

                        {data.RECVolume !== 0 && <td style={{ border: 'solid 1px black', color: colors.navyBlue, }}>${data.RECFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>}
                        <td style={{ border: 'solid 1px black', color: colors.navyBlue, }}>${(parseFloat(this.state.bidData.totalValue) + parseFloat(data.energyFee) + parseFloat(data.RECFee)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                      </tr>
                    )}
                  </table>
                </div></div></div>
          }
        </Modal >
        {open && <div className="grid-x grid-padding paddingBoth">
          <div className="cell small-6 align-left">
            <b>Primary Power Source:</b> <span style={{ color: colors.navyBlue }}>{data.primaryPowerSource}</span><br />
            <b>Shape:</b> <span style={{ color: colors.navyBlue }}>{data.shape}</span> <br />
            <b>Initial Response By: </b><span style={{ color: colors.navyBlue }}>
              {
                momentTz.tz(moment(new Date(parseInt(data.initialResponseBy))).format(''), timezone).format('YYYY-MM-DD HH:mm')
              }
              {' ' + timezoneForData}</span><br />
            {data.RECVolume !== 0 && <span><b>REC Volume:</b> <span style={{ color: colors.navyBlue }}>{data.RECVolume} MWh</span> <br /></span>}
            {(JSON.parse(sessionStorage.getItem('user')).data.role !== 'buyer' && JSON.parse(sessionStorage.getItem('user')).data.role !== 'admin') && (
              <span>
                <b>Energy Values: </b> <span style={{ color: colors.navyBlue }}>{data.zoneDetails.ICEdescription}</span><br />
              </span>)}
            {data.lastPaymentToSellerOn && JSON.parse(sessionStorage.getItem('user')).data.role === 'admin' &&
              (<div>
                <b>Last Payment To Seller: </b> <span style={{ color: colors.navyBlue }}>{moment.unix(data.lastPaymentToSellerOn / 1000).format('DD-MMMM-YYYY')} {timezoneForData} </span><br />
              </div>)}
            {data.RECAttribute && (<span><b>REC Attribute:</b> <span style={{ color: colors.navyBlue }}>{data.RECAttribute}</span> <br /></span>)}
            {JSON.parse(sessionStorage.getItem('user')).data.role !== 'seller' && (<div>
              <b>Total Estimate Energy Monthly Value:</b> <span style={{ color: colors.navyBlue }}>{data.totalEstimateEnergyMonthlyValue ? updateCost(data.totalEstimateEnergyMonthlyValue) : 0}</span> <br />
              <b>Total Estimate Energy Value:</b> <span style={{ color: colors.navyBlue }}>{data.totalEstimateEnergyValue ? updateCost(data.totalEstimateEnergyValue) : 0}</span>  <br />
              <span>
              <b >Maximum Hourly Peak: </b>
              <span style={{ color: colors.navyBlue }}>{data.maxHourPeak} kW </span> <br />
              </span>
              {data.RECVolume !== 0 &&
              <span>
              <b>Total Estimate REC Monthly Value:</b> <span style={{ color: colors.navyBlue }}>{data.totalEstimateRECMonthlyValue ? updateCost(data.totalEstimateRECMonthlyValue) : 0}</span>  <br />
              <b>Total Estimate REC Value:</b> <span style={{ color: colors.navyBlue }}>{data.totalEstimateRECValue ? updateCost(data.totalEstimateRECValue) : 0}</span>  <br />
              </span>}
            </div>)}
            {JSON.parse(sessionStorage.getItem('user')).data.role !== 'seller' && data.escrowDueBy &&
              (<div> <b>Escrow Payment due on: </b><span style={{ color: colors.navyBlue }}>{moment.unix(data.escrowDueBy / 1000).format('DD-MMMM-YYYY HH: mm')} {timezoneForData}</span> <br /></div>)}
          </div>
          <div className="cell small-3 align-left" >
            <u><b>Zone Details: </b></u><br />
            <ul>
              <li><b>ISO: </b> <span style={{ color: colors.navyBlue }}>{data.zoneDetails.ISO}</span><br /></li>
              <li><b>State: </b> <span style={{ color: colors.navyBlue }}>{data.zoneDetails.state}</span><br /></li>
              <li> <b>EDC: </b> <span style={{ color: colors.navyBlue }}>{data.zoneDetails.EDC}</span></li>
            </ul>
            <span style={{ display: data.escrowReciepts ? '' : 'none' }}>
              <b>Escrow Receipts: </b>
              <span style={{ color: colors.navyBlue }}>{data.escrowReciepts}</span> <br />
            </span>
            <span style={{ color: data.daysToDue && data.daysToDue < 5 ? 'red' : 'black', display: data.daysToDue ? '' : 'none' }}>
              <b >Escrow Due By: </b>
              <span style={{ color: colors.navyBlue }}>{data.daysToDue} days </span> <br />
            </span>
            {this.props.status === 'Initiated' &&
              <React.Fragment>
                <span>
                  <b >Energy Fee (In dollars): </b>
                  <span style={{ color: colors.navyBlue }}>$ {data.energyFee} </span> <br />
                </span>
                {this.props.data.RECVolume !== 0 && <span>
                  <b >REC Fee (In dollars): </b>
                  <span style={{ color: colors.navyBlue }}>$ {data.RECFee} </span> <br />
                </span>}
              </React.Fragment>
            }
            {data.recDetails !== "not included" &&
              (<span> <u><b>REC Details: </b></u><br />
                <ul>
                  <li> <b>State: </b> <span style={{ color: colors.navyBlue }}>{data.recDetails.state}</span><br /></li>
                  <li> <b>Type: </b> <span style={{ color: colors.navyBlue }}>{data.recDetails.RECType} ({data.recDetails.year})</span><br /></li></ul>
              </span>)}
          </div>
          <div className="cell small-3 align-right">
            {this.props.status !== 'Expired' && this.state.output_jsx}
            <button className="cell buttonProp" style={{ backgroundColor: 'cadetblue', borderRadius: '5px', }} onClick={e => { this.onOpenModal(e) }}> Transactions</button>
            <button className="cell buttonProp" style={{ backgroundColor: 'chocolate', borderRadius: '5px', display: JSON.parse(sessionStorage.getItem('user')).data.role === 'buyer' || this.props.filter === 'New' ? 'none' : '' }} onClick={e => { this.onOpenLastBid(e) }}>{JSON.parse(sessionStorage.getItem('user')).data.role === 'admin' ? 'All Bids' : 'Last Bid'}</button>

          </div>
        </div>}
      </div>
    )
  }
}

RowContent.propTypes = {
  data: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};

export default RowContent;