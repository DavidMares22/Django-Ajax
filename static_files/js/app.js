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
            $(el).parents()[1].remove()
        }
    });  
}

