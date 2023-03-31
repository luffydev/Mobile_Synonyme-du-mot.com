import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import uuid from 'react-native-uuid';

import { Icon } from 'material-bread';

import Constants from 'expo-constants';
import UpdateModal from './UpdateModal';

const DB_STATE = {
  STATE_OK : 1,
  STATE_NEED_UPDATE: 2
}

import { material } from 'react-native-typography'
import * as Progress from 'react-native-progress';

import DownloadManager from '../SDK/DownloadManager';
import Net from '../SDK/Net';
import CONFIG from '../config';
import Database from '../SDK/Database';

global.DatabaseHandler = new Database;
global.playstoreID = "";

export default class Loading extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      progress: 0.0,
      loadingText : 'Chargement ...',
      onFinish:false,
      currentHash: '',
      currentSize: 0,
      currentVersion: '',      
      backupFavorite: [],
      showModal: false,
      loadingError: true,
      playStoreID: '',
      appstoreID: '',
      updated: false,
    }
    
    this.currentHash = '';
    this.onLoaded = props.onLoaded;
  }

  chargeProgressbar = () => {

    var lPtr = this;

    setInterval(() => {

      if(this.state.progress < 1)
      {
        var lProgress = this.state.progress + 0.03;
        this.setState({ progress: lProgress });
      }else
      {
        if(this.onLoaded != null)
          this.onLoaded();
      }
    }, 500);
  }


  componentDidMount()
  {
    this._isMounted = true;
    console.log("MOUNTED");
    
    this.startNetService();
  }

  updateProgress = (pProgress) => {

    this.setState({ loadingText: Math.round(pProgress * 100)+ "%"});
    this.setState({ progress: pProgress });

    if(this.state.progress >= 1)
      this.finishLoading();

      
  }

  startNetService = () => {

    const lNetService = new Net();
    var lPtr = this;

    if(this.state.loadingError == true)
      this.setState({loadingError: false});


    lNetService.getData('size.php').then((pData) => 
    {
        lPtr.setState({loadingText : 'Chargement ...'});


        var lData = pData.data;

        
        console.log(lData.play_store_id);

        // DB Size from the server
        lPtr.setState({currentSize: lData.size});

        // Server DB Hash for update check
        lPtr.setState({currentHash: lData.hash}); 

        // Current application version
        lPtr.setState({currentVersion: lData.version});

        // App play_store id
        global.playStoreID = lData.play_store_id;

        // App app_store id
        lPtr.setState({appstoreID: lData.app_store_id});

        const lDownloadManager = new DownloadManager();

        lDownloadManager.fileExist(CONFIG.DATABASE_LOCAL_FILENAME).then((pResult) => {
          
          if(!('exists' in pResult) || pResult.exists !== true || pResult.size === 0)
            lDownloadManager.downloadFile(CONFIG.BASE_PROTOCOL + '://' + CONFIG.BASE_URL + '/' + CONFIG.DATABASE_DIST_FILENAME, CONFIG.DATABASE_LOCAL_FILENAME, this, lPtr.state.currentSize, () => {
              this.finishLoading();
          });
          else
		  {
			  console.log("finish");
            this.finishLoading();
		  }

        });

    }).catch( (pError) => {
        
		console.log("TEST");
		console.log(pError);
        lPtr.setState({loadingError: true});
        lPtr.setState({loadingText: 'Erreur de chargement'});

    });
    
  }

  checkForDatabaseUpdate = (offlineMode) => {

    var lPtr = this;

    var lPromise = new Promise((pResolve, pReject) => 
    {

      if(offlineMode)
      {
        pResolve({state:DB_STATE.STATE_OK});
        return;
      }

      

      global.DatabaseHandler.query("SELECT hash FROM settings").then(function(pResult)
      {

          console.log(pResult);

      
      
          if(!pResult.rows.length)
          {
              global.DatabaseHandler.query("INSERT INTO settings VALUES(?)", [lPtr.state.currentHash]);
              pResolve({state:DB_STATE.STATE_OK});

              return;
          }

          console.log("TEST");

          let lHash = pResult.rows._array[0].hash;
          console.log("LOCAL HASH : ", lHash);

          if(lHash == lPtr.state.currentHash)
          {
              
              pResolve({state:DB_STATE.STATE_OK});
              return;
          }  

          lPtr.backupFavorite().then(pData => {

              lPtr.setState({backupFavorite: pData.favorite});
              //global.DatabaseHandler.close();
              pResolve({state:DB_STATE.STATE_NEED_UPDATE});

          }).catch(() => {

            console.log("test zerpijeroiezjrzoejrzoiejrzeoijrzeoirjzoierjzejoirj");
            lPtr.setState({backupFavorite: pData.favorite});
              //global.DatabaseHandler.close();
            pResolve({state:DB_STATE.STATE_NEED_UPDATE});

          });

      }).catch(() => {

        console.log("TEST CATCH");
        pResolve({state: DB_STATE.STATE_NEED_UPDATE});

      });

    })

    return lPromise;
}

backupFavorite = () => 
{
    var lPromise = new Promise((pResolve, pReject) => {

    global.DatabaseHandler.query("SELECT * FROM favorite").then((pResult) => {

      if(pResult.rows.length == 0)
        pResolve({favorite: []});
      else
        pResolve({favorite: pResult.rows._array});

    }).catch(() => {
      pResolve({favorite: []});
    });

  });

  return lPromise;

}

updateDatabase = () => {

  var lPtr = this;
  
  var lPromise = new Promise((pResolve, pReject) => 
  {
      const lDownloadManager = new DownloadManager();

      lPtr.setState({ loadingText : 'Mise a jour ...' });

      lDownloadManager.downloadFile(CONFIG.BASE_PROTOCOL + '://' + CONFIG.BASE_URL + '/' + CONFIG.DATABASE_DIST_FILENAME, CONFIG.DATABASE_LOCAL_FILENAME, this, lPtr.state.currentSize, () => 
      {
        console.log("test");
          pResolve();
      });
  });

  return lPromise;
  
}

offlineMode = () => {
  this.finishLoading(true, true);
}

reload = () => {
  this.setState({loadingText:'Rechargement ...'});
  this.startNetService();
}

  finishLoading = (ignoreUpdate = false, offlineMode = false) => {

    if(this.state.onFinish === true || !this._isMounted)
      return;

    this.setState({ progress: 10});

    global.DatabaseHandler.setDatabase(CONFIG.DATABASE_LOCAL_FILENAME);
    global.DatabaseHandler.open();

    var lPtr = this;

    if(offlineMode)
      this.setState({loadingText:'Ouverture ...'});

    setTimeout(() => {

        if( (Constants.manifest.version != this.state.currentVersion) && ignoreUpdate == false)
        {
          this.setState({showModal:true});
          return;
        }

        lPtr.setState({ onFinish: true});

          this.checkForDatabaseUpdate(offlineMode).then( pUpdateResult => 
            {


                    while(lPtr.state._isMounted == false)
                      continue;

                    if(pUpdateResult.state == DB_STATE.STATE_NEED_UPDATE && lPtr.state.updated == false)
                    {
                        lPtr.setState({ updated : true});
                        console.log("UPDATE");

                       
                        
                        lPtr.updateDatabase().then( () => {



                          global.DatabaseHandler.query(CONFIG.DATABASE_FAVORITE_TABLE_SQL).then(function(pResult)
                          {

                            if(lPtr.state.backupFavorite.length > 0)
                            {
                                console.log("BACKUP FAVORITE");
                                console.log(lPtr.state.backupFavorite);
            
                                lPtr.state.backupFavorite.map((lElement, lI) => {
                                    global.DatabaseHandler.query('INSERT INTO favorite(word) VALUES("'+ lElement.word +'")');
                                });
                            }

                              lPtr.setState({ loadingText : 'Finalisation...' });
        
                              setTimeout(() => {
              
                                  if(lPtr.onLoaded != null)
                                      lPtr.onLoaded.setState({mainLoaded: true});
              
                              }, 1000);

                              });

                        });
                        
                    }else{
                      lPtr.setState({ loadingText : 'Finalisation...' });
    
                      setTimeout(() => {
      
                          if(lPtr.onLoaded != null)
                              lPtr.onLoaded.setState({mainLoaded: true});
      
                      }, 1000);

                    }
            });
  }, 1500);
    
    

  }

  render() {
    return (
            <View style={styles.container}>
              <Image style={styles.bgImage} source={require('./../assets/final_bg.png')} resizeMode='center' />
             
              <UpdateModal showModal={this.state.showModal} parent={this} appstoreID={this.state.appstoreID} playStoreID={this.state.playStoreID} />

              <View style={styles.loading}>
                  <Text style={[material.title, styles.loadingText]}>{this.state.loadingText}</Text>          
              </View>

              {this.state.loadingError == false &&

                <View style={styles.loading_bar}>
                  <Progress.Bar progress={this.state.progress} color="#000" width={200}  />
                </View>
                
              }

              {this.state.loadingError == true &&

                <View>
                  <TouchableOpacity style={{ ...styles.openButton, backgroundColor: '#2196F3', marginTop:10, width:180 }} onPress={() => this.reload()}>
                    
                    <View style={{height:30}}>
                        <Icon name="refresh" size={25} color={'#fff'} style={{marginLeft:15, marginTop:2}} /> 
                        <Text style={styles.textStyle}>Recharger</Text>
                    </View>

                  </TouchableOpacity>

                  <TouchableOpacity style={{ ...styles.openButton, backgroundColor: '#FF3232', marginTop:10, width:180 }} onPress={() => this.offlineMode()}>
                                    
                      <View style={{height:30}}>
                          <Icon name="block" size={25} color={'#fff'} style={{marginLeft:15, marginTop:2}} /> 
                          <Text style={{ ...styles.textStyle, paddingLeft:15}}>Mode Hors ligne</Text>
                      </View>

                  </TouchableOpacity>
                </View>
              }
              
            </View>
    );
  }
}

const resizeMode = 'center';

const styles = StyleSheet.create({

  logo: {
    width: 250,
    height: 131,
    paddingTop:0
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop:120
  },

  bgImage:{
    flex: 1,
    position: 'absolute',
    width: '100%',
    top:0,
    height: '50%',
    marginTop:60,
    justifyContent: 'center',
  },

  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:300,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  

  loading: {
    width:240,
    height:50,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    elevation: 5,
    textAlign:'center',
    fontSize:55
  },

  loadingText: {
      color:"#000",
      textAlign:'center',
      alignItems:'center',
      width:250
  },

  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginRight:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:300,
    borderRadius:30,
    backgroundColor:'transparent'
  },
  btnForgotPassword: {
    height:15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom:10,
    width:300,
    backgroundColor:'transparent'
  },
  loginButton: {
    backgroundColor: "#00b5ec",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: 'white',
  },

  btnText:{
    color:"white",
    fontWeight:'bold'
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:-23,
    marginLeft:20
  },

  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});