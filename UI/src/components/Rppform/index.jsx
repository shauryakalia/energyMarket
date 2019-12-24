import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import DatePicker from 'react-datepicker';
import "react-tabs/style/react-tabs.css";
import MyModal from '../Modal';
import Formsy from 'formsy-react';
import Simplert from 'react-simplert';
import moment from 'moment-timezone';
import moment1 from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import { compareAsc, subDays, addDays, addMonths, differenceInCalendarDays } from 'date-fns/esm';

// Custom Imports
import TextField from '../../components/Forms/TextField';
import MyRadioGroup from '../../components/Forms/RadioGroup';
import SelectField from '../../components/Forms/SelectField';
import MyMultiCheckboxSet from '../../components/Forms/MultiCheckboxSet';
import BackendServices from '../../Services/BackendServices';
import ProcessSummary from './ProcessSummary';

import { colors } from '../../theme';

// Class for Request Power Purchase Form component
class Rppform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calculatedVolumeKW: 0,
            calculatedVolumeMW: 0,
            canSubmit: false,
            checkboxValue: '',
            customerName: JSON.parse(sessionStorage.getItem('user')).data.companyName,
            data: {},
            isRECSpecificSelected: false,
            isRenewableEnergyAttribute: true,
            ISO: [],
            deliveryTimeFrom: '',
            deliveryTimeTo: '',
            open: false,
            ppa: 'Physical PPA',
            primaryPowerSource: 'Wind',
            RECState: [],
            RECType: [],
            RECYear: [],
            responseDate: new Date(),
            rppData: {},
            RECVolume: 0,
            RECAttribute: '',
            selectedIndex: 0,
            setCheckbox: false,
            shape: '',
            user: JSON.parse(sessionStorage.getItem('user')),
            value: [],
            volume: '',
            wholesaleISO: '',
            wholesaleZone: { value: null, label: 'Please Select' },
            state: '',
            type: { value: null, label: 'Please Select' },
            year: { value: null, label: 'Please Select' },
            submittedData: {},
            disableCSS: "cell buttonStyle buttonBgNext",
            disableState: true,
            sellers: [],
            sellerRanking: [],
            timezone: '',
            newSellerList: [],
            timezones: [],
            volumeMwh: 1,
            dateDisable: false,
            maxHourPeak: null,
            includedFields: [
                { key: "timezone", value: "Timezone" },
                { key: "deliveryTimeFrom", value: "Delivery Time From" },
                { key: "deliveryTimeTo", value: "Delivery Time To" },
                { key: "responseDate", value: "Response Date" },
                { key: "sellerRanking", value: "Seller Ranking" },
                { key: "wholesaleZone", value: "Wholesale Zone" },
                { key: "shape", value: "Shape" },
                { key: "primaryPowerSource", value: "Primary Power Source" },
                { key: "renewableEnergyResource", value: "Renewable Energy Resource" },
                { key: "RECAttribute", value: "REC Attribute" },
                { key: "renewableEnergyCredit", value: "Renewable Energy Credit" },
                { key: "state", value: "State" },
                { key: "type", value: "Type" },
                { key: "year", value: "Year" },
                { key: "volume", value: "Volume" },
                { key: "maxHourPeak", value: "Maximum Hourly Peak" },
            ]
        };
        this.confirmRPP = this.confirmRPP.bind(this);
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.enableNextButton = this.enableNextButton.bind(this);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeVolume = this.handleChangeVolume.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleDropdownforISO = this.handleDropdownforISO.bind(this);
        this.handleDropdownforState = this.handleDropdownforState.bind(this);
        this.handleDropdownforType = this.handleDropdownforType.bind(this);
        this.onPrevious = this.onPrevious.bind(this);
        this.setRadio = this.setRadio.bind(this);
        this.next = this.next.bind(this);
        this.calculatedVolume = this.calculatedVolume.bind(this);
        this.handleRenewableEnergyAttribute = this.handleRenewableEnergyAttribute.bind(this);
        this.handleRenewableCreditType = this.handleRenewableCreditType.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.closeSimplert = this.closeSimplert.bind(this);
        this.cancel = this.cancel.bind(this);
        this.handleDropdownforSellerPriority = this.handleDropdownforSellerPriority.bind(this);
        this.onPressCancel = this.onPressCancel.bind(this);
        this.dateCheck = this.dateCheck.bind(this);
    }

    // Function to be called on close of alert
    closeSimplert() {
        this.setState({
            showAlert: false
        });
        this.props.history.push('/dashboard')
    }

    // Function to be called on close of alert
    cancel() {
        this.setState({
            showAlert: false
        });
    }

    // Function to be called to create alert 
    creatAlert(alertType, alertTitle, alertMessage) {
        this.setState({
            showAlert: true,
            alertType,
            alertTitle,
            alertMessage
        })
    }

    // Function to be called on value change
    handleChange(value, name) {
        this.setState({
            [name]: value
        },
            function () {
                console.log("handle change", this.state[name]);
                let someArray = this.state.includedFields.filter(x => x.key != name)
                this.setState({
                    includedFields: someArray
                })
            });

    }

    // Function to be called to calculate volume
    handleChangeVolume(event) {
        this.setState({
            volume: event.target.value,
            volumeMwh: event.target.value / 1000,
            RECVolume: event.target.value / 1000,
        }, function () {
            console.log("in callback volume", this.state.volume)
            if (this.state.volume === '') {
                this.state.includedFields.push({ key: "volume", value: "Volume" })
                return;
            }
            this.calculatedVolume(this.state.value);
            let someArray = this.state.includedFields.filter(x => x.key !== "volume")
            this.setState({
                includedFields: someArray
            })
        });
    }

    // Function to be called on value change on handle Renewable Energy Attribute
    handleRenewableEnergyAttribute(value) {
        if (value === 'Included') {
            this.setState({
                renewableEnergyResource: value,
                isRenewableEnergyAttribute: false
            }, function () {
                let someArray = this.state.includedFields.filter(x => x.key !== "renewableEnergyResource")
                this.setState({
                    includedFields: someArray
                })
            })
        } else {
            this.setState({
                renewableEnergyResource: value,
                isRenewableEnergyAttribute: true,
                RECVolume: 0,
            }, function () {
                let someArray = this.state.includedFields.filter(x => x.key !== "renewableEnergyResource" && x.key !== "RECAttribute" && x.key !== "renewableEnergyCredit" && x.key !== "state" && x.key !== "type" && x.key !== "year")
                this.setState({
                    includedFields: someArray
                })
            })
        }
    }

    // Function to be called on value change on handle Renewable Credit Type
    handleRenewableCreditType(value) {
        if (value === 'Included') {
            this.setState({
                RECAttribute: value,
            }, function () {
                let someArray = this.state.includedFields.filter(x => x.key !== "RECAttribute")
                this.setState({
                    includedFields: someArray
                })
            })
        } else {
            this.setState({
                RECAttribute: value,
            }, function () {
                let someArray = this.state.includedFields.filter(x => x.key !== "RECAttribute")
                this.setState({
                    includedFields: someArray
                })
            })
        }
    }

    // Function to calculate amount of power requested
    calculatedVolume(value) {
        if (value.length > 1) {
            if (value.includes('5 X 8 (HE 1000 – HE 1700)')) {
                this.setState({
                    calculatedVolumeKW: (((5 * 8) + (5 * 8)) + (2 * 24)) * this.state.volume,
                    calculatedVolumeMW: ((((5 * 8) + (5 * 8)) + (2 * 24)) * this.state.volume) / 1000,
                    shape: 'WORKPEAKOFFPEAK',
                });
            } else {
                this.setState({
                    calculatedVolumeKW: ((5 * 16) + (5 * 8) + (2 * 24)) * this.state.volume,
                    calculatedVolumeMW: (((5 * 16) + (5 * 8) + (2 * 24)) * this.state.volume) / 1000,
                    shape: 'ONPEAKOFFPEAK',
                });
            }
        } else {
            switch (value[0]) {
                case '7 X 24':
                    return this.setState({
                        calculatedVolumeKW: 7 * 24 * this.state.volume,
                        calculatedVolumeMW: (7 * 24 * this.state.volume) / 1000,
                        shape: '24/7',
                    });
                case '5 X 16 (HE 0800 – HE 2300)':
                    return this.setState({
                        calculatedVolumeKW: 5 * 16 * this.state.volume,
                        calculatedVolumeMW: (5 * 16 * this.state.volume) / 1000,
                        shape: 'ONPEAK',
                    });
                case '5 X 8 & 2 X 24 (HE 2400 – HE 0700)':
                    return this.setState({
                        calculatedVolumeKW: ((5 * 8) + (2 * 24)) * this.state.volume,
                        calculatedVolumeMW: (((5 * 8) + (2 * 24)) * this.state.volume) / 1000,
                        shape: 'OFFPEAK',
                    });
                case '5 X 8 (HE 1000 – HE 1700)':
                    return this.setState({
                        calculatedVolumeKW: 5 * 8 * this.state.volume,
                        calculatedVolumeMW: (5 * 8 * this.state.volume) / 1000,
                        shape: 'WORKPEAK',
                    });
                case 'Intermittent':
                    return this.setState({
                        calculatedVolumeKW: this.state.volume,
                        calculatedVolumeMW: (this.state.volume) / 1000,
                        shape: 'INTERMITTENT',
                    });
                default:
                    return this.setState({
                        calculatedVolumeKW: this.state.volume,
                        calculatedVolumeMW: this.state.volume / 1000,
                        shape: '',
                    })
            }
        }
    }

    // Function to map shape to checkbox value
    handleCheckbox(value) {
        console.log('')
        this.setState({
            shape: value,
            value: value,
            calculatedVolumeKW: 0,
            calculatedVolumeMW: 0,
        }, function () {
            console.log("in callback", this.state.shape, this.state.value)
            if (this.state.shape.length == 0 && this.state.value.length == 0) {
                this.state.includedFields.push({ key: "shape", value: "Shape" })
                return;
            }
            this.calculatedVolume(this.state.value);
            console.log("included fields", this.state.includedFields);
            let someArray = this.state.includedFields.filter(x => x.key !== "shape")
            this.setState({
                includedFields: someArray
            })
        });
    }

    // Function to be called on change of ISO dropdown
    handleDropdownforISO(value, name) {
        this.setState({
            [name]: value,
            wholesaleZone: null
        }, function () {
            BackendServices.getUserZoneByISO(this.state.user.data.userId, value.value)
                .then((response) => {
                    this.setState({
                        Zone: response.data.data
                    })
                })
                .catch((err) => {
                    if (err.response) {
                        console.log(err);
                    } else {
                        this.creatAlert("error", "Error", "Something went wrong. Please login again.")
                    }
                });
        })
    }

    // Function to be called on change of dropdown of zone
    handleChange(value, name) {
        this.setState({
            [name]: value,
        }, function () {
            console.log("handle change", this.state[name]);
            // if(this.state[name])
            let someArray = this.state.includedFields.filter(x => x.key !== name)
            this.setState({
                includedFields: someArray
            })
        })
    }

    // Function to be called for choosing seller priority 
    handleDropdownforSellerPriority(value, name) {
        let newValue = [], newSellerList = [];
        newValue = value.map((item, i) => {
            return item.value
        })
        newSellerList = value.map((item, i) => {
            return item.label
        })
        this.setState({
            [name]: newValue,
            newSellerList: newSellerList,
        }, function () {
            let someArray = this.state.includedFields.filter(x => x.key !== name)
            this.setState({
                includedFields: someArray
            })
        })
    }

    // Function to be called on change of state dropdown
    handleDropdownforState(value, name) {
        this.setState({
            [name]: value,
            type: null,
            year: null
        }, function () {
            BackendServices.getUserRECTypesByState(this.state.user.data.userId, value.value)
                .then((response) => {
                    this.setState({
                        RECType: response.data.data
                    }, function () {
                        let someArray = this.state.includedFields.filter(x => x.key !== name)
                        this.setState({
                            includedFields: someArray
                        })
                    })
                })
                .catch((err) => {
                    if (err.response) {
                        this.creatAlert("error", "Error", "Something went wrong. Please login again.")
                    } else {
                        this.creatAlert("error", "Error", "Something went wrong. Please login again.")
                    }
                });
        })
    }

    // Function to be called on dropdown REC type
    handleDropdownforType(value, name) {
        this.setState({
            [name]: value,
            year: null
        }, function () {
            BackendServices.getUserRECTypesYearsByState(this.state.user.data.userId, this.state.state.value, value.value)
                .then((response) => {
                    this.setState({
                        RECYear: response.data.data
                    }, function () {
                        let someArray = this.state.includedFields.filter(x => x.key !== name)
                        this.setState({
                            includedFields: someArray
                        })
                    })
                })
                .catch((err) => {
                    if (err.response) {
                        this.creatAlert("error", "Error", "Something went wrong. Please login again.")
                    } else {
                        this.creatAlert("error", "Error", "Something went wrong. Please login again.")
                    }
                });
        })
    }

    // Function to be called on tab change
    onPrevious() {
        this.setState({ selectedIndex: 0 });
    }

    // Function to be called for opening modal
    onOpenModal = () => {
        this.setState({ open: true });
    };

    // Function to be called for closing modal
    onCloseModal = () => {
        this.setState({ open: false });
    };

    // Function to be called for switching to dashboard
    onPressCancel = () => {
        this.props.history.push('/dashboard');
    };

    // Function to be called for setting REC Inclusion
    setRadio = (value, name) => {
        if (value === 'Specific') {
            this.setState({ isRECSpecificSelected: true, RECVolume: this.state.RECVolume, [name]: "SPECIFIC" }, function () {
                let someArray = this.state.includedFields.filter(x => x.key !== name)
                this.setState({
                    includedFields: someArray
                })
            });
        }
        else {
            this.setState({ isRECSpecificSelected: false, RECVolume: this.state.volumeMwh, [name]: "MATCHRPP" }, function () {
                let someArray = this.state.includedFields.filter(x => x.key !== name)
                this.setState({
                    includedFields: someArray
                })
            });
        }
    };

    onCancel() {
        this.setState({ open: false });
    }

    // Function to be called for next page
    next() {

        if (this.state.includedFields.length > 0) {
            let string = "Please check the following fields:"
            if (this.state.includedFields.length >= 1)
                this.state.includedFields.map((item, i) => {
                    console.log('I',i)
                    string = i + 1 !== this.state.includedFields.length ? string + ' ' + item.value + ', ' : string + ' ' + item.value
                })
            alert(string)
        } else if (!this.state.wholesaleZone) {
            alert('Please select the Wholesale Zone')
        } else if (this.state.sellerRanking.length == 0) {
            alert('Please select the Seller ranking')
        }
        else if (this.state.renewableEnergyResource === "Included" && (this.state.state === '' || this.state.type === null || this.state.year === null)) {
            alert('Please fill Renewable Energy Attribute field');
        }
        else if (this.state.dateDisable) {
            alert('Please ensure that the minimum days between delivery period, be greater than a month.');
        }
        else {
            console.log(moment.tz(moment1(this.state.deliveryTimeFrom).format('YYYY-MM-DD'), this.state.timezone.value).format('X'))
            console.log(moment.tz(moment1(this.state.deliveryTimeTo).format('YYYY-MM-DD'), this.state.timezone.value).format('X'))
            BackendServices.estimateRPP(
                this.state.renewableEnergyCredit,
                this.state.user.data.userId,
                moment.tz(moment1(this.state.deliveryTimeFrom).format('YYYY-MM-DD'), this.state.timezone.value).format('X'),
                moment.tz(moment1(this.state.deliveryTimeTo).format('YYYY-MM-DD'), this.state.timezone.value).format('X'),
                this.state.wholesaleZone.value, this.state.shape, this.state.volumeMwh, this.state.year && this.state.year.value ? this.state.year.value : 0, this.state.RECVolume, this.state.timezone.value)
                .then((response) => {
                    this.setState({
                        data: response.data.data,
                        open: true,
                    })
                })
                .catch((err) => {
                    if (err.response) {
                        this.creatAlert("error", "Error", `${err.response.data.message}`)
                    } else {
                        this.creatAlert("error", "Error", "Something went wrong. Please login again.")
                    }
                });
        }
    }

    // Function to be called for submitting form
    submit() {
        console.log('rpp \state', this.state)
        console.log(moment.tz(moment1(this.state.deliveryTimeFrom).format('YYYY-MM-DD'), this.state.timezone.value).format('X'))
        console.log(moment.tz(moment1(this.state.deliveryTimeTo).format('YYYY-MM-DD'), this.state.timezone.value).format('X'))
        console.log(moment.tz(moment1(this.state.responseDate).format('YYYY-MM-DD'), this.state.timezone.value).format('X'))
        BackendServices.createRPP(this.state.user.data.userId,
            moment.tz(moment1(this.state.deliveryTimeFrom).format('YYYY-MM-DD'), this.state.timezone.value).format('X'),
            moment.tz(moment1(this.state.deliveryTimeTo).format('YYYY-MM-DD'), this.state.timezone.value).format('X'),
            this.state.wholesaleZone.value,
            this.state.shape,
            this.state.volume,
            this.state.year.value,
            this.state.RECVolume,
            moment.tz(moment1(this.state.responseDate).format('YYYY-MM-DD HH:mm:ss'), this.state.timezone.value).format('X'),
            this.state.data.totalEstimateEnergyMonthlyValue,
            this.state.data.totalEstimateEnergyValue,
            this.state.data.totalEstimateRECMonthlyValue,
            this.state.data.totalEstimateRECValue,
            this.state.primaryPowerSource,
            this.state.timezone.value,
            this.state.sellerRanking,
            this.state.RECAttribute,
            this.state.maxHourPeak
        )
            .then((response) => {
                this.creatAlert("success", "Request Completed", `${response.data.message}`)
            })
            .catch((err) => {
                if (err.response) {
                    this.creatAlert("error", "Error", `${err.response.data.message}`)
                } else {
                    this.creatAlert("error", "Error", "Something went wrong. Please login again.")
                }
            });
    }

    // Function to be called for confirming request power purchase
    confirmRPP() {
        this.onCloseModal();
        this.setState({
            selectedIndex: 1
        })
    }

    // Function to be called when form is valid
    enableButton() {
        this.setState({ canSubmit: true });
    }

    // Function to be called when form is invalid
    disableButton() {
        this.setState({ canSubmit: false });
    }

    // Function to be called for validating form
    enableNextButton() {
        let enableNext = this.state.customerName && this.state.ppa && this.state.deliveryTimeFrom && this.state.deliveryTimeTo && this.state.responseDate && this.state.wholesaleISO && (this.state.wholesaleZone && this.state.wholesaleZone.value) && (this.state.shape.length > 0) && this.state.primaryPowerSource && this.state.renewableEnergyResource;

        let included = this.state.RECAttribute && this.state.renewableEnergyCredit && this.state.state && this.state.type && this.state.year;

        if (enableNext === '' || enableNext === null || enableNext === undefined) {
            return true
        }
        else {
            if (this.state.renewableEnergyResource === 'Included' && (included === '' || included === null || included === undefined)) {
                return true
            }
            else {
                if (this.state.renewableEnergyCredit === 'SPECIFIC' && !this.state.RECVolume) {
                    return true
                }
                else {
                    return false
                }
            }
        }
    }

    // Functions to be called to set dates
    onChangedeliveryTimeFrom = date => this.setState({ deliveryTimeFrom: date }, function () {
        let someArray = this.state.includedFields.filter(x => x.key !== 'deliveryTimeFrom')
        this.setState({
            includedFields: someArray
        })
    })

    onChangedeliveryTimeTo = dateTo => {
        this.setState({ deliveryTimeTo: dateTo },
            function () {
                let someArray = this.state.includedFields.filter(x => x.key !== "deliveryTimeTo")
                this.setState({
                    includedFields: someArray
                })
                if (differenceInCalendarDays(
                    this.state.deliveryTimeTo,
                    this.state.deliveryTimeFrom) <= 30) {
                    alert('The delivery time period must be greater than a month.')
                } else {
                    this.setState({
                        dateDisable: false
                    })
                }
            })
    }

    dateCheck = dateresponse => {
        if (differenceInCalendarDays(
            this.state.deliveryTimeTo,
            this.state.deliveryTimeFrom) <= 30) {
            alert('The delivery time period must be greater than a month.')
            this.setState({
                dateDisable: true,
            })
        } else {
            this.setState({
                dateDisable: false,
            })
        }
    }

    onChangeResponseBy = dateresponse => {
        this.setState({ responseDate: dateresponse },
            function () {
                let someArray = this.state.includedFields.filter(x => x.key !== "responseDate")
                this.setState({
                    includedFields: someArray
                })
            })
    }

    componentWillMount() {
        BackendServices.getUserISO(this.state.user.data.userId)
            .then((response) => {
                this.setState({
                    ISO: response.data.data
                })
            })
            .catch((err) => {
                console.log(err);
            });
        BackendServices.getUserTimezone(this.state.user.data.userId)
            .then((response) => {
                this.setState({
                    timezones: response.data.data.timeZone
                })
            })
            .catch((err) => {
                if (err.response) {
                    this.creatAlert("error", "Error", `${err.response.data.message}`)
                } else {
                    this.creatAlert("error", "Error", "Something went wrong. Please login again.")
                }
            });

        BackendServices.getUserStates(this.state.user.data.userId)
            .then((response) => {
                this.setState({
                    RECState: response.data.data
                })
            })
            .catch((err) => {
                if (err.response) {
                    this.creatAlert("error", "Error", `${err.response.data.message}`)
                } else {
                    this.creatAlert("error", "Error", "Something went wrong. Please login again.")
                }
            });

        BackendServices.getSellers(this.state.user.data.userId)
            .then((response) => {
                this.setState({
                    sellers: response.data.data
                })
            })
            .catch((err) => {
                if (err.response) {
                    this.creatAlert("error", "Error", `${err.response.data.message}`)
                } else {
                    this.creatAlert("error", "Error", "Something went wrong. Please login again.")
                }
            });
    }

    render() {
        console.log("rpp", this.state)
        let check = this.enableNextButton()
        return (

            <div style={{ margin: '10px' }}>
                <Simplert
                    showSimplert={this.state.showAlert}
                    type={this.state.alertType}
                    title={this.state.alertTitle}
                    message={this.state.alertMessage}
                    disableOverlayClick={true}
                    onClose={this.state.alertType !== 'success' ? this.cancel : this.closeSimplert}
                />
                <MyModal prevstate={this.state} confirmRPP={this.confirmRPP} onCancel={this.onCloseModal} />
                <Tabs selectedIndex={this.state.selectedIndex}>
                    <TabList>
                        <Tab><h5 className="text-bold">I</h5><h5 className="text-bold"> REQUEST POWER</h5></Tab>
                        <Tab><h5 className="text-bold">II </h5><h5 className="text-bold">SUMMARY</h5></Tab>
                    </TabList>

                    <Formsy onSubmit={this.submit}
                        onValid={this.enableButton} onInvalid={this.disableButton} className="rpp">
                        <TabPanel>
                            <div style={{ background: '#0B175F', marginTop: '30px' }}>
                                <h4 style={{ color: colors.white, padding: '5px' }}>Request Power</h4>
                            </div>
                            <div className="grid-x grid-padding-x paddingTop">
                                <div className="small-3 cell text-color">
                                    <TextField id="customerName" type="text" name="customerName" label="Customer Name" placeholder='Customer Name'
                                        value={this.state.customerName}
                                        validations={{ matchRegexp: /^[a-zA-Z ]+$/ }}
                                        validationErrors={{ matchRegexp: 'Customer Name is not valid' }}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="grid-x grid-padding-x small-12 medium-12 large-12 paddingTop">
                                <div className="cell">
                                    <MyRadioGroup
                                        name="ppa"
                                        items={['Physical PPA', 'Virtual PPA']}
                                        setValue={this.setRadio}
                                        value={this.state.ppa}
                                        validations="isExisty" validationError="The field is required"
                                    />
                                </div>
                                <div className="line"></div>
                                <br />
                            </div>
                            <div className="grid-x grid-padding-x large-12 paddingTop">
                                <div className="cell small-12 medium-6 large-6">
                                    <div className="small-6 cell auto text-color text-bold">Delivery Time Period <span className='redHighlight'>*</span></div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="large-5">
                                            <DatePicker
                                                name='deliveryTimeFrom'
                                                selected={this.state.deliveryTimeFrom}
                                                onChange={this.onChangedeliveryTimeFrom}
                                                minDate={addDays(new Date(), 4)}
                                                maxDate={new Date('February 28, 2022 00:00:00')}
                                                isClearable={true}
                                                dateFormat="MM/dd/yyyy HH:mm"
                                                placeholderText="MM/DD/YYYY HH:mm"
                                                value={this.state.deliveryTimeFrom}
                                            />
                                        </div>
                                        <div className="large-2 text-bold" style={{ padding: '5px 15px' }}>To</div>

                                        <div className="large-5">
                                            <DatePicker
                                                name="deliveryTimeTo"
                                                onClickOutside={this.dateCheck}
                                                selected={this.state.deliveryTimeTo}
                                                onChange={this.onChangedeliveryTimeTo}
                                                minDate={addMonths(this.state.deliveryTimeFrom, 1)
                                                }
                                                maxDate={new Date('March 31, 2022 00:00:00')}
                                                isClearable={true}
                                                dateFormat="MM/dd/yyyy HH:mm"
                                                placeholderText="MM/DD/YYYY HH:mm"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="small-12 medium-6 large-6" style={{ display: 'flex' }}>
                                    <div>
                                        <div className="small-6 cell auto text-color text-bold">Initial Response Due by <span className='redHighlight'>*</span> <span style={{ fontSize: '9px' }}>(1)</span></div>
                                        <div className='small-2 cell auto'>
                                            <DatePicker
                                                name="responseDate"
                                                selected={this.state.responseDate}
                                                onChange={this.onChangeResponseBy}
                                                isClearable={true}
                                                dateFormat="MM/dd/yyyy HH:mm"
                                                minDate={new Date()}
                                                maxDate={subDays(this.state.deliveryTimeFrom, 2)}
                                                showTimeSelect
                                                placeholderText="MM/DD/YYYY HH:mm"
                                            />
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '15px', width: '285px', paddingLeft: '5%', paddingTop: '3.8%' }}>
                                        <div className='small-6'>
                                            <SelectField
                                                id="timezone"
                                                name="timezone"
                                                placeholder="Timezones"
                                                options={this.state.timezones}
                                                setValue={this.handleChange}
                                                value={this.state.timezone}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid-x grid-padding-x large-12 paddingTop">
                                <div className="cell small-12 medium-6 large-6">
                                    <div>
                                        <SelectField
                                            label="Seller Priority"
                                            id="sellerPriority"
                                            name="sellerRanking"
                                            placeholder="Please Select"
                                            options={this.state.sellers}
                                            setValue={this.handleDropdownforSellerPriority}
                                            isMulti={true}
                                            required />

                                    </div>
                                </div>
                                <div className="small-12 medium-6 large-6">
                                </div>
                            </div>
                            <br />
                            <div className="grid-x grid-padding-x small-up-2 medium-up-4 large-up-6">
                                <div className='cell auto text-color text-bold paddingBottom'>
                                    Wholesale Delivery Location
                            </div>

                            </div>
                            <div className="grid-x grid-padding-x small-up-2 medium-up-4 large-up-6 paddingTop">
                                <div className='cell auto'>
                                    <SelectField
                                        label="ISO"
                                        id="wholesaleISO"
                                        name="wholesaleISO"
                                        placeholder="Please Select"
                                        options={this.state.ISO}
                                        setValue={this.handleDropdownforISO}
                                        required />
                                </div>
                                <div className='cell auto'>
                                    <SelectField
                                        label="Zone"
                                        id="wholesaleZone"
                                        name="wholesaleZone"
                                        placeholder="Please Select"
                                        options={this.state.Zone}
                                        setValue={this.handleChange}
                                        value={this.state.wholesaleZone}
                                        required />
                                </div>
                                <div className='cell auto'>

                                </div>
                                <div className='cell auto'>
                                </div>
                            </div>
                            <br />
                            <div className="line"></div>
                            <div className="grid-x grid-padding-x small-up-2 medium-up-4 large-up-6">
                                <div className='cell auto text-color text-bold paddingBottom'>
                                    Shape (Automatic DA) <span className='redHighlight'>*</span>  <span style={{ fontSize: '9px' }}>(2)</span>
                                </div>

                            </div>
                            <div className="grid-x grid-padding-x small-up-2 medium-up-4 large-up-6">
                                <div className='cell auto'>
                                    <MyMultiCheckboxSet
                                        name="shape"
                                        title="Shape(Automatic DA)**"
                                        cmp={(a, b) => JSON.stringify(a) === JSON.stringify(b)}
                                        items={[
                                            '7 X 24', `5 X 16 (HE 0800 – HE 2300)`, '5 X 8 & 2 X 24 (HE 2400 – HE 0700)', '5 X 8 (HE 1000 – HE 1700)', 'Intermittent'
                                        ]}
                                        setValue={this.handleCheckbox}
                                        setCheckbox={this.state.setCheckbox}
                                    />
                                </div>
                            </div>
                            <div className="grid-x grid-padding-x paddingBottom paddingTop">
                                <div className="small-4 cell">
                                    <TextField id="volume" type="number" name="volume" min="1000" step="100" value={this.state.volume} label="Total Volume (In kWh)" placeholder="Volume"
                                        changingFunction={this.handleChangeVolume}
                                        required />
                                </div>
                                <div className='small-1 cell textAdjust'> &nbsp; &nbsp; = </div>
                                <div className='small-4 cell'>
                                    <TextField id="volumeMwh" disabled type="number" label="Total Volume (In MWh)" name="volumeMwh" placeholder=" " value={this.state.volume / 1000} />
                                </div>
                            </div>
                            <div className="grid-x grid-padding-x paddingBottom">
                                <div className="small-4 cell">
                                    <TextField id="maxHourPeak" type="number" name="maxHourPeak" value={this.state.maxHourPeak} label="Maximum Hourly Peak" placeholder="Please Enter"
                                        setValue={this.handleChange}
                                        min='0'
                                        required />
                                </div>
                                <div className="small-1 cell textAdjust">
                                    &nbsp; &nbsp;  </div>
                                <div className="small-4 cell">
                                    {/* <TextField id="estimatedValueMW" disabled type="number" name="calculatedVolumeMW" value={this.state.calculatedVolumeMW} label="Estimated Total Volume Weekly (In MWh)" placeholder="Estimated Total Volume" required /> */}
                                </div>
                            </div>
                            {/* <div className="grid-x grid-padding-x paddingBottom">
                                <div className="small-4 cell">
                                    <TextField id="estimatedValueKW" disabled type="number" name="calculatedVolumeKW" value={this.state.calculatedVolumeKW} label="Estimated Total Volume Weekly (In kWh)" placeholder="Estimated Total Volume" required />
                                </div>
                                <div className="small-1 cell textAdjust">
                                    &nbsp; &nbsp; = </div>
                                <div className="small-4 cell">
                                    <TextField id="estimatedValueMW" disabled type="number" name="calculatedVolumeMW" value={this.state.calculatedVolumeMW} label="Estimated Total Volume Weekly (In MWh)" placeholder="Estimated Total Volume" required />
                                </div>
                            </div> */}
                            <div className="grid-x grid-padding-x paddingTop" style={{ paddingTop: '20px' }}>
                                <div className='cell'>
                                    <MyRadioGroup
                                        title="Primary Power Source"
                                        name="primaryPowerSource"
                                        items={['Wind', 'Solar', 'Hydro', 'Biomass', 'Least Cost', 'Any Renewable']}
                                        setValue={this.setRadio}
                                        required />
                                </div>
                            </div>
                            <div className="grid-x grid-padding-x paddingTop">
                                <div className='cell'>
                                    <MyRadioGroup
                                        title="Renewable Energy Attribute"
                                        name="renewableEnergyResource"
                                        items={['Included', 'Not Included']}
                                        setValue={this.handleRenewableEnergyAttribute}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid-x grid-padding-x paddingTop" style={{ display: this.state.isRenewableEnergyAttribute ? 'none' : '' }}>
                                <div className='cell small-12'>
                                    <MyRadioGroup
                                        title="Renewable Energy Credit Type"
                                        name="RECAttribute"
                                        items={['Specific to bid source', 'Least cost']}
                                        setValue={this.handleRenewableCreditType}
                                    />
                                </div>
                                <div className='cell small-5'>
                                    <MyRadioGroup
                                        name="renewableEnergyCredit"
                                        items={['Match Request Power Purchase', 'Specific']}
                                        title="Renewable Energy Attribute/Credit Amount"
                                        setValue={this.setRadio} />
                                </div>
                                {this.state.isRECSpecificSelected && <div className='cell small-3' style={{ paddingTop: '15px' }}>
                                    <TextField
                                        id="RECVolume" name="RECVolume" type="number" label="Amount (In MWh)" placeholder="Enter Amount"
                                        min='0'
                                        setValue={this.handleChange}
                                    />
                                </div>}
                            </div>
                            <div className="grid-x grid-padding-x small-up-2 medium-up-4 large-up-6 paddingTop"
                                style={{ display: this.state.isRenewableEnergyAttribute ? 'none' : '' }}>
                                <div className='cell auto'>
                                    <SelectField
                                        id="states"
                                        name="state"
                                        label="State"
                                        placeholder="Please Select"
                                        options={this.state.RECState}
                                        setValue={this.handleDropdownforState}
                                    />
                                </div>
                                <div className='cell auto'>
                                    <SelectField
                                        id="type"
                                        name="type"
                                        label="Type"
                                        placeholder="Please Select"
                                        options={this.state.RECType}
                                        setValue={this.handleDropdownforType}
                                        value={this.state.type} />
                                </div>
                                <div className='cell auto'>
                                    <SelectField
                                        id="year"
                                        name="year"
                                        label="Year"
                                        placeholder="Please Select"
                                        options={this.state.RECYear}
                                        setValue={this.handleChange}
                                        value={this.state.year} />
                                </div>
                                <div className='cell auto'></div>
                            </div>
                            <br />
                            <div className="line"></div>
                            <div className='grid-x grid-padding-x paddingTop'>
                                <div className='cell text-color paddingBottomLarge' style={{ fontSize: '10px' }}>
                                    <b>(1) Must be atleast 48 business hours before start of Delivery Time desired.
                                    <br />(2) Combination of Work Peak & Off Peak may be selected together.
                                    <br />(On Peak and Off Peak days/hours are based on NERC guidlines)
                                    <br />(3) KWs are the minimum of 1000 and additional increments of 100.
                                    <br /><span className='redHighlight'>****</span> Escrow must be confirmed received by admin in the order for the RPP to be released.
                                    </b></div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <ProcessSummary data={this.state} />
                            <div className="line"></div>
                        </TabPanel> {this.state.selectedIndex === 0 && (<div className="grid-x grid-padding-x align-right paddingBottomLarge">
                            <div className="cell large-3 medium-6 small-12">
                                <button className="cell buttonStyle buttonBgCancel" onClick={this.onPressCancel}>CANCEL &nbsp; X</button>
                            </div>
                            <div className="cell large-3 medium-6 small-12">
                                <button type="button" onClick={this.next} className={'cell buttonStyle buttonBgNext'}>NEXT &nbsp; ></button>
                            </div>
                        </div>)}
                        {this.state.selectedIndex === 1 && (
                            <div className="grid-x grid-padding-x align-right paddingBottomLarge">
                                <div className="cell large-3 medium-6 small-12">
                                    <button className="cell buttonStyle buttonBgPrevious" onClick={this.onPrevious}> PREVIOUS </button>
                                </div>
                                <div className="cell large-3 medium-6 small-12">
                                    <button className="cell buttonStyle buttonBgCancel" onClick={this.onPressCancel}>CANCEL &nbsp; X</button>
                                </div>
                                <div className="cell large-3 medium-6 small-12">
                                    <button type="submit" className="cell buttonStyle buttonBgSubmit">SUBMIT &nbsp; ></button>
                                </div>
                            </div>)}
                    </Formsy>
                </Tabs>
            </div >
        );
    }
}

export default Rppform;