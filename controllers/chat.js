'use strict'

const mongoose = require('mongoose')
const Chat = require('../models/chat')
const service = require('../services')

function getChats(req, res){
    Chat.find({}, (err, chats) => {

        if(err) return res.status(500).send({ message:`Error al realizar la petición ${err}` })
        if(!chats) return res.status(404).send({message: `No existen mensajes`})

        res.send(200, { chats })
    })

}

function sendChat(req, res){

    console.log('POST/api/chat')
    console.log(req.body)
  
    let chat = new Chat()
  
    chat.nick = req.body.nick
    chat.msg = req.body.msg
    chat.recept = req.body.recept
   
    chat.save((err, chatStored) => {
        if(err) res.status(500, { message:  `Error al salvar en la base de datos: ${err}`})
  
        res.status(200).send({chat: chatStored})
  
    })

}

//**
//function updateChat(req, res){
//    let chatId = req.params.chatId //accedemos al chat id
//    let update = req.body

//    Chat.findByIdAndUpdate(chatId, update, (err, chatUpdate) =>{
//        if(err) res.status(500).send({message: `Error al actulizar el chat ${err}`})

//        res.status(200).send({ chat: chatUpdate })
        
//    })
//}


function deleteChats(req, es){
    let chatId = req.params.chatId //acceder al id del producto

    Chat.findById(chatId, (err, product) => { //collback
        if(err) res.status(500).send({message: `Error al borrar el producto ${err}`})

        chat.remove(err => {
        if(err) res.status(500).send({message: `Error al borrar el producto ${err}`})

        res.status(200).send({message: `El producto a sido elminido`})
            
        })
    }) //propiedad
}

module.exports = {
    //getChat,
    getChats,
    //updateChat,
    sendChat,
    deleteChats
}