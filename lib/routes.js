FlowRouter.route('/',{
  action:function(){
    FlowLayout.render('mainLayout',{sidebar:'leftsidebar', main:'mainbody'});
  }
});
FlowRouter.route('/login',{
  action:function(){
    FlowLayout.render('mainLayout',{sidebar:'',main:'login'});
  }
});
FlowRouter.route('/register',{
  action:function(){
    FlowLayout.render('mainLayout',{sidebar:'',main:'register'});
  }
});
FlowRouter.route('/forgotpassword',{
  action:function(){
    FlowLayout.render('mainLayout',{sidebar:'',main:'forgotpassword'});
  }
});

// //--------------end login / registration -------------------
// //----start profile-----------------------------------------
FlowRouter.route('/profile',{
  action:function(){
    FlowLayout.render('mainLayout',{sidebar:'profilesidebar',main:'profile'});
  }
});
FlowRouter.route('/landing',{
  action:function(){
    FlowLayout.render('mainLayout',{sidebar:'landingsidebar',main:'landing'});
  }
});
//----end profile--------------------------------------------
