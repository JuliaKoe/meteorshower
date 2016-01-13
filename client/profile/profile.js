Meteor.subscribe('myProfile');

//display current user profile
Template.profile.helpers({
  myProfile: function(){
    var currentUser = Meteor.userId();
    return Profile.findOne({userId: currentUser});
  }

});


//-------------------profile sidebar--------------------------
Template.profilesidebar.helpers({
  myProfile: function(){
    var currentUser = Meteor.userId();
    return Profile.findOne({userId: currentUser});
  }
});

Template.profilesidebar.events({
  'click #profileUpdateButton' : function(){
    var currentUser = Meteor.userId();
    var profileAvatar = $('#profileAvatar').val();
    var profileDescription = $('#profileDescription').val();
    var profileId = Profile.findOne({userId: currentUser})._id;

    //verify that url starts with http and ends with .gif, .jpg, .jpeg or .png
    if(isUrlValid(profileAvatar))
    {
        Meteor.call('updateProfile',profileId,profileAvatar,profileDescription);
    }
  },
  'click #iconHelp': function(){
    return swal({
            title: 'Avatar Image',
            html:
              'Find a link to the picture you like on the Internet,<br/><strong>Right-click on the image, hit "Copy Image Location"</strong>, then paste it into the field provided. <br>You can use websites like ' +
              '<a href="http://avatars.jurko.net/" target="_blank">this</a> or <a href="http://www.avatarsdb.com/" target="_blank">this</a> ' +
              'or Google Images to find an avatar.'
        });
  }
  ,
  'click #profileCancelButton': function(){
    //just re-populate the text box: User cancelled the update
    var currentUser = Meteor.userId();
    var profile = Profile.findOne({userId: currentUser});
    $('#profileAvatar').val(profile.avatarImage);
    $('#profileDescription').val(profile.aboutMe);
  }
});
//-------------------end profile sidebar----------------------

function isUrlValid(url)
{
  if(stringStartsWith(url,'http') && (stringEndsWith(url,'.gif') || stringEndsWith(url,'.jpg')
    || stringEndsWith(url,'.jpeg') || stringEndsWith(url,'.png')))
  {
      return true;
  }
  else {
    swal({
      title: "Image URL incorrect!",
      text: "Make sure url starts with http and ends with .gif, .jpg, or .png",
      timer: 2700,
      showConfirmButton: false,
      type: "error"
    });
    return false;
  }
}

function stringStartsWith (string, prefix) {
    return string.slice(0, prefix.length) == prefix;
}

function stringEndsWith (string, suffix) {
    return suffix == '' || string.slice(-suffix.length) == suffix;
}
