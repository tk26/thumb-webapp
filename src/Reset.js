import cookie from 'react-cookies';
import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header, Message, Button, Form, Segment, Divider } from 'semantic-ui-react';
import NavBar2 from './NavBar2.js';

const initialState = { 
    password: '', confirmedPassword: ''
};

class Reset extends Component {
    state = initialState;

    errorMessages = [];

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    resetUserPassword() {
        fetch('http://localhost:2611/user/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "token" : this.props.match.params.reset_token,
                "password" : this.state.password
            })
        })
        .then(this.handleErrors)
        .then( () => this.setState({ submitSucceeded : true }))
        .catch( () => this.setState({ submitSucceeded : false }) );
    }

    handleSubmit = (e) => {
        if (this.errorMessages.length === 0) {
            this.setState({ submitInitiated: true });
            this.resetUserPassword();
        }
    }

    componentWillMount() {
        this.setState({ token: cookie.load('token') });
    }

    render() {
        if(this.state.token) {
            // go to webapp Home
            window.location.href = "http://localhost:3000/";
        }

        const { password, confirmedPassword } = this.state

        this.errorMessages = [];

        if (password !== confirmedPassword) {
            this.errorMessages.push('Passwords don\'t match');
        }

        let errorMessagesDOM = null;

        if (this.errorMessages.length > 0) {
            errorMessagesDOM = <Message error list={this.errorMessages} />;
        }
        
        return (
            <div>
                <NavBar2/>
                { !this.state.submitInitiated ? 
                    <Container text>
                        <Header as='h2'>
                            Reset Password
                        </Header>
                        <Form autoComplete="on" onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Password</label>
                                <input type='password' name='password' value={password} minLength='8' maxLength='20' 
                                    placeholder='minimum 8 characters' autoComplete="off" autofill="off" 
                                    onChange={ (e) => this.setState({ password: e.target.value }) } required/>
                            </Form.Field>
                            <Form.Field>
                                <label>Confirm Password</label>
                                <input type='password' name='confirmedPassword' value={confirmedPassword} minLength='8' maxLength='20' 
                                    placeholder='should match above' autoComplete="off" autofill="off" 
                                    onChange={ (e) => this.setState({ confirmedPassword: e.target.value }) } required/>
                            </Form.Field>                            
                            <Button type='submit'>Submit</Button>
                        </Form>

                        <Segment padded>
                            Remember it already? <br/>
                            <Button primary fluid href='http://localhost:3000/#/login/'>Login</Button>
                            <Divider horizontal>Or</Divider>
                            Do not have an account yet?
                            <Button secondary fluid href='http://localhost:3000/#/signup/'>Sign Up Now</Button>
                        </Segment>

                        {errorMessagesDOM}

                    </Container>

                    :
                    this.state.submitSucceeded ?
                    <Container text>
                        <Header as='h2'>
                            Reset Password
                        </Header>
                        <Message success>
                            All set, we're good to go!
                        </Message>
                        <Button primary fluid href='http://localhost:3000/#/login/'>Login</Button>
                    </Container>

                    :
                    <Container text>
                        <Header as='h2'>
                            Reset Password
                        </Header>
                        <Message
                            error
                            header='Oops ...'
                            content='Some error occured. Please try again.'
                        />
                    </Container>
                }
            </div>
        );
    }
}

export default Reset;