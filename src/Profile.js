import React, { Component } from 'react';

import 'semantic-ui-css/semantic.min.css';
import { Container, Header } from 'semantic-ui-react';

import NavBar from './NavBar.js';

class Profile extends Component {
    render() {
        return(
            <div>
                <NavBar/>
                <Container text>
                    <Header as='h2'>
                        User #{this.props.match.params.user_public_id}
                    </Header>
                </Container>
            </div>
        );
    }
}

export default Profile;