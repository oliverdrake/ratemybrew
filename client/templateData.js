Template.reviews.reviews = function () {
  return Reviews.find({}, {sort: {submitted: "desc"}});
}

Template.off_flavours.off_flavours = function () {
  return OffFlavours.find({});
};


Template.beers.beers = function () {
  return Beers.find({});
};


Template.caseSwapsNav.swaps = function () {
  return CaseSwaps.find({"creatorId": Meteor.userId()});
};
