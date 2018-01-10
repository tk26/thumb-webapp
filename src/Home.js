import cookie from 'react-cookies';
import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header } from 'semantic-ui-react';
import NavBar from './NavBar';

class Home extends Component {
    componentWillMount() {
        this.setState({ token: cookie.load('token') });
    }

    render() {
        return(
            <div>
                <NavBar/>
                <Container text>
                    <Header as='h2'>
                        Thumb Feed
                    </Header>
                </Container>
            </div>
        );
    }
}

export default Home;