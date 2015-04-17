Meteor.subscribe("caseSwaps");
Meteor.subscribe("events");

Template.caseSwapsNav.swaps = function () {
  return CaseSwaps.find({});
};


Template.news.helpers({
  events: function() {
    return Events.find({}, {
      sort: [["created", "desc"]],
      transform: function(event) {
        event.humanizeCreated = moment(event.created).fromNow();
        return event;
      },
      limit: 50});
    }
  });


Template.layout.created = function() {
  if (Accounts._verifyEmailToken) {
    Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
      if (err != null) {
        if (err.message = 'Verify email link expired [403]') {
          console.log('Sorry this verification link has expired.')
        }
      } else {
        console.log('Thank you! Your email address has been confirmed.')
      }
    });
  }
};


Template.layout.events({
  // auto collapse navbar for certain actions
  "click a.auto-collapse": function(e) {
    $(".navbar-toggle").click();
  }
});


Template.login.events({
  'click .send-verification': function(evt, tmpl) {
    evt.preventDefault(); // add this to prevent the button from submitting
    if (Meteor.userId()) {
      Meteor.call('sendVerificationEmail', Meteor.userId());
      alert('verification email sent');
    }


  }
})
