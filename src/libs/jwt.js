import {TOKEN_SECRET} from "../config.js"


function createAccessToken (payload){
jwt.sign(
    
    payload,
    TOKEN_SECRET,
    'secret123', 
  
  {
    expiresIn :"1d",
  },
  (err, token) =>{
    if(err) console.log(err);
    
}
 );

};