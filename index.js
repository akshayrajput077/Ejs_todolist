
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

let tasks = [];
// let tasktodo = '';

app.get('/', (req, res) => {
  // console.log(tasktodo);
  res.render('todolist', { taskList: tasks });
});

app.post('/add', (req, res) => {
  const task = req.body;
  if (task) {
    tasks.unshift(task);
    res.redirect('/');
  }
});

// app.post('/edit/:index', (req, res) => {
//   const index = parseInt(req.params.index);
//   let filterdata = tasks.filter((idx) => idx === index);
//   if (filterdata[0].task) {
//     tasktodo.push(filterdata[0].task);
//     res.redirect('/');
//   }
// });

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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});