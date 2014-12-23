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
        }
      }
    }
  });
