import cookie from 'react-cookies';
import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header, Message, Button, Form } from 'semantic-ui-react';
import NavBar2 from './NavBar2';

const initialState = { 
    email: '', password: ''
};

class Login extends Component {
    state = initialState;

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    }

    authenticateUser() {
        fetch('http://localhost:2611/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email" : this.state.email,
                "password" : this.state.password
            })
        })
        .then(this.handleErrors)
        .then( (response) => {
            cookie.save('token', response.token, { path: '/' })
            // go to webapp Home
            window.location.href = "http://localhost:3000/";
        })
        .catch( () => this.setState({ invalidCredentials : true }) );
    }

    handleSubmit = (e) => {
        this.authenticateUser();
    }

    componentWillMount() {
        this.setState({ token: cookie.load('token') });
    }

    render() {
        if(this.state.token) {
            // go to webapp Home
            window.location.href = "http://localhost:3000/";
        }

        const { email, password } = this.state

        return (
            <div>
                <NavBar2/>
                <Container text>
                    <Header as='h2'>
                        Log In to Thumb
                    </Header>

                    <Form autoComplete="on" onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>School Email</label>
                            <input type='email' name='email' value={email}
                                onChange={ (e) => this.setState({ email: e.target.value }) } required/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input type='password' name='password' value={password} autoComplete="off" autofill="off" 
                                onChange={ (e) => this.setState({ password: e.target.value }) } required/>
                        </Form.Field>
                        <Button type='submit'>Login</Button>
                    </Form>

                    {   this.state.invalidCredentials ?
                        <Message
                            error
                            size='mini'
                            header='Oops ...'
                            content='Incorrect email OR password. Please try again.'
                        />
                        :
                        null
                    }

                    <Message warning size='mini'>
                        Do not remember password?&nbsp;<a href='/#/forgot'>Reset</a>&nbsp;here
                        <b>&nbsp;OR&nbsp;</b>
                        Do not have an account?&nbsp;<a href='/#/signup'>Signup</a>&nbsp;here.
                    </Message>
                </Container>
            </div>
        );
    }
}

export default Login;