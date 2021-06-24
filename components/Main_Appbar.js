import React, { Component } from 'react';
import { View, Keyboard, Text, Share, TextInput, Platform, TouchableOpacity, StatusBar } from 'react-native';
import { Drawer, DrawerItem, DrawerSection, Appbar, IconButton, Icon, Button} from 'material-bread';

import Home_component from './home';
import Favorite_component from './favorite';
import Privacy_component from './privacy';
import Contact_component from './contact';

import Autocomplete_component from './autocomplete';
import CONFIG from './../config';
import * as Notifications from 'expo-notifications';
import * as Analytics from 'expo-firebase-analytics';


const DrawerContent = (props) => {
  return (
    <View>
      <DrawerSection bottomDivider style={{marginTop:30}}>

        <View style={{marginBottom:10, color:'#fff'}}>
            <DrawerItem style={styles.drawerItem} text={'Accueil'} icon={'home'} active={props.currentPtr.state.homeActive} onPress={props.currentPtr.openHome} />
        </View>

        <View style={{marginBottom:10}}>
            <DrawerItem style={styles.drawerItem} text={'Partager'} icon={'share'} onPress={props.currentPtr.openShare} />
        </View>

        <View style={{marginBottom:10}}>
            <DrawerItem style={styles.drawerItem} text={'Mes favoris'} icon={'favorite'} active={props.currentPtr.state.showFavorite} onPress={props.currentPtr.openFavorite} />
        </View>

        <View style={{marginBottom:10, display:'none'}}>
            <DrawerItem style={[styles.drawerItem]} text={'Informations'} icon={'info'} />
        </View>

        <View style={{marginBottom:10}}>
            <DrawerItem style={styles.drawerItem} text={'Contact'} icon={'perm-contact-calendar'} active={props.currentPtr.state.showContact} onPress={props.currentPtr.openContact} />
        </View>

        <View style={{marginBottom:10}}>
            <DrawerItem style={styles.drawerItem} text={'Confidentialité'} icon={'account-balance'} onPress={props.currentPtr.openPrivacy} />
        </View>
        
      </DrawerSection>
    </View>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '100%',
    marginTop: 50
  },

  drawerItem: {
    paddingTop:80,
    backgroundColor:'#000'
  },

  hiddenDrawerItem:{
    display:'none'
  },
 
  searchBar: {
    backgroundColor: '#eff2f7',
    width:'100%',
    height:75,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },

  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    width:300,
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:15,
  },

  acContainerStyle: {
    height: 450,
    width: 240,
    borderRadius: 50,
    top: 55,
    marginTop:15,
    borderWidth:0,
    paddingLeft:10,
    shadowOpacity:0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:10000,
    elevation:10000,
    position:'absolute'
  },

  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
    shadowOpacity:0,
    width:250
  },
  inputIcon:{
    width:30,
    height:30,
    right: 10,
    position:'absolute',
    zIndex:102
  },

  roundButton1: {
    width: 30,
    height: 30,
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#eff2f7',
    position:'absolute',
    right:15,
    paddingLeft:8
  },

  hide:{
    display: 'none'
  },

  appBar_Android:{
    marginTop:StatusBar.currentHeight,
    marginBottom:3
  }
};

var lElement = null;



export default class Main_Appbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      isSearching:false,
      value: '',

      homeActive: true,
      shareActive: false,
      favoriteActive: false,
      privacyActive: false,
      contactActive:false,

      showFavorite: false,
      showHome: true,
      showPrivacy: false,
      showContact: false,

      query: '',
      data: [],
      isEditable:true,
      selecterTerm:0,
      homeElement:null,
      placeHolder: 'Rechercher',
      hideInput:false,
      needLoader:false
    }   

    var lPtr = this;

    this.updateData = (pQuery) => {
      
      this.setState({query : pQuery});

      if(pQuery.length > 1 && pQuery != '')
      {
        global.DatabaseHandler.query("SELECT id, word, (SELECT COUNT(favorite.id) FROM favorite WHERE favorite.word = s.word) AS is_favorite FROM synonyms s WHERE word LIKE '"+pQuery+"%' LIMIT 13").then((pResult) => {
          
          this.setState({data : pResult.rows._array});

        });
      }else
      {
        this.setState({data: []})
      }
    }

    this.openShare = async () => {
        try 
        {
            let lShareConfig = {};

            if(CONFIG.SHARE_MESSAGE)
              lShareConfig['message'] = CONFIG.SHARE_MESSAGE;

            if(CONFIG.SHARE_TITLE)
              lShareConfig['title'];

            if(CONFIG.SHARE_SUBJECT)
              lShareConfig['subject'];

            const result = await Share.share(lShareConfig);

            if (result.action === Share.sharedAction) 
            {
              if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
    }

    this.updateElement = (pRef) => {
      lElement = pRef;
    }

    this.debug = () => {

      var lPtr = this;

      Notifications.getDevicePushTokenAsync().then((pTest) => {
        lPtr.setState({query:pTest.data});

        alert(pTest);
  
      }).catch(() => {
        console.log("ERROR");
        alert("ERROR");
      });
      
    }

    this.openFavorite = () => {

      this.resetState();
      this.resetActive();
  
      this.setState({showFavorite: true});
      this.setState({favoriteActive: true});
    }

    this.openPrivacy = () => {

      this.resetState();
      this.resetActive();

      this.setState({showPrivacy: true});
      this.setState({privacyActive: true});

    }

    this.openContact = () => {
      
      this.resetState();
      this.resetActive();

      this.setState({showContact:true});
      this.setState({contactActive:true});
    }

    this.openHome = (pID = 0) => {

      var lID = (!isNaN(parseInt(pID))) ? parseInt(pID) : 0;

      this.resetState();
      this.resetActive();

      if(lID != 0)
        this.setState({needLoader: true});
      else
        this.setState({needLoader: false});

      this.setState({showHome: true});
      this.setState({homeActive: true});

      Analytics.logEvent('openHome');
      Analytics.setCurrentScreen('homeScreen');

      let lPtr = this;

      if(lID != 0)
      {
        
        global.DatabaseHandler.query("SELECT id, word, (SELECT COUNT(favorite.id) FROM favorite WHERE favorite.word = s.word) AS is_favorite FROM synonyms s WHERE id = ? LIMIT 13", [lID]).then((pResult) => 
        {
            lPtr.setSelectedText(pResult.rows._array[0]);
        });
      }

    }

    this.setSelectedText = (pObject) => {

      let lText = pObject.word.charAt(0).toUpperCase() + pObject.word.slice(1);
      
      if(!this.state.showHome)
      {
        this.openHome();

        setTimeout(() => {
      
          lElement.resetTerm();

          lElement.setState({showHome: false});
          lElement.loadTerm(pObject);
          lElement.setState({ucWord: lText});

        }, 100);

      }else
      {
        lElement.resetTerm();

        lElement.setState({showHome: false});
        lElement.loadTerm(pObject);
        lElement.setState({ucWord: lText});

      }

      
      this.setState({query : lText});
      this.setState({data : []});

      Keyboard.dismiss();
    }

    this.componentDidUpdate = (pPrevProps, pPrevState) => {

      /*Analytics.setDebugModeEnabled(true);

      console.log("TES");*/

      Analytics.setClientId('9dee851b-af3b-4f27-b95e-0a799a12dd8a');

      if(this.state.isOpen)
      {
        
        if(this.state.isEditable)
        {
          this.setState({isEditable: false});
          this.setState({data: []});
          this.setState({hideInput: true});
          this.setState({placeHolder: ''});
        }

        Keyboard.dismiss();
      }

      if(!this.state.isOpen && !this.state.isEditable)
      {
        this.setState({isEditable: true});
        this.setState({placeHolder: 'Rechercher'});
        this.setState({hideInput: false});
      }
    }

    this.componentDidMount = () => {
      console.log('did mount');
    }

    this.cancelInput = () => {
      
      this.setState({query: ''});
      this.setState({data: []});

      Keyboard.dismiss();
    }
  }

  resetActive = () => {
    this.setState({shareActive : false});
    this.setState({favoriteActive : false});
    this.setState({homeActive : false});
    this.setState({privacyActive: false});
    this.setState({contactActive: false});
  }

  resetState = () => {
    this.setState({isOpen: false});

    this.setState({showFavorite: false});
    this.setState({showHome: false});
    this.setState({showPrivacy: false});
    this.setState({showContact: false});
  }
 
  render() {
    return (

      <View style={{position:'relative'}}>

        {Platform.OS === 'android' &&
          <View style={{alignItems:'center', width:'100%'}}>
            <Autocomplete_component 
                  data={this.state.data}
                  query={this.state.query}
                  onItemSelect={(pItem) => {this.setSelectedText(pItem);}}
            />
          </View>       
        }       

        {Platform.OS === 'ios' &&
          
          <Autocomplete_component 
            data={this.state.data}
            query={this.state.query}
            onItemSelect={(pItem) => {this.setSelectedText(pItem);}}
          />

        }    

         
        <Drawer
          open={this.state.isOpen}
          drawerContent={<DrawerContent currentPtr={this} />}
          onClose={() => this.setState({ isOpen: false })}
          animationTime={250}
          drawerStyle={{zIndex:100}}
          needsSafeArea={true}>

          <Appbar
            barType={'regular'}
            title={
                   <View style={{width:'100%', alignItems:'center', flex:0}}>
                       <Text style={{ fontFamily: 'IBMPlexSans', fontSize:20, textAlign:'center', color:'black', width:'100%', alignItems:'center'}}>
                           {CONFIG.APP_TITLE}
                       </Text>
                   </View>
                   }
            navigation={
                        <View>                         
                            <TouchableOpacity activeOpacity={1} style={{width:40, height:60, backgroundColor:'rgba(0, 0, 0, 0.0)', paddingTop:18}} onPress={() => { this.setState({isOpen: true}); }}>
                                <IconButton name="menu"  size={24} color={'black'} onPress={() => this.setState({isOpen: true})} />
                            </TouchableOpacity>
                        </View>
                       }
            onNavigation={() => this.setState({ isOpen: true })}
            style={[{backgroundColor:"white",  shadowOpacity:0, width:'100%', elevation:0}, Platform.OS === 'android' && styles.appBar_Android]}
          />
                
          <View style={styles.body}>

             <View style={styles.searchBar}>
            
              <View style={{width:"100%", alignItems:'center'}}>
                <View style={styles.inputContainer}>
                <TextInput
                      placeholder={'Rechercher'}
                      autoCompleteType='off'
                      autoCorrect={false}
                      style={{
                        fontSize: 19,
                        color: '#000',
                        marginLeft:0,
                        marginTop: 0,
                        backgroundColor: '#fff',
                        borderWidth: 0,
                        width:250,
                        height:40,
                      }}
                      onChangeText={(text) => this.updateData(text)}
                      value={this.state.query}
                    />

                  {this.state.query.length > 0 &&
                    <TouchableOpacity style={styles.roundButton1} onPress={() => { this.cancelInput(); }}>
                      <Icon name="close" size={14} color={'#152c5b'} style={{marginTop:-2}}/>
                    </TouchableOpacity>
                  }
                  
                  {this.state.query.length == 0 &&
                    <IconButton name="search" style={styles.inputIcon} size={24} color={'#ffbf40'} />
                  }

                </View>
              </View>  

              
              
              
             </View>
          </View>



      
          {this.state.showFavorite &&
            <Favorite_component parent={this} />
          }

          {this.state.showHome &&
            <Home_component 
              ref={ref => (this.updateElement(ref))} parent={this} 
            />
          }

          {this.state.showPrivacy &&
            <Privacy_component />
          }

          {this.state.showContact &&
            <Contact_component />
          }

        </Drawer>
        

        </View>

    );
  }
}