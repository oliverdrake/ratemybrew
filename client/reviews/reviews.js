Meteor.subscribe("reviews");
Meteor.subscribe("offFlavours");
Meteor.subscribe("beers");
Meteor.subscribe("users");

Session.setDefault("reviewMode", "simple");


Template.vitals.helpers({
  reviewersName: function() {
    return getUsersName(Meteor.user({_id: this.reviewerId}));
  }
});


Template.scoresheet.helpers({
  usersName: function() {
    if (this !== undefined && this.hasOwnProperty('userId')) {
      return getUsersName(Meteor.user({_id: this.userId}));
    }
    return "";
  },
  simple: function() {
    return Session.equals("reviewMode", "simple");
  }
});


Template.scoresheet.events({
  'click #simpleMode': function() {
    Session.set("reviewMode", "simple");
  },
  'click #advancedMode': function() {
    Session.set("reviewMode", "advanced");
  }
});


AutoForm.hooks({
  insertReviewForm: {
    before: {
      insert: function(doc, template) {
        doc.beerId = Router.current().params._id;
        doc.beerName = Beers.findOne({_id: doc.beerId}).name;
        return doc
      }
    },
    after: {
      insert: function(error, result) {
        if (error === undefined) {
          Reviews.update({_id: result}, {$set: {reviewer: Meteor.user()}});
          Router.go('/review/' + result);
        }
        else {
          console.log(error);
        }
      }
    }
  }
});
