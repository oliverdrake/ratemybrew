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


Template.participants.people = function() {
  console.log(Meteor.users.find({"profile.name": {$regex: Session.get("search_query") }}).count());
  return Meteor.users.find({});
};


Template.participants.participants = function() {
  var swap = CaseSwaps.findOne({_id: this._id});
  if (swap == null || swap == undefined) {
    return [];
  }
  return Meteor.users.find({_id: {$in: swap.participants}});
}


Template.participants.events({
  'keyup .search': function() {
    Session.set("search_query", $(".search").val());
  }
});
