const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
    const userData = new User({
        userName: req.body.userName,
        email: req.body.email,
    })
    try {
        // const hashPwd = bcrypt.hashSync(req.body.password, 10)
        // let userObj = new User({...req.body, password: hashPwd })

        const user = await userData.save()

        res.json({
            success: true,
            data: user
        })
    }catch(err){
        res.json({ message: err })
    }
})

router.get('/userList')

router
    .route('/setting/role')
    .get(async (req, res) => {
        try{
            const roles = await Role.find()
            res.json(roles)
        }catch(err){
            res.json({ message: err })
        }
    })
    .post(async (req, res) => {
        const role = new Role({
            role_id: req.body.role_id,
            role_name: req.body.role_name,
            role_description: req.body.role_description
        })

        try{
            const saveRole = await role.save()
            res.json(saveRole)
        }catch(err){
        res.json({ message: err })
    }
    })

    router
    .route('/setting/role/:roleId')
    .get(async (req, res) => {
        console.log()
        try{
            const role = await Role.find({"role_id":req.params.roleId})
            res.json(role)
        }catch(err){
            res.json({ message: err })
        }
    })
    .patch(async (req, res) => {
        try{
            const updateRole = await Role.updateOne(
                {role_id: req.params.roleId},
                {$set: {
                    role_name: req.body.role_name,
                    role_description: req.body.role_description
                }}
            )
            res.json(updateRole)
        }catch(err){
            res.json({ message: err })
        }
      })
      .delete(async (req, res) => {
        try{
            const removedRole = await Role.remove({role_id: req.params.roleId})
            res.json(removedRole)
        }catch(err){
            res.json({ message: err })
        }
      })
    







module.exports = router