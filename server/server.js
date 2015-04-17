Meteor.startup(function() {
  process.env.MAIL_URL="smtp://ratemybrew%40gmail.com:cascade6@smtp.gmail.com:465/";
  Accounts.emailTemplates.from = 'Rate My Brew <ratemybrew@gmail.com>';
  Accounts.emailTemplates.siteName = 'Rate My Brew';

  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Please Confirm Your Email Address';
  };

  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return 'Click on the following link to verify your email address: ' + url;
  };

  Accounts.onCreateUser(function(options, user) {
    console.log("onCreateUser: " + user._id);

    if ("services" in user && "facebook" in user.services) {
      user.emails = [{address: user.services.facebook.email, verified: false}];
    }
    else {
      user.profiles = {};
    }

    // we wait for Meteor to create the user before sending an email
    Meteor.setTimeout(function() {
      Accounts.sendVerificationEmail(user._id);
    }, 2 * 1000);

    return user;
  });

  // Accounts.validateLoginAttempt(function(attempt){
  //   if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
  //     console.log('email not verified');
  //     return false; // the login is aborted
  //   }
  //   return true;
  // });

});
