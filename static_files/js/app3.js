$(function () {
 
 
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