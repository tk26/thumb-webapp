import cookie from 'react-cookies';
import React, { Component } from 'react';

import 'semantic-ui-css/semantic.min.css';
import { Container, Grid, Image, Icon, Button, Header, Divider } from 'semantic-ui-react';


class Profile extends Component {
    componentWillMount() {
        this.setState({ token: cookie.load('token') });
    }

    logout() {
        cookie.remove('token', { path: '/' })
        // refresh
        window.location.reload();
    }

    render() {
        /*if(this.state.token) {
            // go to webapp Home
            window.location.href = "http://localhost:3000/";
        }

        const { email, password } = this.state;*/

        return (
            <div>

                <Container>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as='h1'>Name</Header>
                                <Divider/>
                                <Header as='h2'><a>edit profile</a></Header>
                            </Grid.Column>

                            <Grid.Column>
                                <Image circular floated='right' src='../../thumb_logo.jpg' />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>

                <Container>
                    <Button fluid>settings <Icon name="setting"/></Button>
                    <Button fluid>frequently asked questions <Icon name="question"/></Button>
                    <Button fluid>why drive? <Icon name="road"/></Button>
                    <Button fluid>why ride? <Icon name="car"/></Button>
                    <Button fluid>give us feedback <Icon name="comments outline"/></Button>
                </Container>

            </div>
        );

    }
}

export default Profile;