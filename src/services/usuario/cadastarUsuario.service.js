import firebase from '../../firebase.config'

export default function cadastrar(email,password,name){

  
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( () => {
      
      if(name){
        updateName(name)
      }
      
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
       

        
        
        // ...
        alert("usuario não pode ser cadastrado")
      });
      
}

export function updateName(name) 
{
  var user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name,
  })
  
}
