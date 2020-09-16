

  
$(function () {



var page = 1;
var empty_page = false;
var block_request = false;

$(window).scroll(function() {
  var margin = $(document).height() - $(window).height() - 50;
  if($(window).scrollTop() > margin && empty_page == false && block_request == false) {
  block_request = true;
  page += 1;
  $.get('?page=' + page, function(data) {
  if(data == '') {
  empty_page = true;
  console.log('emptyyyy')
  }
  else {
  block_request = false;
  $("#room-table tbody").append(data);
  }
  });
  }
  });

  
  var loadForm = function () {
    var btn = $(this);
    $.ajax({
      url: btn.attr("data-url"),
      type: 'get',
      dataType: 'json',
      beforeSend: function () {
        $("#modal-room").modal("show");
      },
      success: function (data) {
        $("#modal-room .modal-content").html(data.html_form);
        
      }
    });
  };

  var saveForm = function () {
    var form = $(this);
    $.ajax({
      url: form.attr("action"),
      data: form.serialize(),
      type: form.attr("method"),
      dataType: 'json',
      success: function (data) {
        // console.log(data);
        if (data.form_is_valid) {

          $("#room-table tbody").prepend(data.html_room); 
          $("#modal-room").modal("hide");          
          
          console.log(data);
        }
        else {
          $("#modal-room .modal-content").html(data.html_form);
          
        }
      }
    });
    return false;
  };


  var deleteRoom = function () {
    var form = $(this);
    $.ajax({
      url: form.attr("action"),
      data: form.serialize(),
      type: form.attr("method"),
      dataType: 'json',
      success: function (data) {
        if (data.form_is_valid) {

          $('#'+data.room_id).hide();
          $("#modal-room").modal("hide");          
          
          console.log(data);
        }
        else {
          $("#modal-room .modal-content").html(data.html_form);
          
        }
      }
    });
    return false;
  };

  var updateRoom = function () {
    var form = $(this);
    $.ajax({
      url: form.attr("action"),
      data: form.serialize(),
      type: form.attr("method"),
      dataType: 'json',
      success: function (data) {
        if (data.form_is_valid) {
          
          $('#'+data.room_id).replaceWith(data.html_room);
          $("#modal-room").modal("hide");          
          
          console.log(data);
        }
        else {
          $("#modal-room .modal-content").html(data.html_form);
          
        }
      }
    });
    return false;
  };

  $(".js-create-room").click(loadForm);
  $("#modal-room").on("submit", ".js-room-create-form", saveForm);
 

  $("#room-table").on("click", ".js-update-room", loadForm);
  $("#modal-room").on("submit", ".js-room-update-form", updateRoom);

  $("#room-table").on("click", ".js-delete-room", loadForm);
  $("#modal-room").on("submit", ".js-room-delete-form", deleteRoom);
});