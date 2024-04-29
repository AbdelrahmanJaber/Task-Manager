const express = require('express')
const Employee = require('../models/employee')



const router = new express.Router()

router.post('/employees/add', auth,  async (req, res) => {
    const employee = new Employee(req.body)

    try{
        await employee.save()

        res.status(201).send()
    }catch(e){
        res.status(400).send(e)
    }
})


router.get('/employees'), auth, async (req, res) => {
    try{
        const employees = await Employee.findAll()

        if(!employees){
            return res.status(404).send()
        }

        res.send(task)
    }catch(e){
        res.status(500).send()
    }
}

router.patch('/employees/:id'), auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const availableUpdates = ['name', 'email', 'position', 'branch']
    const isValidOperation = updates.every( (update) => {
        return availableUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates'})
    }

    try{
        const employee = await Employee.findOne({_id: req.params.id, owner: req.user._id})

        if(!employee){
            return res.status(404).send()
        }

        updates.forEach( (update) => employee[update] = req.body[update])
        await employee.save()
        res.send(employee)

        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        
    } catch(e){
        res.status(400).send(e)
    }
})

module.exports = router