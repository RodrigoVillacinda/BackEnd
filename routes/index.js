'use strict'

const express = require('express')
const chatCtrl = require('../controllers/chat')
const api = express.Router()
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')


api.get('/chat', chatCtrl.getChats, function(req, res) {
    res.status(200).send({message: 'Tienes acceso' })
}) //obtiene los chats

api.post('/chat', auth, chatCtrl.sendChat, function(req, res) {
    res.status(200).send({message: 'Tienes acceso' })
}) //envía los chats

api.post('/signup', userCtrl.signUp) //retorna token
api.post('/signin', userCtrl.signIn) //retorna token
api.get('/private', auth, function(req, res) {
    res.status(200).send({message: 'Tienes acceso' })
})

//api.put('/chat/:chatId', chatCtrl.updateChat)
//api.delete('/chat/:chatId', chatCtrl.deleteChat)
module.exports = api


