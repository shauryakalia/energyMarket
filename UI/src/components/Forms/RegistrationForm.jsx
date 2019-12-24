import React from 'react';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';

// Custom Imports
import BlueHead from '../Forms/BlueHead';
import TextField from '../../components/Forms/TextField';
import SelectField from '../../components/Forms/SelectField';

// Class for Registration component
class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canSubmit: false, user: JSON.parse(sessionStorage.getItem('user')), signetAccount: 'AmericanPowerNet',
            companyName: '',
            role: { value: "buyer", label: "Buyer", placeholder: "buyer" },
            address: '',
            agreementType: { value: "EEI", label: "EEI", placeholder: "EEI" },
            contactName: '',
            creditAvailable: '',
            creditLimit: '',
            email: '',
            phone: ''

        };
        //this.handleChange=this.handleChange.bind(this);
    }

    // handleChange(name,event) {
    //     console.log("inside handlechange:",name,event.target.value)
    //     this.setState({
    //         [name]: event.target.value,
    //     })

    // }
    handleChange = (value, name) => {
        if (typeof (value) === 'object') {
            value = value.value
        }
        this.setState({
            [name]: value,
        })
    }


    checkValidations = () => {

        console.log(this.state)
        // var includedFields=[];
        // if (this.state.includedFields.length > 0) {
        //     let string = "Please check the following fields:"
        //     this.state.includedFields.map(item => {
        //         string = string + ' ' + item.value
        //     })
        //     alert(string)
        // }
    }
    render() {
        const { canSubmit, enableButton, disableButton, disableCSS, onSubmit } = this.props;
        return (
            <div className="parent-bar">
                <Formsy onSubmit={onSubmit} onValid={enableButton} onInvalid={disableButton} className="regist">
                    <BlueHead label='USER TYPE' />
                    <div className='grid-x grid-padding-x'>
                        <div className='cell large-3 medium-6 small-12'>
                            <SelectField
                                id="role"
                                name="role"
                                placeholder="Please Select"
                                options={[
                                    { value: "buyer", label: "Buyer", placeholder: "buyer" },
                                    { value: "seller", label: "Seller", placeholder: "seller" },
                                ]}
                                value={this.state.role}
                            //setValue ={this.handleChange}
                            />
                        </div>
                    </div>
                    <BlueHead label='COMPANY DETAILS' />
                    <div className='grid-x grid-padding-x'>
                        <div className="cell large-3 medium-6 small-12">
                            <TextField id="companyName" type="text" name="companyName" label="Name" placeholder='Name'
                                validations={{ matchRegexp: /^[a-zA-Z ]+$/ }}
                                validationErrors={{ matchRegexp: 'Please enter a valid name', }}
                                //setValue ={this.handleChange}
                                required /></div>
                        <div className='cell large-3 medium-6 small-12'>
                            <TextField id="address" type="text" name="address" label="Address" placeholder='Address'

                                // setValue ={this.handleChange}
                                required /></div>
                    </div>
                    <BlueHead label='USER DETAILS' />
                    <div className='grid-x grid-padding-x'>
                        <div className="cell large-3 medium-6 small-12"><TextField id="contactName" type="text" name="contactName" label="Name" placeholder="Name" className="borderradius"
                            validations={{ matchRegexp: /^[a-zA-Z ]+$/ }}
                            validationErrors={{
                                matchRegexp: 'Please enter a valid name',
                            }}
                            // setValue ={this.handleChange}
                            required /></div>
                        <div className="cell large-3 medium-6 small-12"><TextField id="title" type="text" name="title" label="Title" placeholder="Title"  // setValue ={this.handleChange}
                        /></div>
                        <div className="cell large-3 medium-6 small-12"><TextField id="signetAccount" type="text" name="signetAccount" value={this.state.signetAccount} label="Signet Account #" placeholder='Signet Account' setValue={this.handleChange} required /></div>
                    </div>
                    <div className='grid-x grid-padding-x'>
                        <div className="cell large-3 medium-6 small-12"><TextField id="phone" type="text" name="phone" label="Contact Number" placeholder='Contact Number'
                            validations={{ matchRegexp: /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/, }}
                            validationErrors={{
                                matchRegexp: 'Please enter a valid number',
                            }}
                            // setValue ={this.handleChange}
                            required /></div>
                        <div className="cell large-3 medium-6 small-12"><TextField id="email" type="text" name="email" label="Email" placeholder='Email'
                            validations={{
                                isEmail: true,
                                maxLength: 60,
                            }}
                            validationErrors={{
                                isEmail: 'Please enter a valid e-mail address',
                                maxLength: 'E-mail cannot be longer than 60 characters',
                            }}
                            //setValue ={this.handleChange}
                            required
                        /></div>
                    </div>
                    <BlueHead label='CREDITS' />
                    <div className='grid-x grid-padding-x'>
                        <div className="cell large-3 medium-6 small-12"><TextField id="creditLimit" type="number" name="creditLimit" label="Credit Limit (In dollars)" className="borderradius" placeholder='Credit Limit'
                            // setValue ={this.handleChange}
                            required
                            min='0'
                        /></div>
                        <div className="cell large-3 medium-6 small-12"><TextField id="creditAvailable" type="number" name="creditAvailable" label="Credit Available (In dollars)" placeholder='Credit Available'
                            min='0'
                            // setValue ={this.handleChange} 
                            required /></div>
                    </div>
                    <BlueHead label='OTHER DETAILS' />
                    <div className='grid-x grid-padding-x'>
                        <div className='cell large-3 medium-6 small-12'>
                            <SelectField
                                id="agreementType"
                                name="agreementType"
                                placeholder="Please Select"
                                options={[
                                    { value: "EEI", label: "EEI", placeholder: "EEI" },
                                    { value: "ISDA", label: "ISDA", placeholder: "ISDA" },
                                ]}
                                value={this.state.agreementType}
                            // setValue ={this.handleChange}
                            />


                        </div>
                    </div>
                    <hr style={{ border: "#808080 solid 1px" }} />

                    <div className="grid-x grid-padding-x align-right paddingBottomLarge">
                        <div className="cell large-3 medium-6 small-12">
                            <button type="submit" className={disableCSS} disabled={!canSubmit} onClick={this.checkValidations}>REGISTER</button>
                        </div>
                    </div>
                    <br />
                </Formsy>
            </div>
        );
    }
}

Registration.propTypes = {
    canSubmit: PropTypes.bool.isRequired,
    disableButton: PropTypes.func.isRequired,
    enableButton: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default Registration;