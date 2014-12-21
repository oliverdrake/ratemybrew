OffFlavours = new Mongo.Collection("off-flavours");
Beers = new Mongo.Collection("beers");
Reviews = new Mongo.Collection("reviews");


Router.map(function() {
  this.route('beers', {path: "/", layoutTemplate: 'layout'});
  this.route('score/:_id', {
    template: 'scoresheet',
    layoutTemplate: 'layout',
    data: function() { return Beers.findOne(this.params._id); }
  });
  this.route('reviews', {layoutTemplate: 'layout'});
  this.route('review/:_id', {
    template: 'review',
    layoutTemplate: 'layout',
    data: function() {
      return Reviews.findOne(this.params._id);
    }});
});


if (Meteor.isClient) {


  Template.beers.beers = function () {
    return Beers.find({});
  };





}
