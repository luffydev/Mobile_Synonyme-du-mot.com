import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Loading from './components/Loading'
import Main_Appbar from './components/Main_Appbar'
import Event from './SDK/Event';
import * as Font from 'expo-font';
import * as Analytics from 'expo-firebase-analytics';


global.EventHandler = new Event();


export default class App extends React.Component {

  state = {
    fontsLoaded: false,
    mainLoaded : false
  };

  lPtr = this;
  
  async loadFonts() {
    
    await Font.loadAsync({
      
      IBMPlexSans: require('./assets/fonts/IBMPlexSans.ttf'),

      'Roboto-Light': {
        uri: require('./assets/fonts/Roboto-Light.ttf'),
      },
      
    });

    this.setState({ fontsLoaded: true });
  }

  onLoaded = function(){
    
    if(!this.state.mainLoaded)
      this.setState({mainLoaded: true});
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {

    if (this.state.fontsLoaded) {
      return (
          <View style={styles.container}>

            {this.state.mainLoaded === false &&
              <Loading onLoaded={this.lPtr}></Loading>      
            }

            { this.state.mainLoaded === true &&
              <Main_Appbar></Main_Appbar>
            }

          </View>
        
      );
    }else
      return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

