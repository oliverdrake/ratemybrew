Meteor.subscribe("reviews");
Meteor.subscribe("offFlavours");
Meteor.subscribe("beers");

Template.reviews.helpers({
  reviews: function() {
    return Reviews.find({}, {sort: {submitted: "desc"}});
  }
});


Template.off_flavours.helpers({
  off_flavours: function() {
    return OffFlavours.find({});
  }
});


Template.insertReviewForm.helpers({
  off_flavours: function() {
    return OffFlavours.find({});
  }
})


AutoForm.hooks({
  insertReviewForm: {
    before: {
      insert: function(doc, template) {
        doc.beerId = Router.current().params._id;
        doc.beerName = Beers.findOne({_id: doc.beerId}).name;
        return doc
      }
    }
  }
});
