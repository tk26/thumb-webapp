import cookie from 'react-cookies';
import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Menu, Image, Icon, Dropdown, Input, Button } from 'semantic-ui-react'

class NavBar extends Component {
    state = { activeItem: '' }

    logout() {
        cookie.remove('token', { path: '/' })
        // refresh
        window.location.reload();
    }

    componentWillMount() {
        this.setState({ token: cookie.load('token') });
    }

    render() {
        const { activeItem } = this.state

        return (
            <Menu borderless stackable size='huge'>

                <Menu.Item 
                    name='logo' 
                    active={activeItem === 'logo'}
                    as='a'
                    href='/'>
                    <Image
                        circular
                        src='../../thumb_logo.jpg'
                        size='mini'
                    />
                    Thumb
                </Menu.Item>

                <Menu.Item 
                    name='home' 
                    active={activeItem === 'home'}
                    as='a'
                    href='/'>
                    <Icon name='home'/>
                    Home
                </Menu.Item>

                <Dropdown item text='Travel'>
                    <Dropdown.Menu>
                        <Dropdown.Item as='a' href='/#/drive' icon='bus' text='Drive'/>
                        <Dropdown.Item as='a' href='/#/ride' icon='car' text='Ride'/>
                    </Dropdown.Menu>
                </Dropdown>

                <Menu.Item 
                    name='terminal' 
                    active={activeItem === 'terminal'}
                    as='a'>
                    <Icon name='travel'/>
                    Terminal
                </Menu.Item>

                <Menu.Item
                    name='search'
                    active={activeItem === 'search'}>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>

                {   this.state.token ?
                        <Menu.Menu position='right'>
                            <Menu.Item 
                                name='notifications' 
                                active={activeItem === 'notifications'}
                                as='a'>
                                <Icon name='bell'/>
                            </Menu.Item>

                            <Dropdown item icon='user circle outline'>
                                <Dropdown.Menu>
                                    <Dropdown.Item as='a' href='/#/profile' text='Profile' icon='user'/>
                                    <Dropdown.Item as='a' text='Settings' icon='settings'/>
                                    <Dropdown.Item as='a' text='Help' icon='help'/>
                                    <Dropdown.Item as='a' text='About' icon='info circle'/>
                                    <Dropdown.Item as='a' onClick={this.logout} text='Logout' icon='log out'/>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                    :   
                        <Menu.Menu position='right'>
                            <Menu.Item 
                                name='signup' 
                                active={activeItem === 'signup'}
                                as='a'
                                href='/#/signup'>
                                <Button primary>Sign up</Button>
                            </Menu.Item>

                            <Menu.Item 
                                name='login' 
                                active={activeItem === 'login'}
                                as='a'
                                href='/#/login'>
                                Log In
                            </Menu.Item>

                            <Menu.Item 
                                name='about' 
                                active={activeItem === 'about'}
                                as='a'>
                                <Icon name='info circle'/>
                                About
                            </Menu.Item>
                        </Menu.Menu>
                }
            </Menu>
        );
    }
}

export default NavBar;