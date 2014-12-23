Meteor.subscribe("caseSwaps");

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


AutoForm.addHooks(['insertSwapForm'], {
  after: {
    insert: function(error, result) {
      if (error === undefined) {
        swap = CaseSwaps.findOne({_id: result});
        if (swap != undefined){
          creator = Meteor.users.findOne({_id: swap.creatorId});
          var userName = getUsersName(creator);
          Events.insert({
            title: "New case swap",
            body: userName + ' created a new case swap: <a href="/swaps/' + swap._id + '">' + swap.name + "</a>"
          });
        }
        Router.go('/swaps/' + result);
      }
    }
  }
});
