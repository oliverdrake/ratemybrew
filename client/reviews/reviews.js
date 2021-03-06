Meteor.subscribe("reviews");
Meteor.subscribe("offFlavours");
Meteor.subscribe("beers");
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
  if (this.data !== null) {
    Meteor.call('getUsersName', this.data.reviewerId, function(err, result){
      Session.set("__reviewerName", result);
    });
  }
}


Template.simple_results.helpers({
  editing: function() {
    return Session.get("editing") == true;
  },
  canEdit: function() {
    return this.reviewerId == Meteor.userId();
  }
});


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

Session.set("editing", false);

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
          var review = Reviews.findOne({_id: result});

          Meteor.call("getUsersName", review.reviewerId, function(err, reviewerName) {
            var submittersId = Beers.findOne({_id: review.beerId}).userId;
            var subject = reviewerName + " has reviewed your beer";
            var rootUrl = Meteor.absoluteUrl();
            var text = "Your beer " + review.beerName + " has been reviewed by " + reviewerName + ".\n";
            text = text.concat('\nGo to the review: ' + rootUrl + 'review/' + review._id);
            text = text.concat('\n\nTheir comments about your beer:\n\n' + review.comments);
            Meteor.call("sendEmailToUser", submittersId, subject, text);
          })
          Router.go('/swaps/' + review.swapId);
        }
        else {
          console.log(error);
        }
      },
      update: function(error, result) {
        if (error === undefined) {
          Router.go('/review/' + this.docId);
        }
        Session.set("editing", false);
      }
    }
  }
});
