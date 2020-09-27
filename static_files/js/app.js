

  
$(function () {

  var page = 1;
  var empty_page = false;
  var block_request = false;
  $("#loading").hide();


window.onscroll = function(){infiniteScroll()};

function infiniteScroll() {
  if((window.innerHeight + window.scrollY) >= document.body.scrollHeight && empty_page == false && block_request == false) {
      block_request = true;
      page += 1;
      $.ajax({
          url: '?page=' + page,
          type: 'get',
          dataType: 'html',
        
          success: function (data) {
            if(data == '') {
              empty_page = true;
              console.log('no more posts!')
              }
              else {
              
                $("#loading").show();
                setTimeout(function(){
                  $("#loading").hide();
                  $("#room-table tbody").append(data);
                  block_request = false;
                }, 2000);
              }
          }
      });
    }
  }

  
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

          $("#room-table tbody").prepend(data.html_room); 
          $("#modal-room").modal("hide");          
    
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
    console.log(form.serialize())
    $.ajax({
      url: form.attr("action"),
      data: form.serialize(),
      type: form.attr("method"),
      dataType: 'json',
      success: function (data) {
        if (data.form_is_valid) {
          
          $('#'+data.room_id).replaceWith(data.html_room);
          $("#modal-room").modal("hide");          
       
        }
        else {
          $("#modal-room .modal-content").html(data.html_form);
             
          console.log(data);
          
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