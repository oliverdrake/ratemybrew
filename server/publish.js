Meteor.publish('caseSwaps', function() {
  return CaseSwaps.find({});
});

Meteor.publish("beers", function() {
  return Beers.find({});
});

Meteor.publish("reviews", function() {
  return Reviews.find({});
});

Meteor.publish("offFlavours", function() {
  return OffFlavours.find({});
});

Meteor.publish("events", function() {
  return Events.find({});
});
