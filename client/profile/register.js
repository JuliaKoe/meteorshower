Template.register.events({
  'submit form': function(e,t){
    e.preventDefault();

    var email = $('#email').val();
    var username = $('#username').val();
    var password = $('#password').val();

    // Trim Helper
    var trimInput = function(val) {
       return val.replace(/^\s*|\s*$/g, "");
    }
    var email = trimInput(email);

    //does username exist in the database?
        Accounts.createUser({
          username: username,
          email: email,
          password: password
        },
        function(error){
          if(error){
            swal({
              title: "Registration Error",
              text: "Username or email already exists.",
              timer: 1700,
              showConfirmButton: false,
              type: "error"
            });
            FlowRouter.go('/login');
          }
          else {
            //if user created, add addtitional fields
            var user = Meteor.users.findOne({"_id": Meteor.userId()});

            //Moved hard coded values to server code
//            Meteor.call('insertDefaultProfile','Level 1', 'Free Level', new Date(2099,0,1));
            Meteor.call('insertDefaultProfile');
            FlowRouter.go('/profile');
          }
        }
      );
    } //end submit form
}); //end register events

Template.register.onRendered(function(){
  $('.register').validate({
      rules: {
          email: {
              required: true,
              email: true
          },
          password: {
              required: true,
              pwcheck: true,
              minlength: 6
          },
          password2: {
            required: true,
            minlength: 6,
            equalTo: "#password"
          },
          username: {
            required: true,
            minlength: 6
          }
      },
      messages: {
          email: {
              required: "You must enter an email address.",
              email: "You've entered an invalid email address."
          },
          password: {
              required: "You must enter a password.",
              minlength: "Your password must be at least {0} characters.",
              pwcheck: "Password must contain at least one digit."
          },
          username: {
              required: "Please provide a username",
              minlength: "Username must be at least {0} characters."
          },
          password2: {
            equalTo: "Passwords do not match."
          }
      }
  });
  $.validator.addMethod("pwcheck", function(value) {
   return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
       && /[a-z]/.test(value) // has a lowercase letter
       && /\d/.test(value) // has a digit
     });
}); //end onRendered
