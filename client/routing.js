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
  });
