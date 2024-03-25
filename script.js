document.addEventListener('DOMContentLoaded', function () {
    var addTaskBtn = document.getElementById('addTask');
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');
    var showAllBtn = document.getElementById('showAll');
    var showIncompleteBtn = document.getElementById('showIncomplete');
    var showCompletedBtn = document.getElementById('showCompleted');
    var deleteCompletedBtn = document.getElementById('deleteCompleted');
  
    addTaskBtn.addEventListener('click', function () {
      var taskText = taskInput.value.trim();
      if (taskText !== '') {
        var listItem = document.createElement('li');
        listItem.innerHTML = `
          <input type="checkbox">
          <span>${taskText}</span>
        `;
        taskList.appendChild(listItem);
        taskInput.value = '';
      }
    });
  
    showAllBtn.addEventListener('click', function () {
      showTasks(taskList, 'li');
    });
  
    showIncompleteBtn.addEventListener('click', function () {
      showTasks(taskList, 'li:not(:has(input:checked))');
    });
  
    showCompletedBtn.addEventListener('click', function () {
      showTasks(taskList, 'li:has(input:checked)');
    });

    deleteCompletedBtn.addEventListener('click', function () {
      var completedTasks = taskList.querySelectorAll('li.completed');
      completedTasks.forEach(function (task) {
        task.remove();
      });
    });
  
    function showTasks(container, selector) {
      var tasksToShow = container.querySelectorAll(selector);
      container.querySelectorAll('li').forEach(function (task) {
        task.style.display = 'none';
      });
      tasksToShow.forEach(function (task) {
        task.style.display = 'block';
      });
    }
  
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
  