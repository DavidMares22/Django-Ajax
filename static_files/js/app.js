

  
$(function () {

  
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
        if (data.form_is_valid) {

          $("#room-table tbody").html(data.html_room_list); 
          $("#modal-room").modal("hide");          
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
  $("#modal-room").on("submit", ".js-room-update-form", saveForm);
});