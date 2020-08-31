$("#id_username").change(function () {
  var username = $(this).val();

  $.ajax({
    url: '/ajax/validate_username/',
    data: {
      'username': username
    },
    dataType: 'json',
    success: function (data) {
      if (data.is_taken) {
        // alert("A user with this username already exists.");
        $(".error-msg").show();
        $(".error-msg").addClass("alert alert-danger");
        $(".error-msg").html("A user with this username already exists.");
        setTimeout(function(){ $(".error-msg").hide(); }, 2000);  

      }
    }
  });

});