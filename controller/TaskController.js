const Task = require('../model/Task')

const getIndex = async (req, res) => {
    try{

        const taskList = await Task.find();
        return res.render("index", {taskList});

    }catch(err){
        res.status(500).send({error: err.message})
    }       
  
};

const createTask = async (req, res) => {
    const task = req.body;

    if(!task){
        return res.redirect("/")
    }

    try{
        await Task.create(task)
        return res.redirect("/")
    } catch(err){
        res.status(500).send({error: err.message})
    }
}

module.exports = {
  getIndex,
  createTask
};