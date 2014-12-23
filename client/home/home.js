Meteor.subscribe("caseSwaps");
Meteor.subscribe("events");

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
