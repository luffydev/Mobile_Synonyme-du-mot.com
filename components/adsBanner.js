import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';

import CONFIG from './../config';

export default class AdsBanner extends Component
{
    constructor(props){
        super(props);

        this.state = {
            adsBannerID: '',
            alignAdsStyle: '',
        };

        this.buildAdsConfig = () => {

            if(this.state.adsBannerID == '')
            {
                if(Platform.OS === 'ios')
                    this.setState({adsBannerID: CONFIG.ADS_IOS_UNIT_ID});

                if(Platform.OS === 'android')
                    this.setState({adsBannerID: CONFIG.ADS_ANDROID_UNIT_ID});
            }            
        }
    }

    componentDidMount(){
        this.buildAdsConfig();

        if(this.state.alignAdsStyle == '')
        {
            switch(this.props.align)
            {
                case 'bottom':
                    this.setState({alignAdsStyle: styles.bottom});
                break;

                case 'top':
                default:
                    this.setState({alignAdsStyle: styles.top});
                break;
            }

            
        }
    }

    render(){
        return (
            <View style={this.state.alignAdsStyle}>
                <AdMobBanner
                    bannerSize='banner'
                    adUnitID={this.state.adsBannerID}
                    servePersonalizedAds={true}
                    onDidFailToReceiveAdWithError={error => console.log(error)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    bottom:{
        marginTop:270,
        borderWidth:0,
        shadowOpacity:0
    },

    top:{
        marginTop:-20,
        marginBottom:30
    }
});