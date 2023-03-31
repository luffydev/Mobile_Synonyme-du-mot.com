import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Easing, Platform, TouchableOpacity} from 'react-native';
import {IconButton, Button, ProgressCircle, Icon} from 'material-bread';
import * as Speech from 'expo-speech';
import AdsBanner from './adsBanner';

//
export default class Home_component extends Component
{
    constructor(props){
        
        super(props);

        this.animatedValue = new Animated.Value(0);

        this.state = {
            currentTerm : {},
            ucWord: '',
            synonyms: [],
            antonyms: [],
            favoriteIcon: 'favorite-border',
            favoriteIconColor : '#acb5c7',
            showHome : true,
            fadeValue: new Animated.Value(0)
        }

        this.ucFirst = (pStr) => {
            return pStr.charAt(0).toUpperCase() + pStr.slice(1);
        }

        this._start = () => {

            console.log(this.state.fadeValue);

            Animated.timing(this.state.fadeValue, {
              toValue: 1,
              duration: 1000,
              useNativeDriver:true,
              easing:Easing.circle
            }).start();
        };
       

        var lPtr = this;
        var lParent = props.parent;

        this.showLoader = () => {
            this.setState({needLoader: true});
        }

        this.getParent = () => {
            return lParent;
        }

        this.loadTerm = (pObject) => {

            this.getParent().setState({needLoader:true});

            global.DatabaseHandler.query("SELECT id, word, synonyms, antonyms, cm, (SELECT COUNT(favorite.id) FROM favorite WHERE favorite.word = s.word) AS is_favorite FROM synonyms s WHERE id = ?", [pObject.id]).then((pResult) => {

                let lRow = pResult.rows._array[0];

                if('synonyms' in lRow && 'antonyms' in lRow)
                {                    
     
                    let lSynonyms = lRow.synonyms.split('|');
                    let lAntonyms = lRow.antonyms.split('|');

                    /*var lSynonymsIn = lSynonyms.map(function (a) { return "'" + a.replace('\\', '').replace("'", "''") + "'"; }).join();
                    console.log(lSynonymsIn);*/

                    lSynonyms.pop();
                    lAntonyms.pop();

                    lPtr.setState({synonyms: lSynonyms});
                    lPtr.setState({antonyms: lAntonyms});

                    lPtr.setState({currentTerm: pResult.rows._array[0]});

                    lPtr.getParent().setState({needLoader:false});

                    lPtr.forceUpdate();
                }
            })
        }

        this.loadWord = async (pWord) => {

            global.DatabaseHandler.query("SELECT id FROM synonyms WHERE word = ?", [pWord]).then( (pResult) => {
                
                if(!pResult.rows.length)
                    alert("Mot introuvable");
                else
                {
                    this.getParent().setState({needLoader:true});
                    this.setState({currentTerm: {}});

                    let lRow = pResult.rows._array[0];

                    lPtr.getParent().openHome(lRow.id);
                }
                
            });
        }

        this.resetTerm = () => {
            this.setState({currentTerm: {}});
        }

        this.addToFavorite = () => {

            var lPtr = this;
            var lTerm = this.state.currentTerm;
            
            this.updateDatabase().then(() => {

                if(lTerm.is_favorite >= 1)
                    lTerm.is_favorite = 0;
                else 
                    lTerm.is_favorite = 1;

                this.setState({currentTerm: lTerm});
            });

            
        }

        this.updateDatabase = () => {
            let lQuery = "INSERT INTO favorite VALUES(NULL, ?)";

            if(this.state.currentTerm.is_favorite >= 1)
                lQuery = "DELETE FROM favorite WHERE word = ?";

            return global.DatabaseHandler.query(lQuery, [this.state.currentTerm.word]);
        }

        this.speachWord = async (pWord) => {

            var lOptions = {};

            if(Platform.OS === 'android')
                lOptions = {pitch: 1.0, rate: 0.8};

            Speech.speak(pWord, lOptions);
        }

        this.componentDidMount = () => {
        }
    }

    

    render() {

        return (

            <View>
                <View style={styles.body}>

                {this.getParent().state.needLoader &&
                    <View style={styles.progressContainer}>
                        <ProgressCircle color={'#152c5b'} determinate={false} size={50} />
                    </View>
                }  

                { !('id' in this.state.currentTerm) && !this.getParent().state.needLoader && this.state.showHome &&
                    <Animated.View style={{height:'100%', width:'100%', flex:1, alignItems: 'center'}}>
                        <View>
                            <Text style={styles.titleText}>Je recherche le synonyme du mot</Text>
                            <Text style={styles.baseText}>Trouve le synonyme le mieux adapté afin d'obtenir une tournure de phrase soignée</Text>
                        </View>


                        <AdsBanner align='bottom' />
                    </Animated.View>
                }

                { 'id' in this.state.currentTerm &&
                    <View style={styles.body}>

                            <AdsBanner align='top' />

                            <Text style={styles.subTitleText}>{this.state.ucWord} 
                                <View>
                                    <IconButton name={parseInt(this.state.currentTerm.is_favorite) === 1 ? 'favorite' : 'favorite-border'} size={24} color={this.state.currentTerm.is_favorite >= 1 ? '#ff0042' : '#acb5c7'} onPress={() => { this.addToFavorite() }} style={{width:50}} />
                                </View>

                                <TouchableOpacity
                                    style={styles.speakButton}
                                    onPress={() => {this.speachWord(this.state.currentTerm.word)}}
                                >
                                    <Icon name="volume-up" size={24} color={'#152c5b'} />
                                </TouchableOpacity>
                            </Text>

                            <ScrollView style={styles.textContainer} contentContainerStyle={{ marginBottom: 500 }} ref={ref => this.scrollView = ref}
                                        onContentSizeChange={() => {this.scrollView.scrollTo({ y : 0 })}}>

                                <Text style={styles.titleContentText, styles.startScroll}>Synonymes de <Text style={styles.bold}>{this.state.ucWord}</Text></Text>

                                {this.state.synonyms.map((lSynonyms, lI) => {
                                    return(
                                        <Button key={lI} type="text" textColor={'#152c5b'} style={[lI == 0 && styles.first ,styles.button, lSynonyms == '' && styles.displayNone]} onPress={() => this.loadWord(lSynonyms)}>
                                            <Text key={lI} style={styles.contentText}>{this.ucFirst(lSynonyms.replace('\\', ''))}</Text>
                                        </Button>
                                    )
                                })}

                            
                            <Text style={[styles.antonymTitle, styles.titleContentText, this.state.antonyms.length == 0 && styles.hidden]}>Antonymes de <Text style={styles.bold}>{this.state.ucWord}</Text></Text>

                            {this.state.antonyms.map((lAntonyms, lI) => {
                                    return(
                                        <Button key={lI} type="text" textColor={'#152c5b'} style={[lI == 0 && styles.first, styles.antonymButton, lI == this.state.antonyms.length -1 && styles.endScroll, lAntonyms == '' && styles.displayNone]} onPress={() => this.loadWord(lAntonyms)}>
                                            <Text key={lI} style={[styles.contentText]}>{this.ucFirst(lAntonyms.replace('\\', ''))}</Text>
                                        </Button>
                                    )
                            })}

                            </ScrollView>
                    </View>
                }
            </View>
            </View>
        );
        
    }
}

const styles = StyleSheet.create({

    button:{
        textAlign:'left', 
        width:'100%', 
        justifyContent:"flex-start", 
        marginLeft:-15
    },

    speakButton: {
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.0)",
        width:35,
        height:30,
        paddingTop:5,
        paddingRight:5
      },

    antonymTitle: {
        marginTop:10,
        marginBottom:15
    },

    progressContainer: {
        alignItems:'center',
        paddingTop:120
    },

    antonymButton: {
        textAlign:'left', 
        width:'100%', 
        justifyContent: "flex-start",
        marginLeft:-15
    },

    hidden: {
        opacity:0
    },

    displayNone: {
        display:'none'
    },

    startScroll: {
        marginTop:20,
        marginBottom:20
    },

    endScroll: {
        marginBottom:80
    },  

    body:{
        height:'100%',
        width:'100%',
        backgroundColor: '#eff2f7',
        textAlign:'center',
        alignItems: 'center',
        paddingTop:15,
    },

    titleText: {
      fontSize: 30,
      color:'#152c5b',
      textAlign:'center',
      width:250,
      alignItems:'center',
      marginBottom:10
    },

    titleContentText: {
        fontSize: 15,
        color:'#152c5b',
        textAlign:'left',
        width:250,
      },

    contentText: {
        fontSize: 15,
        color:'#4a59d3',
        textAlign:'left',
        width:250,
        marginBottom:10
      },

      bold: {
        fontWeight:'bold'
      },

    subTitleText: {
        fontSize: 20,
        color:'#152c5b',
        textAlign:'center',
        width:450,
        alignItems:'center',
        marginBottom:10,
        fontWeight:'bold',
      },

    textContainer: {
        fontSize: 13,
        color:'#152c5b',
        backgroundColor:'#fff',
        width:'100%',
        borderColor:'#e7e9ee',
        borderTopWidth:2,
        height:'100%',
        paddingLeft:30,
        paddingBottom:350,
        flex:1,
        marginBottom:140
    },

    baseText: {
        fontSize: 13,
        color:'#152c5b',
        textAlign:'center',
        width:250,
        alignItems:'center',
      }
  });