$("#id_username").keyup(function (e) {
  var code = (e.keyCode || e.which);
  if(code == 37 || code == 38 || code == 39 || code == 40) {
    return;
}
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
        // $(".error-msg").show();
        // $(".error-msg").addClass("alert alert-danger");
        // $(".error-msg").html("A user with this username already exists.");
        // setTimeout(function(){ $(".error-msg").hide(); }, 2000);  

        $('#id_username').removeClass('is-valid').addClass('is-invalid');
        $('#id_username').after('<div class="invalid-feedback d-block" id="usernameError">This username is not available!</div>')

      }else {
        $('#id_username').removeClass('is-invalid').addClass('is-valid');
        $('#usernameError').remove();

    }
    }
  });

});