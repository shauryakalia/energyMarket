import React from 'react';
import Simplert from 'react-simplert';

// Custom Imports
import BlueHead from '../../components/Forms/BlueHead';
import ImageUploader from 'react-images-upload';
import BackendServices from '../../Services/BackendServices';

// Container for Plant Image component
class PlantImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { plantImages: [], addedUserId: this.props.location.state.addedUserId, showAlert: false };
        this.onDropImages = this.onDropImages.bind(this);
        this.onUploadImages = this.onUploadImages.bind(this);
        this.closeSimplert = this.closeSimplert.bind(this);
    }

    // Function to be called for uploading multiple images
    onDropImages = (picture) => {
        this.setState({
            plantImages: this.state.plantImages.concat(picture),
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
        if (this.state.plantImages.length > 0) {
            BackendServices.uploadDoc(JSON.parse(sessionStorage.getItem('user')).data.userId, this.state.addedUserId, this.state.plantImages)
                .then(response => {
                    this.creatAlert("success", "Request Completed", 'You have successfully registered a user as seller')
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
                <BlueHead label="Plant Image" />
                <div className='grid-x align-center'>
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
                            {{ float: 'right' }} color="primary" variant="contained" onClick={e => this.onUploadImages(e, this.state.plantImages[0])}>
                            UPLOAD
                    </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlantImage;
