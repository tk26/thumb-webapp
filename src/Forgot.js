import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header, Message, Button, Form, Segment, Divider } from 'semantic-ui-react';
import NavBar2 from './NavBar2.js';
import cookie from 'react-cookies';

const initialState = { 
    email: ''
};

class Forgot extends Component {
    state = initialState;

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    }

    sendPasswordResetEmail() {
        fetch('http://localhost:2611/user/forgot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email" : this.state.email
            })
        })
        .then(this.handleErrors)
        .then( (response) => {
            this.setState({ submissionSuccess: true });
        })
        .catch( () => this.setState({ invalid : true }) );
    }

    handleSubmit = (e) => {
        this.sendPasswordResetEmail();
    }

    componentWillMount() {
        this.setState({ token: cookie.load('token') });
    }

    render() {
        if(this.state.token) {
            // go to webapp Home
            window.location.href = "http://localhost:3000/";
        }

        if(this.state.submissionSuccess) {
            return (
                <div>
                    <NavBar2/>
                    <Container text>
                        <Header as='h2'>
                            Forgot Password
                        </Header>
                        <Message
                            success
                            size='large'
                            header='Reset Email Sent ...'
                            content='Please click on the password reset link in your email'
                        />
                    </Container>
                </div>
            );
        }

        const { email } = this.state

        return (
            <div>
                <NavBar2/>
                <Container text>
                    <Header as='h2'>
                        Forgot Password
                    </Header>

                    <Message warning size='mini'>
                        Please enter your email address and click Submit.
                    </Message>

                    <Form autoComplete="on" onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>School Email</label>
                            <input type='email' name='email' value={email}
                                onChange={ (e) => this.setState({ email: e.target.value }) } required/>
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>

                    {   this.state.invalid ?
                        <Message
                            error
                            size='mini'
                            header='Oops ...'
                            content='Incorrect email. Please try again.'
                        />
                        :
                        null
                    }

                    <Segment padded>
                        Remember it already? <br/>
                        <Button primary fluid href='http://localhost:3000/#/login/'>Login</Button>
                        <Divider horizontal>Or</Divider>
                        Do not have an account yet?
                        <Button secondary fluid href='http://localhost:3000/#/signup/'>Sign Up Now</Button>
                    </Segment>
                </Container>
            </div>
        );
    }
}

export default Forgot;