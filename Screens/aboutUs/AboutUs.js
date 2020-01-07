import React, { Component } from 'react';
import MyHeader from '../header/Header';
import AboutUsBody from './AboutUsBody';
import { Container, View, Button, Icon, Fab, Text } from 'native-base';

export default class AboutUs extends Component {
    static navigationOptions = {
        header: null
    };
    render() {
        return (
            <Container>
                <MyHeader title={"AboutUs"} backarrow={true}/>
                <AboutUsBody />
            </Container>
        );
    }
}