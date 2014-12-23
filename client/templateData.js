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


Template.news.helpers({
  events: function() {
    return Events.find({}, {
      sort: [["created", "desc"]],
      transform: function(event) {
        event.humanizeCreated = moment(event.created).fromNow();
        return event;
      }});
  }
});
