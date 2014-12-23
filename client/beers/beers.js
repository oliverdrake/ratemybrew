Meteor.subscribe("beers");

Template.beers.helpers({
  beers: function() {
    return Beers.find({});
  }
});
