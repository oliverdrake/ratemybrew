getUsersName = function(user) {
  if (user === undefined) {
    console.warn("Undefined user");
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
    var user = Meteor.users.findOne({_id: userId});
    var name = getUsersName(user);
    var swap = CaseSwaps.findOne({_id: swapId});
    var creator = Meteor.users.findOne({_id: swap.creatorId})
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
  },

  sendEmailToUser: function(userId, subject, text) {
    var user = Meteor.users.findOne({_id: userId});
    if (user.emails.length < 1) {
      console.warn("UserId: " + userId + " has no email addresses, so can't send");
      return;
    }
    var dest = user.emails[0].address;
    console.log("Sending email to " + dest);
    Email.send({
      from: "ratemybrew@gmail.com",
      to: dest,
      subject: subject,
      text: text
    });
  }

});
