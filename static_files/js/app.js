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
 


function  deleteRoom(el){
    roomId  =  $(el).attr('data-id');

    $.ajax({
        url:  `/rooms/delete/${roomId}`,
        type:  'get',
        dataType:  'json',
        success:  function (data) {
            $(el).parents()[1].remove()
        }
    });  
}

