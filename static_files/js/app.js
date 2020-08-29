$(document).ready(function(){

    $.ajax({
        url:  '/rooms/list',
        type:  'get',
        dataType:  'json',
        success: function  (data) {
            let rows =  '';
            data.rooms.forEach(room => {
            rows += `
            <tr>
                <td>${room.room_number}</td>
                <td>${room.name}</td>
                <td>${room.nobeds}</td>
                <td>${room.room_type}</td>
                <td>
                    <button class="btn btn-danger deleteBtn" data-id="${room.id}">Delete</button>
                    <button class="btn btn-info updateBtn" data-id="${room.id}">Update</button>
                </td>
            </tr>`;
        });
        $('#myTable > tbody:last-child').append(rows);

        $('.deleteBtn').on("click",function(){

            deleteRoom($(this));
        });
    
        
    }

        
    });

  
});
 

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




function  deleteRoom(el){
    roomId  =  $(el).attr('data-id');
    // console.log(getCookie('csrftoken'));

    $.ajax({
        url:  `/rooms/delete/${roomId}`,
        data: {csrfmiddlewaretoken: getCookie('csrftoken')},
        type:  'post',
        dataType:  'json',
        success:  function (data) {
            // console.log(data);
            $('.message').html(data.message);
            $(".message").fadeTo(2000, 500).slideUp(500, function(){
                $(".message").slideUp(500);
            });

            $(el).parents()[1].remove();
            
        }
    });  
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
          alert("Room created!");  // <-- This is just a placeholder for now for testing
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