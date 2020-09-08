$(function () {
 
  $("#search").keyup(function(){

    $.ajax({
      url: "/search_titles/",
      data: {
        'search_text':$('#search').val(),
        'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val()
      },
      type: 'POST',
      dataType: 'html',
      success: function (data) {
     

        
        $("#search-results").html(data); 
        
     
      }

    });


  });

  $("#posts").on('click','.delete-btn' ,function(){
    var post_id = $(this).attr('id');
    console.log(post_id)
    $.ajax({
      url : "/delete_post/", // the endpoint
      type : "DELETE", // http method
      data : { postpk : post_id }, // data sent with the delete request
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-CSRFToken",$('input[name=csrfmiddlewaretoken]').val());
    },
      success : function(json) {
          // hide the post
        $('.post-'+post_id).hide(); // hide the post on success
        console.log("post deletion successful");
      },

      error : function(xhr,errmsg,err) {
          // Show an error
          $('#results').html("<div class='alert-box alert radius' data-alert>"+
          "Oops! We have encountered an error. <a href='#' class='close'>&times;</a></div>"); // add error to the dom
          console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
      }
  });
     
  });

  $("#posts").on("submit",'.like-form', function(){
     
     var form = $(this);
     $.ajax({
       url: form.attr("action"),
       data: form.serialize(),
       type: form.attr("method"),
       dataType: 'json',
       success: function (data) {
      
 
         
         $(".like-btn-"+data.id).html(data.status); 
         
      
       }
 
     });
     return false;
   });
 
 
  // Submit post on submit
$('#post-form').on('submit', function(event){

  event.preventDefault();
  var form = $(this);

  $.ajax({
    url : form.attr("action"),
    type : "POST", // http method
    data : { the_post : $('#post-content').val(), 
          csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()}, // data sent with the post request

    // handle a successful response
    success : function(data) {
        $('#post-content').val(''); // remove the value from the input
       
        $('#posts').html(data.html_post_list); 

        console.log(data)

    },

    // handle a non-successful response
    error : function(xhr,errmsg,err) {
        $('.error-msg').html("<div class='alert alert-danger' >Oops! We have encountered an error: "+errmsg+
            "</div>"); // add the error to the dom
        // console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        console.log(xhr.status 
          ); // provide a bit more info about the error to the console
    }
});
});

 

});