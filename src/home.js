import React, { Component } from 'react';
import fire from './config/fire';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import 'firebase/firestore';
import './home.css';

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            name: '',
            userid: ''
        }
    }
    
    componentWillReceiveProps(nextProps) {
        let s, current;
        const {user} = this.props;
        if(nextProps !== this.props) {
            s = nextProps.user;  
        }
      
         fire.database().ref('Users').on('value', snap => {
            let users = [];
            snap.forEach(child => {
            
                users.push(child.val());
            });
        
            current =  users.find(user => {
             return user.userId === s ? user.name : null ;
        })
            console.log('current', current);
       this.setState({name: current.name})
    });
    }

    componentWillMount() {
    db.collection('uploadImg').get()
        .then((result) => {
            result.forEach((record) => {
                console.log(record.id);
                this.setState({
                    images: this.state.images.concat(record.data())
                })
            })
        })
  }

  
    logout = () => {
        fire.auth().signOut();
    }
    upLoadStart = () => {
        console.log('image loading ...')
    }
    upLoadSuccess = filename => {
        console.log(filename);

        firebase.storage().ref('images').child(filename).getDownloadURL()
            .then((url) => {
                console.log(url);
                firebase.storage().ref('images').child(filename).getMetadata()
                    .then((res) =>{
                        console.log(res);
                    })
                var doc = db.collection('uploadImg').doc();
                doc.set({
                    imageName: filename,
                    imageURL: url,
                    docRef: doc.id,
                    userName: this.state.name
                })
                db.collection('uploadImg').doc(doc.id).get()
                    .then((result) => {
                        console.log('ress', result.data());

                        this.setState({
                            images: this.state.images.concat(result.data())
                        })
                    })
            })
    }
    handleDelete = (e, img, i)=>{
        console.log('clicked !!!',i);
        console.log('clicked !!!',img);


        firebase.storage().ref('images').child(img.imageName).delete()
            .then((result) => {
                        console.log('fucking deleted frome storage!!!!');

                db.collection('uploadImg').doc(img.docRef).delete()
                    .then((result) => {
                        console.log('fucking deleted frome database!!!!');

                        let updatedImages = this.state.images;
                        updatedImages.splice(i, 1);
                        this.setState({
                            images: updatedImages
                        })
                    })
            })
    }

    render() {
        
        return (
            <div className="container">
                
                  <nav className="nav">
                  <div>
                    <h1 style={{display: 'inline'}}>Photo-app</h1>
                    
                    <FileUploader
                        style={{display: 'inline'}} 
                        accept="image/*"
                        randomizeFilename
                        storageRef={firebase.storage().ref('images')}
                        onUploadStart={this.upLoadStart}
                        onUploadSuccess={this.upLoadSuccess}
                        className="loader"
                    />
                    <div className="xxx">
                    <h3 className="navUname"> {this.state.name}</h3>
                    <button className="logOut" onClick={this.logout}> Logout </button>
                    </div>
                  </div>
                  </nav>
                  <br/> <br/>
                
            
                <div className="photo">
                {this.state.images.map((img, i) => {

                return(
                        <div key={i} className="ph-block">
                            <div className="userName">{img.userName}</div>
                            <img src={img.imageURL} className="img"/>
                            <br/>
                            { img.userName === this.state.name && <button className="delbutt" onClick={(e) => this.handleDelete(e, img, i)}> delete </button>}
                        </div>
                    )

            })}
                  
                </div>
            </div>
        )
    }
}

export default Home;