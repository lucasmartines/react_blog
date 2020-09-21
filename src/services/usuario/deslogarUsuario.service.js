import firebase from '../../firebase.config'


export default function deslogarUsuario  (deslogado) {
    firebase.auth().signOut().then(function() {

        if( deslogado !== null ) deslogado()

    }).catch(function(error) {
    
    });
    
}  