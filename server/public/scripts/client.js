var editing = false;
var taskId = 0;

$(document).ready(function(){
  console.log('jQuery sourced');
  getToDoList();

//////////////////////////////
  // functionality for the complete button
  $('#tasks').on('click', '.complete', function(){
    console.log('Complete task: '+ $(this).data('task'));
    $(this).css("background-color", "green");
  });
//////////////////////////////



  // functionality for the delete button
  $('#tasks').on('click', '.delete', function(){
    console.log('Delete task: '+ $(this).data('task'));
    $.ajax({
      type: 'DELETE',
      url: '/todo/delete/' + $(this).data('task'),
      success: function(){
        console.log("deleted task");
        getToDoList();
      }
    });
  });

  // functionality for the edit button
  $('#tasks').on('click', '.edit', function(){
    console.log($(this).data('task'));
    editing = true;
    $('#formTitle').text("You are now editing...");
    taskId = $(this).data('task');
    $('#task').val($(this).data('task'));
  });

  // functionality for the submit button
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
        url: "/todo/edit",
        data: updateToMake,
        success: function(){
          console.log("updated");
          getToDoList();
        }
      });
    } else {
      $.ajax({
        type: "POST",
        url: "/todo/add",
        data: {task: $('#task').val()},
        success: function(response) {
          getToDoList();
        }
      });
    }
    $('#task').val('');
  });
});

// gets to do list from database and appends to the DOM
// appends new tasks and buttons as they are added
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
        $el.append('<td>' + task.completed + '</td>');


        $el.append('<td class="completedTask"><button class="complete" data-task="' +  // complete button //////////////////////////////////
        task.id + '">Complete</button></td>');


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
