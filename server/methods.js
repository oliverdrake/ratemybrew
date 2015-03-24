getUsersName = function(user) {
  if (user === undefined) {
    console.warn("Could not find a user for id: " + userId);
    return "";
  }
  var name = "Unknown user";
  if (user.hasOwnProperty("profile") && user.profile.hasOwnProperty("name")) {
    name = user.profile.name;
  }
  else if (user.hasOwnProperty("username")) {
    name = user.username;
  }
  return name;
}

Meteor.methods({
  joinSwap: function(swapId, userId, beerId) {
    name = getUsersName(Meteor.users.findOne({_id: userId}));
    swap = CaseSwaps.findOne({_id: swapId});
    CaseSwaps.update({_id: swapId}, {$addToSet: {participants: {
      "userId": userId,
      "joined": true,
      "beerId": beerId,
      "name": name
    }}});
    Events.insert({title: "Joined swap", body: name + " has joined " +
      '<a href="/swaps/' + swapId + '">' + swap.name + "</a>"});
    console.log(name + " has joined swap " + swapId);
  },

  getUsersName: function(userId) {
    user = Meteor.users.findOne({_id: userId});
    return getUsersName(user);
  }

});
