import cookie from 'react-cookies';
import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header, Message, Button, Form, Dropdown, TextArea } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import timeOptions from './common/timeOptions.js';
import NavBar from './NavBar.js';
import PlacesAutocomplete from 'react-places-autocomplete';

const initialState = { 
    from_location: '', to_location: '',
    travel_date: moment(), travel_time: [],
    seats_available: 0, comment: ''
};

class Drive extends Component {
    state = initialState;

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    }

    submitDrive() {
        fetch('http://localhost:2611/drive/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "token": this.state.token,
                "from_location" : this.state.from_location,
                "to_location" : this.state.to_location,
                "travel_date" : this.state.travel_date.format('MM/DD/YYYY'),
                "travel_time": this.state.travel_time,
                "seats_available": this.state.seats_available,
                "comment": this.state.comment
            })
        })
        .then(this.handleErrors)
        .then( () => {
            this.setState({ submissionSuccess: true });
        })
        .catch( () => this.setState({ invalid : true }) );
    }

    handleSubmit = (e) => {
        if (this.state.from_location && this.state.to_location) {
            this.submitDrive();
        }
    }

    componentWillMount() {
        this.setState({ token: cookie.load('token') });
    }

    render() {
        if(!this.state.token) {
            // go to webapp Home
            window.location.href = "http://localhost:3000/#/login/";
        }

        if(this.state.submissionSuccess) {
            return (
                <div>
                    <NavBar/>
                    <Container text>
                        <Header as='h2'>
                            Request Drive
                        </Header>
                        <Message
                            success
                            size='large'
                            header='Way to go ...'
                            content='Drive Submitted Successfully.'
                        />
                    </Container>
                </div>
            );
        }

        const { travel_date, travel_time, seats_available, comment } = this.state

        const from_location_autocomplete = {
            value: this.state.from_location,
            onChange: (_from_location) => ( this.setState({ from_location: _from_location }) )
        }

        const to_location_autocomplete = {
            value: this.state.to_location,
            onChange: (_to_location) => (this.setState({ to_location: _to_location }))
        }

        const placesAutocompleteOptions = {
            types: ['address']
        }

        const placesAutocompleteCustomStyle = {
            autocompleteContainer : { zIndex: 999 }
        }

        return (
            <div>
                <NavBar/>
                <Container text>
                    <Header as='h2'>
                        Request Drive
                    </Header>

                    <Form autoComplete="on" onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>From</label>
                            <PlacesAutocomplete inputProps={from_location_autocomplete} 
                                styles={placesAutocompleteCustomStyle} options={placesAutocompleteOptions}/>
                        </Form.Field>
                        <Form.Field>
                            <label>To</label>
                            <PlacesAutocomplete inputProps={to_location_autocomplete} 
                                styles={placesAutocompleteCustomStyle} options={placesAutocompleteOptions}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Date</label>
                            <DatePicker name="travel_date" selected={travel_date} minDate={moment()} maxDate={moment().add(100, 'd')}
                                onChange={ (e) => this.setState({ travel_date: e }) } required/>
                        </Form.Field>
                        <Form.Field>
                            <label>Start Time</label>
                            <Dropdown name='travel_time' value={travel_time} fluid multiple search selection 
                                options={timeOptions} onChange={ (e, data) => this.setState({ travel_time: data.value}) } required/>
                        </Form.Field>
                        <Form.Field>
                            <label>Seats available</label>
                            <input type='number' name='seats_available' value={seats_available} 
                                onChange={ (e) => this.setState({ seats_available: e.target.value }) } required/>
                        </Form.Field>
                        <Form.Field>
                            <label>Comment (if any)</label>
                            <TextArea autoHeight name='comment' value={comment}
                                 onChange={ (e) => this.setState({ comment: e.target.value }) }/>
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>

                    {   this.state.invalid ?
                        <Message
                            error
                            size='mini'
                            header='Oops ...'
                            content='Something went wrong. Please try again.'
                        />
                        :
                        null
                    }

                </Container>
            </div>
        );
    }
}

export default Drive;