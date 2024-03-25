document.addEventListener('DOMContentLoaded', function () {
  var taskInput = document.getElementById('taskInput');
  var addTaskBtn = document.getElementById('addTask');
  var taskList = document.getElementById('taskList');
  var deleteCompletedBtn = document.getElementById('deleteCompleted');

  // Отримуємо збережені дані з localStorage при завантаженні сторінки
  var savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Відтворюємо список завдань з localStorage
  savedTasks.forEach(function (taskText) {
    addTaskToList(taskText);
  });

  // Додаємо нове завдання до списку та зберігаємо його в localStorage
  function addTaskToList(taskText) {
    var listItem = document.createElement('li');
    listItem.innerHTML = `
      <input type="checkbox">
      <span>${taskText}</span>
    `;
    taskList.appendChild(listItem);
  }

  addTaskBtn.addEventListener('click', function () {
    var taskText = taskInput.value.trim();
    if (taskText !== '') {
      addTaskToList(taskText);
      // Зберігаємо завдання в localStorage
      savedTasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(savedTasks));
      taskInput.value = ''; // Очищаємо поле вводу
    }
  });

  // Видалення завершених завдань та оновлення localStorage
  deleteCompletedBtn.addEventListener('click', function () {
    var completedTasks = taskList.querySelectorAll('input:checked');
    completedTasks.forEach(function (completedTask) {
      var listItem = completedTask.closest('li');
      var taskText = listItem.querySelector('span').textContent;
      var index = savedTasks.indexOf(taskText);
      if (index !== -1) {
        savedTasks.splice(index, 1);
      }
      listItem.remove();
    });
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
  });

  // Додавання класу 'completed' при відмічанні завдання як виконане (залишено цю частину для повноти)
  taskList.addEventListener('change', function (event) {
    if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
      var listItem = event.target.closest('li');
      if (listItem) {
        if (event.target.checked) {
          listItem.classList.add('completed');
        } else {
          listItem.classList.remove('completed');
        }
      }
    }
  });
});
