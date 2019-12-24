import axios from 'axios';

// Custom Imports
import { API_URL } from '../constant';

// Function to set token for headers
function getToken() {
    return sessionStorage.getItem('token');
}

// Function to request login
function login(user) {
    return axios({
        data: {
            email: user.email,
            password: user.password,
        },
        method: 'POST',
        url: `${API_URL}/login`,
    });
}

// Function to request change password
function setPassword(userId, oldPassword, newPassword) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        data: {
            oldPassword,
            newPassword,
        },
        method: 'POST',
        url: `${API_URL}/user/${userId}/setPassword`,
    });
}

// Function to get RPP associated to the user
function getUserRPP(id, filter, userType, page) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        method: 'GET',
        url: userType === 'buyer' ? `${API_URL}/${userType}/${id}/RPP?page=${page}&limit=4` : `${API_URL}/${userType}/${id}/RPP?filter=${filter}&page=${page}&limit=4`,
    });
}

// Function to get ISO associated to the user
function getUserISO(id) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        method: 'GET',
        url: `${API_URL}/user/${id}/ISO`,
    });
}

// Function to get transactions associated to the user
function transactionRecord(id, RPPId) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        method: 'GET',
        url: `${API_URL}/user/${id}/transaction/${RPPId}`
    });
}

// Function to get timezone associated to the user
function getUserTimezone(id) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        method: 'GET',
        url: `${API_URL}/user/${id}/timeZone`,
    });
}

// Function to get Zone by ISO associated to the user
function getUserZoneByISO(id, ISO) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        method: 'GET',
        url: `${API_URL}/user/${id}/zone/${ISO}`,
    });
}

// Function to get States associated to the user
function getUserStates(id) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        method: 'GET',
        url: `${API_URL}/user/${id}/states`,
    });
}

// Function to get RECTypes By State associated to the user
function getUserRECTypesByState(id, state) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        method: 'GET',
        url: `${API_URL}/user/${id}/RECTypes/${state}`,
    });
}

// Function to get RECTypes Years By State associated to the user
function getUserRECTypesYearsByState(id, state, RECType) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        method: 'GET',
        url: `${API_URL}/user/${id}/years/${RECType}/${state}`,
    });
}

// Function to register user
function registerUser(user) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        data: {
            role: user.role,
            email: user.email,
            companyName: user.companyName,
            address: user.address,
            contactName: user.contactName,
            title: user.title,
            phone: user.phone,
            signetAccount: user.signetAccount,
            creditLimit: parseFloat(user.creditLimit),
            creditAvailable: parseFloat(user.creditAvailable),
            id: user.id,
            agreementType: user.agreementType,
        },
        method: 'POST',
        url: `${API_URL}/admin/user`,
    });
}

// Function to estimate rpp
function estimateRPP(RECAmountType, id, deliveryTimeFrom, deliveryTimeTo, ISOzoneId, shape, volume, RECId, RECVolume, timezone) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        data: {
            RECAmountType,
            id: id,
            deliveryTimeFrom: deliveryTimeFrom * 1000,
            deliveryTimeTo: deliveryTimeTo * 1000,
            ISOzoneId: ISOzoneId,
            shape: shape,
            volume: parseFloat(volume),
            RECId: RECId,
            RECVolume: parseFloat(RECVolume),
            timezone: timezone
        },
        method: 'POST',
        url: `${API_URL}/buyer/estimateRPP`,
    });
}

// Function to create rpp
// function createRPP(id, deliveryTimeFrom, deliveryTimeTo, ISOzoneId, shape, volume, RECId, RECVolume, initialResponseBy,
//     totalEstimateValue, totalEstimateMonthlyValue, primaryPowerSource, timezone, sellerRanking, RECAttribute) {
//     return axios({
//         headers: {
//             'x-access-token': getToken(),
//             contentType: 'application/x-www-form-urlencoded',
//         },
//         data: {
//             id: id,
//             deliveryTimeFrom: deliveryTimeFrom * 1000,
//             deliveryTimeTo: deliveryTimeTo * 1000,
//             ISOzoneId: ISOzoneId,
//             shape: shape,
//             volume: volume,
//             RECId: RECId,
//             RECVolume: RECVolume,
//             initialResponseBy: initialResponseBy * 1000,
//             totalEstimateValue: totalEstimateValue,
//             totalEstimateMonthlyValue: totalEstimateMonthlyValue,
//             primaryPowerSource: primaryPowerSource,
//             timezone,
//             sellerRanking,
//             RECAttribute
//         },
//         method: 'POST',
//         url: `${API_URL}/buyer/createRPP`,
//     });
// }
function createRPP(id, deliveryTimeFrom, deliveryTimeTo, ISOzoneId, shape, volume, RECId, RECVolume, initialResponseBy,
    totalEstimateEnergyMonthlyValue, totalEstimateEnergyValue, totalEstimateRECMonthlyValue, totalEstimateRECValue, primaryPowerSource, timezone, sellerRanking, RECAttribute, maxHourPeak) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        data: {
            id: id,
            deliveryTimeFrom: deliveryTimeFrom * 1000,
            deliveryTimeTo: deliveryTimeTo * 1000,
            ISOzoneId: ISOzoneId,
            shape: shape,
            volume: volume,
            RECId: RECId,
            RECVolume: RECVolume,
            initialResponseBy: initialResponseBy * 1000,
            totalEstimateEnergyMonthlyValue: totalEstimateEnergyMonthlyValue,
            totalEstimateEnergyValue: totalEstimateEnergyValue,
            totalEstimateRECMonthlyValue: totalEstimateRECMonthlyValue,
            totalEstimateRECValue: totalEstimateRECValue,
            primaryPowerSource: primaryPowerSource,
            timezone,
            sellerRanking,
            RECAttribute,
            maxHourPeak
        },
        method: 'POST',
        url: `${API_URL}/buyer/createRPP`,
    });
}

// Function to initiate RPP
function initiateRPP(adminId, RPPId, energyFee, RECFee) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        data: {
            "id": adminId,
            "RPPId": RPPId,
            energyFee,
            RECFee
        },
        method: 'PUT',
        url: `${API_URL}/admin/initiateRPP`,
    });
}

// Function to reject RPP
function rejectRPP(adminId, RPPId) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        data: {
            "id": adminId,
            "RPPId": RPPId
        },
        method: 'PUT',
        url: `${API_URL}/admin/rejectRPP`,
    });
}

// Function to fund RPP
function fundRPP(adminId, RPPId, escrowReciepts) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        data: {
            id: adminId,
            RPPId: RPPId,
            escrowReciepts: escrowReciepts,
        },
        method: 'POST',
        url: `${API_URL}/buyer/fundRPP`,
    });
}

// Function to re-fund RPP
function refundRPP(adminId, RPPId, escrowReciepts) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        data: {
            id: adminId,
            RPPId: RPPId,
            escrowReciepts: escrowReciepts,
        },
        method: 'PUT',
        url: `${API_URL}/buyer/refundRPP`,
    });
}

// Function to bid RPP
function bidRPP(id, RPPId, value, RECValue, totalValue) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        data: {
            id: id,
            RPPId: RPPId,
            timestamp: Date.now(),
            energyValue: parseFloat(value),
            RECValue: parseFloat(RECValue),
            totalValue: parseFloat(totalValue)
        },
        method: 'POST',
        url: `${API_URL}/seller/bid`,
    });
}

// Function to re-bid RPP
function rebidRPP(id, RPPId, value, RECValue, totalValue) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        data: {
            RPPId: RPPId,
            timestamp: Date.now(),
            energyValue: parseFloat(value),
            RECValue: parseFloat(RECValue),
            totalValue: parseFloat(totalValue)
        },
        method: 'PUT',
        url: `${API_URL}/seller/${id}/bid`,
    });
}

// Function to resolveTie
function resolveTie(id, RPPId, sellerId) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        data: {
            id,
            RPPId,
            sellerId,
        },
        method: 'POST',
        url: `${API_URL}/buyer/resolveTie`,
    });
}

// Function to notifyBuyer
function notifyBuyer(id, RPPId, buyerId) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        data: {
            RPPId: RPPId,
            buyerId: buyerId,
        },
        method: 'PUT',
        url: `${API_URL}/admin/notifyBuyer`,
    });
}

// Function to seller payment 
function transaction(id, RPPId, RECVolume, EnergyVolume, RECAmount, EnergyAmount, toSellerId, recieptNumber) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        data: {
            RPPId: RPPId,
            timestamp: Date.now(),
            RECVolume: parseFloat(RECVolume),
            EnergyVolume: parseFloat(EnergyVolume),
            RECAmount: parseFloat(RECAmount),
            EnergyAmount: parseFloat(EnergyAmount),
            toSellerId,
            recieptNumber
        },
        method: 'POST',
        url: `${API_URL}/admin/${id}/transaction`,
    });
}

// Function to upload plant photos required for seller registration
function uploadDoc(id, userId, doc) {
    var formData = new FormData();
    doc.map(input => {
        return formData.append(`${input.name}`, input);
    })
    formData.append('id', id);
    formData.append('userId', userId);
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        data: formData,
        method: 'POST',
        url: `${API_URL}/admin/plantPhotos`,
    });
}

// Function to upload contracts by admin
function digitalVault(id, doc) {
    var formData = new FormData();
    doc.map(input => {
        return formData.append(`${input.name}`, input);
    })
    formData.append('id', id);
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        data: formData,
        method: 'POST',
        url: `${API_URL}/admin/digitalVault`,
    });
}

// Function to get getSellers associated to the user
function getSellers(id) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        method: 'GET',
        url: `${API_URL}/user/${id}/getSellers`,
    });
}

// Function to get digital vault associated to the admin
function getDigitalVault(id) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        method: 'GET',
        url: `${API_URL}/admin/${id}/digitalVault`,
    });
}

// Function to get registered users
// function getUsersByAdmin(id, userType) {
//     return axios({
//         headers: {
//             'x-access-token': getToken(),
//             contentType: 'application/x-www-form-urlencoded',
//         },
//         method: 'GET',
//         url: `${API_URL}/admin/${id}/${userType}`,
//     });
// }

// Function to get registered users
function getUsersByAdmin(role, id, userType) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        method: 'GET',
        url: role === 'admin' ? userType === 'buyer' ? `${API_URL}/admin/${id}/${userType}` : `${API_URL}/user/${id}/${userType}` : `${API_URL}/user/${id}/seller`,
    });
}

// Function to get registered users
function getUserLastBid(id, userType, rppId) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        method: 'GET',
        url: `${API_URL}/${userType}/${id}/bid/${rppId}`,
    });
}

// Function to update lmit 
function updateCredit(
    id,
    role,
    userId,
    creditLimit,
    creditAvailable) {
    return axios({
        headers: {
            'x-access-token': getToken(),
            contentType: 'application/x-www-form-urlencoded',
        },
        data: {
            role,
            userId,
            creditLimit,
            creditAvailable
        },
        method: 'PUT',
        url: `${API_URL}/admin/${id}/updateCredit`,
    });
}

export default {
    getUserISO,
    getUserZoneByISO,
    getUserRPP,
    getUserStates,
    getUserRECTypesByState,
    getUserRECTypesYearsByState,
    login,
    registerUser,
    estimateRPP,
    createRPP,
    initiateRPP,
    fundRPP,
    bidRPP,
    rebidRPP,
    resolveTie,
    setPassword,
    transaction,
    uploadDoc,
    digitalVault,
    rejectRPP,
    getSellers,
    notifyBuyer,
    refundRPP,
    getUserTimezone,
    transactionRecord,
    getDigitalVault,
    getUsersByAdmin,
    getUserLastBid,
    updateCredit
};
