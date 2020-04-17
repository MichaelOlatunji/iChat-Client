import { app } from 'firebase';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID 
}

const { log } = console;
class Firebase {
    constructor(){
        app.initializeApp(config);
        this.auth = app.auth();
        this.firestore = app.firestore();
        this.messaging = app.messaging();

        this.googleProvider = new app.auth.GoogleAuthProvider();
        this.facebookProvider = new app.auth.FacebookAuthProvider();
        this.twitterProvider = new app.auth.TwitterAuthProvider();

    }

    //email and password auth
    signUpWithEmailAndPassword(email, password){
        return this.auth.createUserWithEmailAndPassWord(email, password);
    }
    signInWithEmailAndPassword(email, password){
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    //reset password
    resetPassword(email){
        this.auth.sendPasswordResetEmail(email);
    }
    //update password
    updatePassword(password){
        this.auth.updatePassword(password);
    }
    //phone auth
    recaptchaVerifier(){
        this.auth.useDeviceLanguage();
        window.recaptchaVerifier = this.auth.recaptchaVerifier(
            "recatcha-container", {
                size: "normal",
                callback: response => {
                    log(response);
                    this.phoneNumberAuth();
                }
            }
        )
    }

    phoneNumberAuth(){
        const phoneNumber = '+16005551234';
        const appVerifier = window.recaptchaVerifier;
        this.auth.signInWithPhoneNumber(phoneNumber, appVerifier).then(confirmationResult => {
            log(confirmationResult);
            window.confirmationResult = confirmationResult
        }).catch(err => {
            log(err);
            window.recaptchaVerifier.render().then(widgetId => {
                grecaptcha.reset(widgetId);
            })
        })
    }

    verifyPhoneAuthCode(){
        const code = '123456';
        confirmationResult.confirm(code).then(result => {
            let user = result.user;
            log(user);

        }).catch(err => {
            log(err);
        })
    }

    onAuthChanged(){
        this.auth.onAuthStateChanged((user) => {
            if(user){
                log('User logged in');
            } else {
                log('User logged out');
            }
        })
    }

    //google auth
    googleAuth(){
        return this.auth.signInWithPopup(this.googleProvider);
    }
    //facebook auth
    facebookAuth(){
        return this.auth.signInWithPopup(this.facebookProvider);
    }
    //twitter auth
    twitterAuth(){
        return this.auth.signInWithPopup(this.twitterProvider);
        // .then(result => {
        //     const token = result.credential.accessToken; //gets accessToken
        //     const secret = result.credential.secret; //gets secret
        //     let user = result.user; //signed in user info
        // }).catch(err => {
        //     const errorCode = err.code;
        //     const errorMessage = err.message;
        //     const email = err.email; //the email of the user's account used
        //     const credential = err.credential; //gets credential
        // })
    }

    //signs user out
    signOut(){
        this.auth.signOut();
    }

}

export default Firebase;