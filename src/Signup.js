import cookie from 'react-cookies';
import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header, Image, Message, Button, Dropdown, Form } from 'semantic-ui-react';
import schoolOptions from './common/schoolOptions.js';
import NavBar2 from './NavBar2';

const initialState = { 
    firstName: '', lastName: '', email: '',
    school: '', password: '', confirmedPassword: ''
};

class Signup extends Component {
    state = initialState;

    errorMessages = [];

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    saveUser() {
        fetch('http://localhost:2611/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "firstName" : this.state.firstName,
                "lastName" : this.state.lastName,
                "email" : this.state.email,
                "school" : this.state.school,
                "password" : this.state.password
            })
        })
        .then(this.handleErrors)
        .then( () => this.setState({ submitSucceeded : true }))
        .catch( () => this.setState({ submitSucceeded : false }) );
    }

    savePotentialUser() {
        fetch('http://localhost:2611/user/potential/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "firstName" : this.state.firstName,
                "lastName" : this.state.lastName,
                "email" : this.state.email,
                "school" : this.state.school
            })
        })
        .then(this.handleErrors)
        .catch( (error) => {});
    }

    handleSubmit = (e) => {
        if (this.errorMessages.length === 0) {
            this.setState({ submitInitiated: true });
            this.saveUser();
        }
        else if (this.errorMessages.length === 1 && this.state.password === this.state.confirmedPassword) {
            // track email address if the only error is .edu address required
            this.savePotentialUser();
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

        const { 
            firstName, lastName, email,
            school, password, confirmedPassword
        } = this.state

        this.errorMessages = [];

        if (password !== confirmedPassword) {
            this.errorMessages.push('Passwords don\'t match');
        }

        if (email.length > 4 && email.substr(email.length-4) !== '.edu') {
            this.errorMessages.push('Requires .edu email address');
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
                            Sign Up for Thumb
                        </Header>
                        <Form autoComplete="on" onSubmit={this.handleSubmit}>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>First Name</label>
                                    <input type='text' name='firstName' value={firstName} maxLength='20' placeholder='First Name' 
                                        onChange={ (e) => this.setState({ firstName: e.target.value }) } required/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Last Name</label>
                                    <input type='text' name='lastName' value={lastName} maxLength='20' placeholder='Last Name' 
                                        onChange={ (e) => this.setState({ lastName: e.target.value }) } required/>
                                </Form.Field>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>School Email</label>
                                    <input type='email' name='email' value={email} placeholder='.edu address preferred' 
                                        onChange={ (e) => this.setState({ email: e.target.value }) } required/>
                                </Form.Field>
                                <Form.Field>
                                    <label>School</label>
                                    <Dropdown name='school' value={school} placeholder='Select School' fluid search selection 
                                        options={schoolOptions} onChange={ (e, data) => this.setState({ school: data.value}) } />
                                </Form.Field>
                            </Form.Group>
                            
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

                            <Message>
                                By signing up you indicate that you have read and agree to the Terms of Service and Privacy Policy.
                            </Message>
                            <Button type='submit'>Submit</Button>
                        </Form>

                        <Message warning>
                            Already signed up?&nbsp;<a href='/#/login'>Login here</a>&nbsp;instead.
                        </Message>

                        {errorMessagesDOM}

                    </Container>

                    :
                    this.state.submitSucceeded ?
                    <Container text>
                        <Header as='h2'>
                            <Image circular src='../../thumb_logo.jpg' />
                            {' '}Sign Up
                        </Header>
                        <Message
                            success
                            header='Almost there ...'
                            content='Please check your inbox and click on the verification link.'
                        />
                    </Container>

                    :
                    <Container text>
                        <Header as='h2'>
                            <Image circular src='../../thumb_logo.jpg' />
                            {' '}Sign Up
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

export default Signup;