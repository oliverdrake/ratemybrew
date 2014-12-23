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
    console.log(userId + " has joined swap " + swapId);
    CaseSwaps.update(
      {_id: swapId, participants: {$elemMatch: {userId: userId}}},
    {$set: {"participants.$.joined": true, "participants.$.beerId": beerId}});
  }
});
