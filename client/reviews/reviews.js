Meteor.subscribe("reviews");
Meteor.subscribe("offFlavours");
Meteor.subscribe("beers");
Meteor.subscribe("users");
Meteor.subscribe("swaps");

Session.setDefault("reviewMode", "simple");
Session.setDefault("__reviewerName", "");


Template.vitals.helpers({
  reviewersName: function() {
    return Session.get("__reviewerName") || "";
  },
  swap: function() {
    if (!this.swapId) {
      return null;
    }
    return CaseSwaps.findOne({_id: this.swapId});
  }
});


Template.vitals.created = function() {
  Meteor.call('getUsersName', this.data.reviewerId, function(err, result){
    Session.set("__reviewerName", result);
  });
}


Template.scoresheet.helpers({
  usersName: function() {
    if (this !== undefined && this.hasOwnProperty('userId')) {
      return Meteor.call('getUsersName', this.userId);
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
        doc.swapId = Router.current().params.swapId;
        beer = Beers.findOne({_id: doc.beerId});
        doc.beerName = beer.name;
        return doc
      }
    },
    after: {
      insert: function(error, result) {
        if (error === undefined) {
          Reviews.update({_id: result}, {$set: {reviewer: Meteor.user()}});
          review = Reviews.findOne({_id: result});
          Router.go('/swaps/' + review.swapId);
        }
        else {
          console.log(error);
        }
      }
    }
  }
});
