Meteor.methods({
  inviteToSwap: function(swapId, userId) {
    console.log("inviting: " + userId + " to swap " + swapId);
    name = getUsersName(Meteor.users.findOne({_id: userId}));
    swap = CaseSwaps.findOne({_id: swapId});
    CaseSwaps.update({_id: swapId}, {$addToSet: {participants: {
      "userId": userId,
      "joined": false,
      "name": name
    }}});
    Events.insert({title: "New Invite", body: name + " has been invited to " + swap.name});
  },

  joinSwap: function(swapId, userId, beerId) {
    name = getUsersName(Meteor.users.findOne({_id: userId}));
    swap = CaseSwaps.findOne({_id: swapId});

    console.log(name + " has joined swap " + swapId);

    if (CaseSwaps.find({_id: swapId, participants: {$elemMatch: {userId: userId}}}).count() == 0) {
      Meteor.call('inviteToSwap', swapId, userId);
    }

    CaseSwaps.update(
      {_id: swapId, participants: {$elemMatch: {userId: userId}}},
      {$set: {"participants.$.joined": true, "participants.$.beerId": beerId}});

    Events.insert({title: "Joined swap", body: name + " has joined " + swap.name});
  }
});
