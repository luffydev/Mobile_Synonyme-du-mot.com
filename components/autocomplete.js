import React, { Component } from 'react';
import { View, Text,  ScrollView, Platform } from 'react-native';
import { Button } from 'material-bread';

const styles = {
    container: {
        backgroundColor:"#fff",
        width:300,
        zIndex:450,
        borderRadius:30,
        flex:1,
        position:'absolute',
        marginTop:130,
        overflow:'hidden'
    },

    content: {
        flexDirection: "row",
        flex: 1,
        paddingLeft: 10, //if you need separation.
        color:"#152c5b",
        textAlign:'left'
    },

    subcontent: {
        height:30,
        width:'100%',
        textAlign:'left'
    },

    text: {
        color:'#152c5b',
    },

    bold: {
        fontWeight:'bold',
    },

    ios_fix: {
        marginTop:138,
        left:40
    },

    android_fix: {
        marginTop:145,
    }
}

const ucFirst = (pStr) => {
    return pStr.charAt(0).toUpperCase() + pStr.slice(1);
}

const AutoCompleteContainer = (props) => {

    

    return (
        <ScrollView style={[styles.container, Platform.OS === 'ios' && styles.ios_fix, Platform.OS === 'android' && styles.android_fix]}>
            {props.parent.state.data.map((lData, lI) => {                
                return(
                    <View style={styles.content} key={lI.toString()}>
                        <View style={styles.subcontent}>
                            <Button key={lI} type="text" textColor={'#152c5b'} style={{textAlign:'left', width:'100%', justifyContent: "flex-start"}}
                             onPress={() => {props.parent.props.onItemSelect(lData)}}>

                                <Text style={{color:'#152c5b', textAlign:'left'}}>
                                    <Text key='test' style={{fontWeight:'bold'}}>
                                        {lData.word.substring(0, lData.word.indexOf(props.parent.props.query))}{ ucFirst(props.parent.props.query)}
                                    </Text>
                                    {lData.word.slice(props.parent.props.query.length)}
                                </Text>
                            </Button>

                        </View>
                    </View>
                )

            })
        }
        </ScrollView>
    );
}

export default class Autocomplete_component extends Component
{
    constructor(props){
        super(props);

        this.state = {
            data : []
        }

        this.componentDidUpdate = (pPrevProps, pPrevState) => {

            
            if(this.props.data.length == 0 && this.state.data.length > 0)
                this.setState({data : []});
            else
            {
                if(this.props.data.length > 0 && (this.state.data.length == 0 || this.props.data != this.state.data))
                    this.setState({data: this.props.data})
            }

            
        }
        
    }


    render() {
            {
              if(this.state.data.length > 0){
                return (
                    <AutoCompleteContainer parent={this} />
                )
              }else
                return null;
            }        
    }
}