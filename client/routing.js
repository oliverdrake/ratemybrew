Router.onBeforeAction(function() {
  if (!Meteor.userId() || Meteor.user() === undefined) {
    this.render('login');
  }
  else if (!Meteor.user().emails[0].verified) {
    this.render('login');
  }
  else {
    this.next();
  }
});


Router.map(function() {
  this.route("news", {
    path: "/",
    layoutTemplate: "layout",
    template: "news"})
  this.route('beers', {
    path: "/beers",
    layoutTemplate: 'layout',
    template: "beers"});
  this.route('score/sw/:swapId/:_id', {
    template: 'scoresheet',
    layoutTemplate: 'layout',
    data: function() { return Beers.findOne(this.params._id); }
  });
  this.route('review/:_id', {
    template: 'review',
    layoutTemplate: 'layout',
    data: function() {
      return Reviews.findOne(this.params._id);
    }});
  this.route('review/:_id/edit', {
    template: 'review',
    layoutTemplate: 'layout',
    data: function() {
      Session.set("editing", true);
      return Reviews.findOne(this.params._id);
    }});
  this.route('swaps/add', {
    layoutTemplate: 'layout',
    template: 'addSwap'
  });
  this.route('swaps/:_id', {
    layoutTemplate: 'layout',
    template: 'caseSwap',
    data: function() {
      return CaseSwaps.findOne({"_id": this.params._id});
    }});
  this.route('swaps/edit/:_id', {
    layoutTemplate: 'layout',
    template: 'editCaseSwap',
    data: function() {
      return CaseSwaps.findOne({"_id": this.params._id});
    }});
  });
