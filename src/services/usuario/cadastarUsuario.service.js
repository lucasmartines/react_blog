import firebase from '../../firebase.config'

export default function cadastrar(email,password){

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert("usuario não pode ser cadastrado")
      });
      
}

