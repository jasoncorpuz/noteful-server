const path = require('path')
const express = require('express')
const xss = require('xss')
const FoldersServices = require('./folders-services')

const foldersRouter = express.Router()
const jsonParser = express.json()

const serializeFolder = folder => ({
    id: folder.id,
    folder_name: xss(folder.folder_name)
})

foldersRouter
    .route('/') //get all folders
    .get((req, res, next) => {
        const knex = req.app.get('db')
        FoldersServices.getAllFolders(knex)
            .then(folders => {
                res.json(folders.map(serializeFolder))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { folder_name } = req.body
        const newFolder = { folder_name }
        const knex = req.app.get('db')
        if(!folder_name) {
            return res.status(400).json({
                error: { message: 'Must have a folder name'}
            })
        }

        FoldersServices.insertFolder(knex, newFolder)
         .then(folder => {
             res 
              .status(201)
              .location(path.posix.join(req.originalUrl, `/${folder.id}`))
              .json(serializeFolder(folder))
         })
         .catch(next)
    })

    foldersRouter
     .route('/:id')
     .all((req, res, next) => {
        FoldersServices.getById(
          req.app.get('db'),
          req.params.id
        )
          .then(folder => {
            if (!folder) {
              return res.status(404).json({
                error: { message: `folder doesn't exist` }
              })
            }
            res.folder_name = folder
            next()
          })
          .catch(next)
      })
     .get((req,res,next) => {
         res.json(serializeFolder(res.folder_name))
     })
     .delete((req,res,next) => {
         FoldersServices.deleteFolder(
             req.app.get('db'),
             req.params.id
         )
            .then(affected => {
                res.status(204).end()
            })
        .catch(next)
     })
      
module.exports = foldersRouter