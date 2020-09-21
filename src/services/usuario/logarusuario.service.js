import firebase from '../../firebase.config'

export default function logarUsuario(email,password,error){

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      
        alert("Falha ao logar")
      });
      
}

