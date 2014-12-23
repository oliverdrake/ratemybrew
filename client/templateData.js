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


Template.participants.helpers({
  participants: function() {
    return CaseSwaps.findOne(this._id).participants;
  }
});


Template.inviteForm.helpers({
  userOpts: function() {
    opts = [];
    swap = CaseSwaps.findOne({_id: this._id});
    ids = [];
    if (swap.hasOwnProperty("participants")) {
      swap.participants.forEach(function(participant) {
        ids.push(participant.userId);
      });
    }
    Meteor.users.find({_id: {$nin: ids}}).forEach(function(user){
      console.log(getUsersName(user));
      opts.push({
        _id: new Meteor.Collection.ObjectID()._str,
        label: getUsersName(user),
        value: user._id});
    });
    console.log(opts);
    return opts;
  }
});


Template.inviteForm.events({
  "click .btn": function(event) {
    console.log("yay click");
    userIds = $('select').val();
    if (userIds.length > 0) {
      Meteor.call('invitePeopleToSwap', this._id, userIds);
    }
  }
});
