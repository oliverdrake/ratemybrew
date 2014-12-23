Meteor.methods({
  invitePeopleToSwap: function(swapId, userIds) {
    console.log("inviting: " + userIds + " to swap " + swapId);
    newParticipants = [];
    userIds.forEach(function(userId){
      newParticipants.push({
        "userId": userId,
        "joined": false,
        "name": getUsersName(
          Meteor.users.findOne({_id: userId})),
        "beerIds": []
      });
    });
    console.log({_id: swapId},
      {$addToSet: {participants: {$each: newParticipants}}});
    CaseSwaps.update({_id: swapId},
      {$addToSet: {participants: {$each: newParticipants}}});
  }
});
