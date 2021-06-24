import React, { Component } from 'react';
import { View, Text,  ScrollView, StyleSheet } from 'react-native';

export default class Privacy_component extends Component
{
    constructor(props){
        super(props);

        this.state = {
        }
        
    }


    render() {
        return(
            <ScrollView style={styles.container}>
                <View style={styles.center}><Text style={styles.title}>Conditions Générales d’utilisation</Text></View>

                <View style={[styles.left, styles.bottom]}>
                    <Text style={styles.subTitle}>Sommaire :</Text>

                     <Text style={[styles.puce]}> <Text style={styles.content}>Objet</Text> </Text> 
                     <Text style={[styles.puce, styles.summaryTop]}> <Text style={styles.content}>Définitions</Text></Text> 
                     <Text style={[styles.puce, styles.topSpacing]}><Text style={styles.content}>Mentions Légales</Text></Text> 
                     <Text style={[styles.puce, styles.topSpacing]}><Text style={styles.content}>Accès aux services et modifications des services</Text></Text> 
                     <Text style={[styles.puce, styles.topSpacing]}><Text style={styles.content}>Hébergement</Text></Text> 
                     <Text style={[styles.puce, styles.topSpacing]}><Text style={styles.content}>Utilisation de l'application</Text></Text> 
                     <Text style={[styles.puce, styles.topSpacing]}><Text style={styles.content}>Durée du Contrat</Text></Text> 
                     <Text style={[styles.puce, styles.topSpacing]}><Text style={styles.content}>Evolution des conditions générales d’utilisations</Text></Text> 
                     <Text style={[styles.puce, styles.topSpacing]}><Text style={styles.content}>Propriété intellectuelle</Text></Text> 

                     <Text style={styles.subTitle}>Article 1 : Objet </Text>
                     <Text style={[styles.content, styles.textTopSpacing]}>Les présentes « conditions générales d’utilisation » ont pour objet l’encadrement juridique des modalités de mise à disposition des services de l'application Synonyme du mot et leur utilisation par « l’utilisateur ».</Text>
                     <Text style={[styles.content, styles.textTopSpacing]}>Ce contrat est conclu entre :</Text>
                     <Text style={[styles.puce, styles.minTop]}><Text style={styles.content}>L'application, ci-après désigné « l’Éditeur »,</Text></Text> 
                     <Text style={[styles.puce, styles.minTop]}><Text style={styles.content}>Toute personne physique ou morale souhaitant accéder à l'application et à ses services, ci-après appelé « l’Utilisateur ».</Text></Text> 

                     <Text style={[styles.content, styles.textTopSpacing]}>Les conditions générales d’utilisation doivent être acceptées par tout utilisateur souhaitant</Text>
                     <Text style={[styles.contentText]}>accéder à l'application. Elles constituent le contrat entre l'application et l’utilisateur. L’accès à l'application par l’utilisateur signifie son acceptation des présentes conditions générales d’utilisation. En cas de non-acceptation des conditions générales d’utilisation stipulées dans le présent contrat, l’utilisateur se doit de renoncer à l’accès des services proposés par l'application. Synonyme du mot se réserve le droit de modifier unilatéralement et à tout moment le contenu des présentes conditions générales d’utilisation.</Text>

                     <Text style={styles.subTitle}>Article 2 : Définitions </Text>

                     <Text style={[styles.content, styles.textTopSpacing]}>La présente clause a pour objet de définir les différents termes essentiels du contrat :</Text>

                     <Text style={[styles.puce, styles.minTop]}><Text style={styles.content}>Utilisateur : ce terme désigne toute personne qui utilise l'application ou l’un des services proposés par l'application.</Text></Text> 
                     <Text style={[styles.puce, styles.minTop]}><Text style={styles.content}>Contenu utilisateur : ce sont les données transmises par l’utilisateur au sein de l'application.</Text></Text> 

                     <Text style={styles.subTitle}>Article 3 : Mentions légales</Text>

                     <Text style={[styles.content, styles.textTopSpacing]}>Voici les informations légales de l'application Synonyme du mot, conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l’économie numérique, dite L.C.E.N. :</Text>

                     <Text style={[styles.content, styles.textTopSpacing]}>Informations légales :</Text>

                     <Text style={[styles.puce, styles.minTop]}><Text style={[styles.content, styles.textTopSpacing]}>Statut du propriétaire : SAS</Text></Text>
                     <Text style={[styles.puce, styles.minTop]}><Text style={[styles.content, styles.textTopSpacing]}>Nom de la Société : Silverlab.io</Text></Text>

                     <Text style={styles.subTitle}>Article 4 : Accès aux services et <Text> modifications des services </Text> </Text>

                     <Text style={[styles.content, styles.textTopSpacing]}>Tout Utilisateur ayant accès à internet peut accéder gratuitement et depuis n’importe sur un téléphone Android ou Apple où à l'application. Les frais dépensés par l’Utilisateur pour y accéder (connexion internet, matériel informatique, etc.) ne sont pas à la charge de l’Éditeur. Tout événement dû à un cas de force majeure ayant pour conséquence un dysfonctionnement du réseau ou du serveur n’engage pas la responsabilité de l'application Synonyme du mot. l'application et ses différents services peuvent être interrompus ou suspendus par l’Éditeur, notamment à l’occasion d’une maintenance, sans obligation de préavis ou de justification. L’utilisateur s’oblige à ne réclamer aucune indemnisation suite à l’interruption, à la suspension ou à la modification du présent contrat.</Text>

                     <Text style={styles.subTitle}>Article 5 : Hébergement </Text>

                     <Text style={[styles.content, styles.textTopSpacing]}>L’hébergement est assuré par OVH :</Text>
                     
                     <Text style={[styles.puce, styles.minTop]}><Text style={[styles.content, styles.textTopSpacing]}>OVH SAS au capital de 10 000 000 €</Text></Text>
                     <Text style={[styles.puce, styles.minTop]}><Text style={[styles.content, styles.textTopSpacing]}>RCS Roubaix – Tourcoing 424 761 419 00045</Text></Text>
                     <Text style={[styles.puce, styles.minTop]}><Text style={[styles.content, styles.textTopSpacing]}>Code APE 6202A - N° TVA : FR 22 424 761 419</Text></Text>
                     <Text style={[styles.puce, styles.minTop]}><Text style={[styles.content, styles.textTopSpacing]}>Siège social : 2 rue Kellermann - 59100 Roubaix - France.</Text></Text>

                     <Text style={styles.subTitle}>Article 6 : Utilisation de l'application </Text>

                     <Text style={[styles.content, styles.textTopSpacing]}>Les services de Synonyme du mot sont financés en partie par les revenus liés à la publicité. Ces revenus publicitaires sont nécessaires pour permettre à l’éditeur de l'application un libre accès à ces services. l'application permet à l’utilisateur un accès gratuit aux différents contenus utilisateur reliés aux numéros de téléphone. Afin d’assurer la pérennité de nos services, nous vous recommandons de ne pas utiliser de bloqueur de publicité sur l'application.</Text>

                     <Text style={styles.subTitle}>Article 7 : Durée du contrat </Text>

                     <Text style={[styles.content, styles.textTopSpacing]}>La durée du présent contrat est indéterminée. Le contrat produit ses effets à l'égard de l'Utilisateur à compter du début de l’utilisation du service.</Text>

                     <Text style={styles.subTitle}>Article 8 : Évolution des conditions générales d’utilisation </Text>
                     <Text style={[styles.content, styles.textTopSpacing]}>l'application Synonyme du mot se réserve le droit de modifier les clauses de ces conditions générales d’utilisation à tout moment et sans justification.</Text>

                     <Text style={styles.subTitle}>Article 9 : Propriété intellectuelle </Text>

                     <Text style={[styles.content, styles.textTopSpacing]}>Les contenus de l'application Synonyme du mot (logos, textes, éléments graphiques, vidéos, etc.) sont protégés par le droit d’auteur, en vertu du Code de la propriété intellectuelle. L’Utilisateur devra obtenir l’autorisation de l’éditeur de l'application avant toute reproduction, copie ou publication de ces différents contenus. L’Utilisateur est entièrement responsable de tout contenu qu’il met en ligne et il s’engage à ne pas porter atteinte à un tiers. Ainsi que de respecter la politique en vigueur concernant l’ajout d’une évaluation concernant un numéro de téléphone présent dans les conditions générales d'ajouts de commentaire. L’Éditeur de l'application se réserve le droit de modérer ou de supprimer librement et à tout moment les contenus mis en ligne par les utilisateurs, et ce sans justification, notamment s’ils ne correspondent pas aux conditions générales d'ajouts de commentaire. Il est également formellement interdit d’utiliser des robots automatisés / ou algorithme de scraping, pour collecter ou stocker des données pour un quelconque usage, qu’il soit personnel ou commercial.</Text>
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff'
    }, 

    center:{
        alignItems:'center'
    },

    left:{
        paddingLeft:30
    },

    minTop:{
        paddingTop:10
    },

    title:{
        fontWeight:'bold',
        color:'#152c5b',
        fontSize:20,
        marginTop:30
    },

    subTitle:{
        color:'#152c5b',
        fontSize:20,
        marginTop:20
    },

    puce: {
        fontSize:30,
        marginLeft:13,
        color:'#718096',
    },

    content:{
        color:'#718096',
        fontSize:13,
        width:'90%'
    },

    topSpacing:{
        marginTop:10,
        marginLeft:20
    },

    textTopSpacing:{
        marginTop:10,
        lineHeight:20
    },

    contentText:{
        color:'#718096',
        fontSize:13,
        width:'90%'
    },

    bottom:{
        marginBottom:200
    },

    summaryTop:{
        marginTop:-10
    }

});