import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header, Message, Item, Button, Label, Icon, Tab, Image } from 'semantic-ui-react';
import NavBar from './NavBar.js';
import { baseUrlAPI } from './common/baseUrl.js';
import moment from 'moment';

const initialState = {
    valid: true,
    firstName: '', lastName: '',
    school: '', rides: [], drives: []
};

class Profile extends Component {
    state = initialState;

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    }

    getUserInfo() {
        fetch(baseUrlAPI[process.env.NODE_ENV] + 
            '/user/profile/' + this.props.match.params.user_public_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(this.handleErrors)
        .then( (response) => {
            this.setState({
                firstName : response.firstName,
                lastName: response.lastName,
                school: response.school
            });
        })
        .catch( () => {
            this.setState({
                valid: false
            });
        });
    }

    getUserRides() {
        fetch(baseUrlAPI[process.env.NODE_ENV] + 
            '/ride/user/' + this.props.match.params.user_public_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(this.handleErrors)
        .then( (response) => {
            this.setState({
                rides : response
            });
        })
        .catch( () => {} );
    }

    getUserDrives() {
        fetch(baseUrlAPI[process.env.NODE_ENV] + 
            '/drive/user/' + this.props.match.params.user_public_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(this.handleErrors)
        .then( (response) => {
            this.setState({
                drives : response
            });
        })
        .catch( () => {} );
    }

    componentDidMount() {
        this.getUserInfo();
        this.getUserRides();
        this.getUserDrives();
    }

    render() {
        if (this.state.valid) {
            return (
                <div>
                    <NavBar/>
                    <Container text>
                        <Header as='h2'>
                            <Image 
                                circular
                                src = 'http://react.semantic-ui.com/assets/images/avatar/large/matthew.png'
                            />
                            <Header.Content>
                                {this.state.firstName} {this.state.lastName}
                            </Header.Content>
                        </Header>
                        
                        <Tab panes = {
                                [
                                    {
                                        menuItem: {
                                            key: 'rides',
                                            content: 'Rides'
                                        },
                                        pane: (
                                            <Tab.Pane key='ridesTab'> 
                                                <Item.Group divided>
                                                    { this.state.rides.map(ride => 
                                                        <Item key={ride.ridePublicId} size='mini'>
                                                            <Item.Content>
                                                                <Item.Header as='a'>
                                                                    {ride.rideTo}
                                                                </Item.Header>
                                                                <Item.Meta>
                                                                    <span>{ride.rideFrom}</span><br/><br/>
                                                                    <span>{moment(ride.rideDate, 'MM/DD/YYYY').format('MMM Do')}</span><br/>
                                                                </Item.Meta>
                                                                <Item.Description>{ride.rideComment}</Item.Description>
                                                                <Item.Extra>
                                                                    {   ride.rideTime.map(time => {
                                                                            return <Label icon='time' key={time.toString()} content={time} />
                                                                        })
                                                                    }

                                                                    <Button primary floated='right'>
                                                                        Ask to Join
                                                                        <Icon name='right chevron' />
                                                                    </Button>
                                                                </Item.Extra>
                                                            </Item.Content>
                                                        </Item>
                                                    )
                                                    }
                                                </Item.Group>
                                            </Tab.Pane>
                                        )
                                    },
                                    {
                                        menuItem: {
                                            key: 'drives',
                                            content: 'Drives'
                                        },
                                        pane: (
                                            <Tab.Pane key='drivesTab'>
                                                <Item.Group divided>
                                                    { this.state.drives.map(drive => 
                                                        <Item key={drive.drivePublicId} size='mini'>
                                                            <Item.Content>
                                                                <Item.Header as='a'>
                                                                    {drive.driveTo}
                                                                </Item.Header>
                                                                <Item.Meta>
                                                                    <span>{drive.driveFrom}</span><br/><br/>
                                                                    <span>{moment(drive.driveDate, 'MM/DD/YYYY').format('MMM Do')}</span><br/>
                                                                </Item.Meta>
                                                                <Item.Description>{drive.driveComment}</Item.Description>
                                                                <Item.Extra>
                                                                    {   drive.driveTime.map(time => {
                                                                            return <Label icon='time' key={time.toString()} content={time} />
                                                                        })
                                                                    }

                                                                    <Label content={'Seats: ' + drive.driveSeatsAvailable}/>

                                                                    <Button primary floated='right'>
                                                                        Join
                                                                        <Icon name='right chevron' />
                                                                    </Button>
                                                                </Item.Extra>
                                                            </Item.Content>
                                                        </Item>
                                                    )
                                                    }
                                                </Item.Group>
                                            </Tab.Pane>
                                        )
                                    }

                                ]
                            }
                        renderActiveOnly={false}/>
                    </Container>
                </div>
            );
        }
        else {
            return (
                <div>
                    <NavBar/>
                    <Container text>
                        <Message negative>
                            <Message.Header>Oops...</Message.Header>
                            <p>The profile does not exist!</p>
                        </Message>
                    </Container>
                </div>
            );
        }
    }
}

export default Profile;