


 

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}




 


$("#modal-room").on("submit", ".js-room-create-form", function () {
    var form = $(this);
    $.ajax({
      url: form.attr("action"),
      data: form.serialize(),
      type: form.attr("method"),
      dataType: 'json',
      success: function (data) {
        if (data.form_is_valid) {
        
          $("#room-table tbody").html(data.html_room_list);  // <-- Replace the table body
          $("#modal-room").modal("hide");
        }
        else {
          $("#modal-room .modal-content").html(data.html_form);
          console.log(data.form_is_valid)
        }
      }
    });
    return false;
  });

  $(".js-create-room").click(function () {
    $.ajax({
      url: '/rooms/create',
      type: 'get',
      dataType: 'json',
      beforeSend: function () {
        $("#modal-room").modal("show");
      },
      success: function (data) {
        $("#modal-room .modal-content").html(data.html_form);
        console.log(data);
      }
    });
  });