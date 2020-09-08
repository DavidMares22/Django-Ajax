$("#id_username").keyup(function (e) {

  var code = (e.keyCode || e.which);
  if(code == 37 || code == 38 || code == 39 || code == 40) {
    console.log(code);
    return;
  }



  var username = $(this).val();

  if( !username) {
    $('#id_username').removeClass('is-valid');
    $('#id_username').removeClass('is-invalid');
    $('#usernameError').remove();
    return;
  } 

  $.ajax({
    url: '/ajax/validate_username/',
    data: {
      'username': username
    },
    dataType: 'json',
    success: function (data) {
      if (data.is_taken) {
  
        $('#id_username').removeClass('is-valid').addClass('is-invalid');

        if($('#usernameError').length === 0){
          $('#id_username').after('<div class="invalid-feedback d-block" id="usernameError">This username is not available!</div>');
          }         
        

      }else {
        $('#id_username').removeClass('is-invalid').addClass('is-valid');
        $('#usernameError').remove();

    }
    }
  });

});