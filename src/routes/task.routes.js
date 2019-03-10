const express = require('express')
const router = express.Router();

const TaskModel = require('../models/task.model')

router.get('/', async (req,res)=>{
    const taskList = await TaskModel.find();
    console.log(taskList);
    res.json(taskList);
});

router.get('/:id',async (req,res)=>{
    const task = await TaskModel.findById(req.params.id);
    res.json(task);
})

router.post('/',async (req,res)=>{
    const {title,description} = req.body;
    const task = new TaskModel({title,description});
    await task.save()
    res.json({json:'Task saved'})
})

router.put('/:id', async (req,res)=>{
    const {title,description} = req.body;
    const taskNew = {title,description};
    console.log("Id que llega: ",req.params.id)
    await TaskModel.findByIdAndUpdate(req.params.id, taskNew)
    res.json({status:"Task updated"});
})

router.delete('/:id',async (req,res)=>{
    await TaskModel.findByIdAndRemove(req.params.id);
    res.json({status:"Task deleted"});
})
module.exports = router;