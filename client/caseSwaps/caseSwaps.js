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
  },
  openForReview: function() {
    return this.userId != Meteor.userId() &&
      Reviews.find({beerId: this.beerId, reviewerId: Meteor.userId()}).count() == 0;
  }
});


Template.myReviews.helpers({
  reviews: function() {
    console.log(this);
    if (Meteor.userId() === null) {
      return [];
    }

    var reviews = [];
    var len = this.participants.length;
    for (var i = 0; i < len; i++) {
      if (this.participants[i].userId == Meteor.userId()) {
        reviews = Reviews.find({beerId: this.participants[i].beerId});
        // beer = Beers.findOne({_id: this.participants[i].beerId});
      }
    }

    return reviews;
    // return Reviews.find({})
  },
  reviewersName: function() {
    return getUsersName(Meteor.user({_id: this.reviewerId}));
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
        Beers.update({_id: result}, {$set: {userId: Meteor.userId}});
        Meteor.call('joinSwap', swapId, Meteor.userId(), result);
      }
    }
  }
});
