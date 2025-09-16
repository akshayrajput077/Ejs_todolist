
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

let tasks = [];

app.get('/', (req, res) => {
  res.render('todolist', { taskList: tasks, favicon: '/views/favicon.ico' });
});

app.post('/add', (req, res) => {
  const task = req.body;
  if (task) {
    tasks.push(task);
    res.redirect('/');
  }
});


app.post('/edit/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (isNaN(index) || !tasks[index]) {
    return res.status(404).send('Task not found');
  }
  const taskItem = tasks[index];
  res.render('update', { task: taskItem, index });
});

app.post('/update/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const updatedTask = req.body;
  if (!isNaN(index) && tasks[index]) {
    tasks[index] = updatedTask;
  }
  res.redirect('/');
});


app.post('/delete/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (!isNaN(index)) {
    tasks.splice(index, 1);
  }
  res.redirect('/');
});

app.post('/alldelete', (req, res) => {
  tasks = [];
  res.redirect('/');
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});