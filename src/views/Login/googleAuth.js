import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';

class SignInWithGoogle extends Component{

    constructor(props){
        super(props);

        this.state = {error: null}
    }

    onSubmit = event => {
        event.preventDefault();

        this.props.firebase.googleAuth()
            .then(socialAuthUser => {
                console.log(socialAuthUser.additionalUserInfo.isNewUser)
                this.setState({error:null})
                this.props.history.push(ROUTES.HOME)
            })
            .catch(err => {
                this.setState({error: err})
            })
    }

    render(){
        const { error } = this.state

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <button type="submit">Sign In With Google</button>
                    {error && <p>{error.message}</p>}
                </form>
            </div>
        )
    }
}

export default SignInWithGoogle;