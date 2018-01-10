import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Menu, Image, Icon, Button } from 'semantic-ui-react'

class NavBar2 extends Component {
    state = { activeItem: '' }

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
                    name='about' 
                    active={activeItem === 'about'}
                    as='a'>
                    <Icon name='info circle'/>
                    About
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Menu.Item 
                        name='why' 
                        active={activeItem === 'why'}
                        as='a'
                        href='/#/why'>
                        <Button primary>Why Thumb</Button>
                    </Menu.Item>
                </Menu.Menu>
                
            </Menu>
        );
    }
}

export default NavBar2;