import React from 'react';
import Modal from 'react-responsive-modal';
import { colors } from '../../theme';

class MyModal extends React.Component {
    constructor(props) {
        super(props);
        this.updateCost = this.updateCost.bind(this);
        this.numberWithCommas = this.numberWithCommas.bind(this);
    }

    updateCost(val) {
        if(val === undefined) {
            val = 0;
        }

        let cval = val.toFixed(2);
        cval = this.numberWithCommas(cval);
        return cval;
    }

    numberWithCommas(x) {
        if(x === undefined) {
            x = 0;
        }

        let parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    render() {
       // console.log("hsajdhjhd",this.props.prevstate);
        return (
            <Modal open={this.props.prevstate.open} onClose={this.props.onCancel} center>
                <div className="grid-x app-content" style={{ border: colors.white }}>
                    <div className="cell small-12">
                        <div className="grid-y" style={{ paddingTop: '3%', paddingLeft: '11%', paddingRight: '11%' }}>
                            <div className="cell small-6 medium-8 large-2">
                                <h5 style={{ fontWeight: 'bold' }}>ESTIMATED VALUE FOR REQUEST POWER PURCHASE</h5>
                            </div>
                            <div className="cell small-6 medium-4 large-10 content" style={{marginTop: '8%'}}>
                                <h6 style={{ fontWeight: 'bold', margin: '2% 0' }}>Total Estimate Energy Monthly Value: ${this.updateCost(this.props.prevstate.data.totalEstimateEnergyMonthlyValue)}</h6>
                            </div>
                            <div className="cell small-6 medium-4 large-10 content">
                                <h6 style={{ fontWeight: 'bold', marginTop: '2%' }}>Total Estimate Energy Value: ${this.updateCost(this.props.prevstate.data.totalEstimateEnergyValue)}</h6>
                            </div>
                           {this.updateCost(this.props.prevstate.data.totalEstimateRECMonthlyValue)!=="0.00"?<div className="cell small-6 medium-4 large-10 content" style={{marginTop: '8%'}}>
                                <h6 style={{ fontWeight: 'bold', margin: '2% 0' }}>Total Estimate REC Monthly Value: ${this.updateCost(this.props.prevstate.data.totalEstimateRECMonthlyValue)}</h6>
                            </div>:null
                        }  
                           {this.updateCost(this.props.prevstate.data.totalEstimateRECValue)!=="0.00"? <div className="cell small-6 medium-4 large-10 content">
                                <h6 style={{ fontWeight: 'bold', marginTop: '2%' }}>Total Estimate REC Value: ${this.updateCost(this.props.prevstate.data.totalEstimateRECValue)}</h6>
                            </div>:null
                        }
                            <div className="cell small-6 medium-4 large-10 content" style={{ color: colors.regularGray, marginTop: '8%' }}>
                                <div style={{ display: 'flex', padding: '2%' }}>
                                    <div className="small-3">
                                        <button className="buttonStyle buttonBgCancel" style={{ width: "180px", height: "40px" }} onClick={this.props.onCancel}>CANCEL </button>
                                    </div>
                                    <div className="small-offset-2 small-3">
                                        <button className="buttonStyle buttonBgSubmit" style={{ width: "180px", height: "40px" }} onClick={this.props.confirmRPP}>CONFIRM </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Modal>

        );
    }

}

export default MyModal;