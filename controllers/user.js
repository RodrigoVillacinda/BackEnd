'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

function signUp(req, res){ //método post, para crear el usuario
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    })

    user.save((err) => {
        if(err) res.status(500).send({ message: `Error al crear el usuario: ${err}` })
        
        return res.status(200).send({ token: service.createToken(user) }) //servicio: funciones que ayudan a realizar determinadas acciones 
    })
}

function signIn(req, res){ //método get, para consultar el usuario
    User.findOne( { username: req.body.username, password: req.body.password }, (err, user) => { //el atributo usuario
        if (err) return res.status(500).send({message: err}) 
        if(!user) return res.status(404).send({message: "No existe el usuario || Email o contraseña incorrectos"})

        const password_verification = req.body.password;

        if (password_verification){
            req.user = user
            res.status(200).send({
                message: "Te has logueado correctamente",
                token: service.createToken(user)
            })
        }
        else {
            res.status(500).send({ message: 'Email o Contraseña incorrectos' });
          }

    })
}

function getUser(req, res){
    User.find({}, (err, users) => {

        if(err) return res.status(500).send({ message:`Error al realizar la petición ${err}` })
        if(!chats) return res.status(404).send({message: `No existen mensajes`})

        res.send(200, { users })
    })

}



module.exports = {
    signUp,
    signIn
}