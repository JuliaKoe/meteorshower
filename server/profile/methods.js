Meteor.publish('myProfile', function(){
  var currentUserId = this.userId;  //logged in user
  return Profile.find({userId: currentUserId});
});

Meteor.methods({
  //insert default profile on user creation
  'insertDefaultProfile' : function(userLevel, userLevelDescription, userLevelExpiration){
    var currentUserId = Meteor.userId();
    Profile.insert({userId: currentUserId,
      userLevel: userLevel,
      userLevelDescription: userLevelDescription,
      userLevelExpiration: userLevelExpiration,
      profileCreateDate: moment().format('L'), //local date 01/01/2016
      avatarImage: 'http://placehold.it/180x180',
      aboutMe: 'Description not provided'
    });
  },
  'updateProfile' : function(profileId, profileAvatar, profileDescription){
    Profile.update({_id: profileId},{$set: {avatarImage: profileAvatar, aboutMe: profileDescription}});
}

});
