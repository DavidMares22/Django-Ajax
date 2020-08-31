$(function () {
 
    

   
   


  $(".like-form").on("submit", function(){
    
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

});