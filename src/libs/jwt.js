import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../config.js"


export function createAccessToken(payload) {
  console.log("LA clave secreta es: ")
  console.log(TOKEN_SECRET);
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      }
    );

  });
};