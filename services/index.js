'use strict'
//-------------------------------------servicios-------------------------------
const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken (user) {
    const payload = { //payload: parte del token
        sub: user._id,
        iat: moment().unix(), //creación del token
        exp: moment().add(14, 'days').unix, //14 días, expiración de token
    }
    return jwt.encode(payload, config.SECRET_TOKEN) //lo codifica, con el payload y el secreto
}

function decodeToken(token){
    const decoded = new Promise((resolve, reject) =>{ //resolve: promesea resuleta, reject: la promesa no se pudo cumplir
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN)
            //var decoded = jwt.verify(token, 'shhhhh');
            if(payload.exp <= moment().unix){
                reject({
                    status: 401,
                    massage: 'El token ha expirado'
                })
            }

            resolve(payload.sub) //sub: id del usuario

        }catch(err){
            reject({
                status: 500,
                massage: "Invaled Token"
            })
        }
    })

    return decoded
}

module.exports = {
    createToken,
    decodeToken
}