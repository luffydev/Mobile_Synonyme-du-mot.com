import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Icon } from 'material-bread';
import * as Analytics from 'expo-firebase-analytics';
import CONFIG from './../config';

export default class Contact_component extends Component
{
    constructor(props){
        super(props);

        this.state = {
        }   
        
        this.openEmailApp = () => {
            Linking.openURL('mailto:' + CONFIG.CONTACT_EMAIL + '?subject=' + CONFIG.CONTACT_SUBJECT + '&body=' + CONFIG.CONTACT_CONTENT);
        }
    }

    componentDidMount() {
        Analytics.setCurrentScreen('contactScreen');
        Analytics.logEvent('openContact');
    }


    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Contactez nous</Text>

                 <Text style={styles.content}>Utilisez le bouton ci dessous pour nous contacter</Text>

                 <TouchableOpacity style={{ ...styles.openButton, backgroundColor: '#2196F3', marginTop:30 }} onPress={() => { this.openEmailApp() }}>
                    <View style={{height:30}}>
                        <Icon name="email" size={25} color={'#fff'} style={{marginLeft:15, marginTop:2}} /> 
                        <Text style={styles.textStyle}>Nous contacter</Text>
                    </View>
                 </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        alignItems:'center',
        width:'100%',
        height:'100%',
        marginTop:100
    },

    title:{
        fontWeight:'bold',
        color:'#152c5b',
        fontSize:20,
        marginTop:30
    },

    content:{

        color:'#718096',
        fontSize:18,
        width:250,
        marginTop:30,
        marginLeft:50

    },

    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 0,
        width:200
    },

    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop:-22,
        marginLeft:20
      },

});