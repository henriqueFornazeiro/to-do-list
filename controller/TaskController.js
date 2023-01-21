const Task = require("../model/Task");

let message = "";
let type = "";

const getIndex = async (req, res) => {
  try {
    setTimeout(() => {
      message = "";
    }, 1000);

    const taskList = await Task.find();
    return res.render("index", {
      taskList,
      task: null,
      taskDelete: null,
      message,
      type,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const createTask = async (req, res) => {
  const task = req.body;

  if (!task.task) {
    message = "Insira um texto antes de adicionar a tarefa.";
    type = "danger";
    return res.redirect("/");
  }

  try {
    await Task.create(task);
    message = "Tarefa adicionada com sucesso!";
    type = "success";
    return res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const taskList = await Task.find();

    if (req.params.method == "update") {
      const task = await Task.findOne({ _id: req.params.id });
      res.render("index", { task, taskList, taskDelete: null, message, type });
    } else {
      const taskDelete = await Task.findOne({ _id: req.params.id });
      res.render("index", { task: null, taskList, taskDelete, message, type });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = req.body;
    await Task.updateOne({ _id: req.params.id }, task);
    message = "Tarefa atualizada com sucesso!";
    type = "success";
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });
    message = "Tarefa apagada com sucesso!";
    type = "success";
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const taskCheck = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    
    task.check ? task.check = false : task.check = true;

    await Task.updateOne({ _id: req.params.id }, task);
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  getIndex,
  createTask,
  getById,
  updateTask,
  deleteTask,
  taskCheck,
};
