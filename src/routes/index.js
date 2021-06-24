const express = require('express')
const router = express.Router()
const Task = require('../models/task')

router.get('/',async(req,res)=>{
    const tasks = await Task.find();
    // console.log(tasks);
    res.render('index',{
        tasks
    })
})
router.post('/add',async(req,res)=>{
    const task = new Task(req.body)
    await task.save()
    console.log(req.body);
    res.redirect('/')
})
router.get('/delete/:id',async(req,res)=>{
    const {id} = req.params
    await Task.remove({_id:id})
    // res.send("ok")
    res.redirect('/')
})
router.get('/turn/:id',async(req,res)=>{
    const {id} = req.params
    const task = await Task.findById(id)
    task.status = !task.status
    await task.save()
    // res.send("ok")
    res.redirect('/')
})
router.get('/edit/:id',async(req,res)=>{//envia a la vista de actualizar
    const {id} = req.params
    const task = await Task.findById(id)
    // console.log(task);
    res.render('edit',{
        task
    })
})
router.post('/edit/:id',async(req,res)=>{
    const {id} = req.params
    const {title,description,status} = req.body
    const tasks1 = await Task.updateOne({"_id":id},req.body)
    //const tasks1 = await Task.find();
    console.log(tasks1);
    res.redirect('/')
})

module.exports = router