$(function () {
 
  const delay_by_in_ms = 1000
  let scheduled_function = false
  $(".input-group-text").hide();

  $("#search-input").keyup(function(e){

    var code = (e.keyCode || e.which);
    if(code == 37 || code == 38 || code == 39 || code == 40) {
      console.log(code);
      return;
    }

    if (scheduled_function) {
      clearTimeout(scheduled_function)
  }

  
  scheduled_function = setTimeout(ajax_call, delay_by_in_ms)
  $(".input-group-text").show();
    

  });

  let ajax_call = function(){
    
    $.ajax({
      url: "/search_titles/",
      data: {
        'search_text':$('#search-input').val(),
        'csrfmiddlewaretoken':$('input[name=csrfmiddlewaretoken]').val()
      },
      type: 'POST',
      dataType: 'html',
      success: function (data) {
     

        
        $("#search-results").html(data); 
        $(".input-group-text").hide();
     
      }

    });

  }

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
     var post_id = $(this).attr('id');
     $.ajax({
       url: form.attr("action"),
       data: form.serialize(),
       type: form.attr("method"),
       dataType: 'html',
       success: function (data) {
      
 
         
        $(".post-"+post_id).replaceWith(data); 
         
      
       }
 
     });
     return false;
   });
 
 
$(".post-form").on("submit",'#form-post', function(event){


  event.preventDefault();
  var form = $(this);
  

  $.ajax({
    url : form.attr("action"),
    type : "POST", // http method
    data :form.serialize(),
          

    // handle a successful response
    success : function(data) {
        
       
        

        if (data.form_is_valid) {
          $(".post-form").html(data.html_form);
          $('#posts').html(data.html_post_list);       
    
        }
        else {
          $(".post-form").html(data.html_form);
          
        }

        $('#post-content').val(''); 

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




$('#posts').on('click','.page-link',function(){


 $.ajax({
  url: "/pages/",
  data: {page:$(this).attr('id')},
  type: 'get',
  dataType: 'html',
  success: function (data) {
 
    
    $('#posts').html(data); 
    
 
  }

});

});

 

});