const express = require('express')
const Employee = require('../models/employee')
const auth = require('../middlewares/auth')

const router = new express.Router()

router.get('/employee', auth, async (req, res) => {

    try {
        const employees = await Employee.find({})

        if (!employees) {
            return res.status(404).send()
        }

        res.status(200).send(employees)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/employee', auth, async (req, res) => {
    const employee = new Employee(req.body)

    try {
        await employee.save()

        res.status(201).send(employee)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/employee/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const availableUpdates = ['name', 'email', 'position', 'branch']
    const isValidOperation = updates.every((update) => {
        return availableUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        const employee = await Employee.findOne({ _id: req.params.id })

        if (!employee) {
            return res.status(404).send()
        }

        updates.forEach((update) => employee[update] = req.body[update])
        await employee.save()
        res.send(employee)

    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/employee/:id', auth, async (req, res) => {
    try{

        const employee = await Employee.findOne({_id: req.params.id})
        
        if(!employee){
            res.status(404).send()
        }

        await employee.remove()
        res.send(employee)
    } catch(e){
        res.status(500).send("Wrong ID")
    }
})

module.exports = router
