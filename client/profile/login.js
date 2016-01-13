Template.login.events({
  'click #login-button':function(e,t){
    e.preventDefault();

    var email=$('#login-email').val(),
        password = $('#login-password').val();

    Meteor.loginWithPassword(email,password, function(error){
      if(error){
        return swal({
          title: "Email or password incorrect",
          text: "Login failed. Please try again.",
          timer: 1700,
          showConfirmButton: false,
          type: "error"
        });
      }
      else{
        FlowRouter.go('/landing');
      }
    });
    return false;
  }
});
