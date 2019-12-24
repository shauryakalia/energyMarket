import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { differenceInCalendarDays } from 'date-fns/esm';

const updateCost = (val) => {
    if (val === undefined) {
        val = 0;
    }

    let cval = val.toFixed(2);
    cval = numberWithCommas(cval);
    return cval;
}

const numberWithCommas = (x) => {
    if (x === undefined) {
        x = 0;
    }

    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

// Component to display Process Summary
const ProcessSummary = ({ data }) => (

    <div>
        <div className="grid-x grid-padding-x">
        </div>
        <div style={{ padding: '3%' }}>
            <div><span><b>Name:</b></span><span style={{ paddingLeft: '1%' }}>{data.customerName}</span></div>
            <div><span><b>PPA:</b></span><span style={{ paddingLeft: '1%' }}>{data.ppa}</span></div>
            <div><span><b>Delivery Time Period:</b></span><span style={{ paddingLeft: '1%' }}>{moment((data.deliveryTimeFrom)).format('MM-DD-YYYY HH:mm:ss')} {data.timezone ? data.timezone.label : ''}<b> To</b> {moment((data.deliveryTimeTo)).format('MM-DD-YYYY HH:mm:sm')} {data.timezone ? data.timezone.label : ''}</span></div>
            <div><span><b>Intial Response due by:</b> </span><span style={{ paddingLeft: '1%' }}> {moment((data.responseDate)).format('MM-DD-YYYY HH:mm:ss')} {data.timezone ? data.timezone.label : ''}</span></div>
            <div><span><b>Seller Priority:</b></span>{data.newSellerList.map((item, i) => {
                return <span key={Math.random()} style={{ paddingLeft: '1%' }}>{item}{i + 1 < data.newSellerList.length && <span>,</span>}</span>
            })}</div>
            <div><span><b>Wholesale Delivery Location ISO:</b></span><span style={{ paddingLeft: '1%' }}>{data.wholesaleISO ? data.wholesaleISO.value : ''}</span> </div>
            <div><span><b>Wholesale Delivery Location Zone:</b></span><span style={{ paddingLeft: '1%' }}>{data.wholesaleZone ? data.wholesaleZone.label : ''}</span> </div>
            <div><span><b>Shape (Automatic DA):</b></span>{data.value.map((item, i) => {
                return <span key={Math.random()} style={{ paddingLeft: '1%' }}>{item}{i + 1 < data.value.length && <span>,</span>}</span>
            })}</div>
            <div><span><b>Maximum Hourly Peak : </b></span><span style={{ paddingLeft: '1%' }}>{data.maxHourPeak} kW</span></div>
            <div><span><b>Primary Power Source :</b></span> <span style={{ paddingLeft: '1%' }}>{data.primaryPowerSource}</span></div>
            <div><span><b>Renewable Energy Attributes/Credit:</b></span> <span style={{ paddingLeft: '1%' }}>{data.renewableEnergyResource}</span></div>
            {data.renewableEnergyResource === 'Included' && <div>
                <div><span><b>Renewable Energy Attributes/Credit Type :</b></span> <span style={{ paddingLeft: '1%' }}>{data.renewableEnergyCredit}</span></div>
                <div><span><b>Renewable Energy Attributes/Credit Amount :</b></span> <span style={{ paddingLeft: '1%' }}>{data.RECVolume} MWh {}</span></div>
                <div><span><b>State:</b></span> <span style={{ paddingLeft: '1%' }}>{data.state ? data.state.label : ''}</span></div>
                <div><span><b>Type:</b></span> <span style={{ paddingLeft: '1%' }}>{data.type ? data.type.label : ''}</span></div>
                <div><span><b>Year:</b></span> <span style={{ paddingLeft: '1%' }}>{data.year ? data.year.label : ''}</span></div>

                <div><span><b>Total Estimated REC Monthly Value:</b></span> <span style={{ paddingLeft: '1%' }}>$ {updateCost(data.data.totalEstimateRECMonthlyValue)}</span></div>
                <div><span><b>Total Estimated REC Value:</b></span> <span style={{ paddingLeft: '1%' }}>$ {updateCost(data.data.totalEstimateRECValue)}</span></div>
            </div>}
            <div><span><b>Total Estimated Energy Monthly Value :</b></span> <span style={{ paddingLeft: '1%' }}>$ {updateCost(data.data.totalEstimateEnergyMonthlyValue)}</span></div>
            <div><span><b>Total Estimated Energy Value:</b></span> <span style={{ paddingLeft: '1%' }}>$ {updateCost(data.data.totalEstimateEnergyValue)}</span></div>

        </div>
    </div>
);

ProcessSummary.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ProcessSummary;