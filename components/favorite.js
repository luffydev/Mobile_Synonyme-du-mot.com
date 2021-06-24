import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ProgressCircle, Button } from 'material-bread';

import AdsBanner from './adsBanner';
import * as Analytics from 'expo-firebase-analytics';

export default class Favorite_component extends Component
{
    constructor(props){
        super(props);

        this.state = {
            showLoader: true,
            favoriteList: [],
            parentPtr: props.parent, 
            emptySet: false,   
        }

        this.loadFavorite = () => {

            Analytics.setCurrentScreen('favoriteScreen');

            global.DatabaseHandler.query("SELECT s.id, s.word FROM favorite LEFT JOIN synonyms s ON s.word = favorite.word ORDER BY s.id DESC").then((pResult) => {

                this.setState({showLoader: false});
                
                if(!pResult.rows.length)
                    this.setState({emptySet: true});
                else
                    this.setState({favoriteList: pResult.rows._array});
            });
        }

        this.componentDidMount = () => {

            this.loadFavorite();
            console.log("MOUNTED");
        }

        this.loadTerm = (pID) => {
            this.state.parentPtr.openHome(pID);
        }

        this.ucFirst = (pStr) => {
            return pStr.charAt(0).toUpperCase() + pStr.slice(1);
        }
    }


    render() {
        return (
        <View style={styles.body}>

            <View style={{backgroundColor: '#eff2f7', width:'100%', height:70, marginTop:-20, alignItems:'center', paddingTop:20}}>
                <AdsBanner align='top' />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.titleText}>Mes Favoris</Text>
            </View>

            { this.state.emptySet == true &&
                <View>
                    <Text style={{width:'100%', textAlign:'center', paddingTop:50, fontSize:20, color:'#959697'}}>Aucun résultat ...</Text>
                </View>
            }

            {this.state.showLoader &&
                <View style={styles.progressContainer}>
                    <ProgressCircle color={'#152c5b'} determinate={false} size={50} />
                </View>
            }           

            {!this.state.showLoader &&
                <ScrollView style={{paddingLeft:-150, paddingTop:0}}>
                    {this.state.favoriteList.map((lFavorite, lI) => {
                        return(<Button key={lI} type="text" textColor={'#152c5b'} style={[styles.left, lI == this.state.favoriteList.length -1 && styles.endBottom]} onPress={() => {this.loadTerm(lFavorite.id)}} ><Text style={{fontWeight: '600', textAlign: 'left', position:'absolute', left:30, color:'#152c5b'}}>{this.ucFirst(lFavorite.word)}</Text></Button>)
                    })}
                </ScrollView>
            }

        </View>
        );
    }
}

const styles = StyleSheet.create({

    endBottom:{
        marginBottom:250
    },

    left: {
        textAlign:'left'
    },

    body:{
        height:'100%',
        width:'100%',
        backgroundColor: '#fff',
        paddingTop:20,
        elevation:0, 
        zIndex:0,        
    },

    textContainer: {
        borderBottomColor: '#e7e9ee',
        borderBottomWidth: 1,
        height:60,
        width:'100%',
        paddingTop:15
    },

    titleText: {
      fontSize: 23,
      color:'#152c5b',
      textAlign:'left',
      width:'100%',
      marginLeft:30,
      height:30
    },

    progressContainer: {
        alignItems:'center',
        paddingTop:120
    },

    baseText: {
        fontSize: 13,
        color:'#152c5b',
        textAlign:'center',
        width:250,
        alignItems:'center',
      },

    contentText: {
        fontSize: 15,
        color:'#4a59d3',
        textAlign:'left',
        width:250,
        marginBottom:10
      },
  });