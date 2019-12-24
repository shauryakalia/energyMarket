import React from 'react';
import Simplert from 'react-simplert';
import { NavLink } from 'react-router-dom';

// Custom Imports
import BlueHead from '../../components/Forms/BlueHead';
import ImageUploader from 'react-images-upload';
import BackendServices from '../../Services/BackendServices';
import Card from '../../components/Card'
import { PHOTO_URL } from '../../constant';

// Container for Plant Image component
class DigitalVault extends React.Component {
    constructor(props) {
        super(props);
        this.state = { digitalVault: [], showAlert: false, digitalVaultResponse: [] };
        this.onDropImages = this.onDropImages.bind(this);
        this.onUploadImages = this.onUploadImages.bind(this);
        this.getImage = this.getImage.bind(this);
        this.closeSimplert = this.closeSimplert.bind(this);
    }

    // Function to be called for uploading multiple images
    onDropImages = (picture) => {
        this.setState({
            digitalVault: this.state.digitalVault.concat(picture),
        });
    }

    closeSimplert() {
        this.setState({
            showAlert: false
        });
        this.props.history.push('/dashboard')
    }

    creatAlert(alertType, alertTitle, alertMessage) {
        this.setState({
            showAlert: true,
            alertType,
            alertTitle,
            alertMessage
        })
    }

    // Function to be called for uploading multiple images to server
    onUploadImages = (event) => {
        if (this.state.digitalVault.length > 0) {
            BackendServices.digitalVault(JSON.parse(sessionStorage.getItem('user')).data.userId, this.state.digitalVault)
                .then(res => {
                    this.creatAlert("success", "Success", `${res.data.message}`)
                }, error => {
                    if (error.response) {
                        this.creatAlert("error", "Error", `${error.response.data.message}`)
                    } else {
                        this.creatAlert("error", "Error", "Something went wrong. Please login again.")
                    }
                });
        }
        else {
            alert("Please upload the required document.")
        }
        event.preventDefault();
    }

    // Function to be called to get image uploaded to server
    getImage = (image) => {
        BackendServices.getImage(image)
            .then(res => {
                this.creatAlert("success", "Success", `${res.data.message}`)
            }, error => {
                if (error.response) {
                    this.creatAlert("error", "Error", `${error.response.data.message}`)
                } else {
                    this.creatAlert("error", "Error", "Something went wrong. Please login again.")
                }
            });
    }

    componentWillMount() {
        BackendServices.getDigitalVault(JSON.parse(sessionStorage.getItem('user')).data.userId)
            .then(res => {
                this.setState({
                    digitalVaultResponse: res.data.data
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
        return (
            <div className='parent-bar'>
                <Simplert
                    showSimplert={this.state.showAlert}
                    type={this.state.alertType}
                    title={this.state.alertTitle}
                    message={this.state.alertMessage}
                    disableOverlayClick={true}
                    onClose={this.closeSimplert}
                />
                <BlueHead label="Digital Vault" />
                <div className='grid-x align-center' style={{ margin: '2%' }}>
                    <div className="cell large-3 medium-6 small-12">
                        <ImageUploader
                            withIcon={true}
                            withPreview={true}
                            buttonText='Upload Plant Image'
                            onChange={this.onDropImages}
                            imgExtension={['.jpg', '.gif', '.png']}
                            maxFileSize={5242880}

                        />
                        <button className="buttonStyle buttonBgSubmit cell" style=
                            {{ float: 'right' }} color="primary" variant="contained" onClick={e => this.onUploadImages(e, this.state.digitalVault[0])}>
                            UPLOAD
                    </button>
                    </div>
                </div>
                <div class="columns small-10">
                    <div class="grid-x grid-padding-x small-up-2 medium-up-4">
                        {this.state.digitalVaultResponse.map((i) => (
                            <a href={`${PHOTO_URL}vault/${i}`} target="_blank" style={{ marginLeft: 'auto', marginRight: 'auto' }}
                               > <h6 style={{  fontWeight: 'bold', }}>{i}</h6></a>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default DigitalVault;
