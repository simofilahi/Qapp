import React, { Component } from 'react';
import MyHeader from './Header';
import AboutUsBody from './AboutUsBody';
import { Container, View, Button, Icon, Fab, Text } from 'native-base';

export default class AboutUs extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props)
        this.state = {
          active: false
        };
      }
    render() {
        return (
            <Container>
                <MyHeader title={"AboutUs"} backarrow={true}/>
                <AboutUsBody />
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{ }}
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomRight"
                        onPress={() => this.setState({ active: !this.state.active })}>
                        <Icon name="share" />
                            <Button style={{ backgroundColor: '#34A34F' }}>
                        <Icon name="logo-whatsapp" />
                        </Button>
                             <Button style={{ backgroundColor: '#3B5998' }}>
                        <Icon name="logo-facebook" />
                        </Button>
                            <Button disabled style={{ backgroundColor: '#DD5144' }}>
                        <Icon name="mail" />
                        </Button>
                    </Fab>
            </Container>
        );
    }
}