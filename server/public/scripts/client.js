var editing = false;
var taskId = 0;

$(document).ready(function(){
  console.log('jQuery sourced');
  getToDoList();

  $('#tasks').on('click', '.delete', function(){
    console.log('Delete task: '+ $(this).data('task'));
    $.ajax({
      type: 'DELETE', // Similar SELECT or GET
      url: '/todo/delete/' + $(this).data('task'), // e.g. /books/delete/53
      success: function(){
        console.log("deleted task");
        getToDoList();
      }
    });
  });

  $('#tasks').on('click', '.edit', function(){
    console.log($(this).data('task'));
    editing = true;
    $('#formTitle').text("You are now editing...");
    taskId = $(this).data('task');
    $('#task').val($(this).data('task'));
  });

  $('#taskForm').on('submit', function(event){
    event.preventDefault();
    console.log($('#task').val());
    if(editing) {
      editing = false;
      $('#formTitle').text("Add new entry");

      var updateToMake = {
        id: taskId,
        task: $('#task').val(),
      };
      $.ajax({
        type: "PUT",
        url: "/tasks/edit", // Similar to POST (data & req.body) /////////////////////////// change this maybe
        data: updateToMake,
        success: function(){
          console.log("updated");
          getToDoList();
        }
      });
    } else {
      $.ajax({
        type: "POST",
        url: "/tasks/add", /////////////////////////////////////////// maybe
        data: {task: $('#task').val()},
        success: function(response) {
          // Refresh our data
          getToDoList();
        }
      });
    }
    $('#task').val('');
  });
});

function getToDoList() {
  $.ajax({
    type: "GET",
    url: "/todo",
    success: function(response) {
      console.log(response);
      $('#tasks').empty();
      for(var i = 0; i < response.length; i++) {
        var task = response[i];
        $('#tasks').append('<tr></tr>');
        var $el = $('#tasks').children().last();
        $el.append('<td>' + task.id + '</td>');
        $el.append('<td>' + task.task + '</td>');
        $el.append('<td><button class="delete" data-task="' +
        task.id + '">Delete</button></td>');
        $el.append('<td><button class="edit" data-task="' +
        task.id + '" data-id="' +
        task.task + '" data-task="'+
        '">Edit</button></td>');
      }
    }
  });
}
