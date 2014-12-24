Meteor.subscribe("caseSwaps");


getAllParticipants = function(_id) {
  swap = CaseSwaps.findOne(_id);
  if (swap === undefined || !swap.hasOwnProperty("participants")) {
    return [];
  }
  return swap.participants;
}


getInvitees = function(participants) {
  invitees = [];
  participants.forEach(function(participant) {
    if (!participant.joined) {
      invitees.push(participant);
    }
  });
  return invitees;
}


getJoinedParticipants = function(participants) {
  joined = [];
  participants.forEach(function(participant) {
    if (participant.joined) {
      participant.beerName = Beers.findOne({_id: participant.beerId}).name;
      joined.push(participant);
    }
  });
  return joined;
}


Template.caseSwap.helpers({
  hasNotJoined: function() {
    ids = [];
    getJoinedParticipants(getAllParticipants(this._id)).forEach(function(user) {
      ids.push(user.userId);
    });
    return ids.indexOf(Meteor.userId()) == -1;
  }
});


Template.participants.helpers({
  joinedParticipants: function() {
    return getJoinedParticipants(getAllParticipants(this._id));
  },
  invitees: function() {
    return getInvitees(getAllParticipants(this._id));
  }
});



Template.inviteForm.helpers({
  userOpts: function() {
    opts = [];
    ids = [];
    allParticipants = getAllParticipants(this._id);
    if (allParticipants !== undefined){
      getAllParticipants(this._id).forEach(function(participant) {
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
    userId = $('select').val();
    Meteor.call('inviteToSwap', this._id, userId);
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


AutoForm.addHooks(['insertBeerForm'], {
  after: {
    insert: function(error, result) {
      if (error === undefined) {
        swapId = Router.current().params._id;
        Meteor.call('joinSwap', swapId, Meteor.userId(), result);
      }
    }
  }
});
