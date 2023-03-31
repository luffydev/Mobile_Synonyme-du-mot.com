import React, { Component } from 'react';
import { StyleSheet, Modal, Text, TouchableOpacity, View, Linking, Platform } from 'react-native';
import { Icon } from 'material-bread';

export default class UpdateModal extends Component
{
    constructor(props){
        super(props);

        this.state = {
            modalVisible: false
        };

        this.ignoreUpdate = () => {

            props.parent.setState({showModal:false});
            props.parent.finishLoading(true);
        };

        this.doUpdate = () => {

            console.log(global.playStoreID);

            if(Platform.OS === 'android') {
                Linking.canOpenURL('market://details?id=' + global.playStoreID ).then(() => {
                    Linking.openURL('market://details?id=' + global.playStoreID );
                })
                .catch();

            } else if (Platform.OS === 'ios') {
                Linking.canOpenURL('itms://itunes.apple.com/us/app/apple-store/' + props.appstoreID).then(() => {
                
                    Linking.openURL('itms://itunes.apple.com/us/app/apple-store/' + props.appstoreID);
                    
                })
                .catch();
            }

        }
    }

    render(){
        return (
            <View style={{backgroundColor:'#000'}}>
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={this.props.showModal}
                    backdropColor="transparent" 
                >
                        <View style={styles.centeredView} >
                            <View style={styles.modalView}>
                                
                                <Icon name="system-update" size={180} color={'#acb5c7'} style={{marginLeft:50, opacity:0.4, marginBottom:50, marginTop:80}} />

                                <Text style={styles.modalText}>Une mise a jour est disponible</Text>

                                <TouchableOpacity style={{ ...styles.openButton, backgroundColor: '#2196F3', marginTop:10 }} onPress={() => {this.doUpdate();}}>
                                    <View style={{height:30}}>
                                        <Icon name="file-download" size={25} color={'#fff'} style={{marginLeft:15, marginTop:2}} /> 
                                        <Text style={styles.textStyle}>Mettre a jour maintenant</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ ...styles.openButton, backgroundColor: '#FF3232', marginTop:10 }} onPress={() => { this.ignoreUpdate(); } }>
                                    <View style={{height:30}}>
                                        <Icon name="cancel" size={25} color={'#fff'} style={{marginLeft:15, marginTop:2}} /> 
                                        <Text style={styles.textStyle}>Ignorer</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    container: {
        width:'100%',
        height:'100%'
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        flex: 1,
        width:350,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },

      openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },

      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop:-23,
        marginLeft:20
      },
      
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize:20
      },

});