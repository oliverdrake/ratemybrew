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
