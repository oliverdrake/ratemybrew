Meteor.subscribe("caseSwaps");
Meteor.subscribe("events");

Template.caseSwapsNav.swaps = function () {
  return CaseSwaps.find({});
};


Template.news.helpers({
  events: function() {
    return Events.find({}, {
      sort: [["created", "desc"]],
      transform: function(event) {
        event.humanizeCreated = moment(event.created).fromNow();
        return event;
      },
      limit: 50});
    }
  });


Template.layout.events({
  // auto collapse navbar for certain actions
  "click .nav li a.auto-collapse": function(e) {
    $(".navbar-toggle").click();
  }
});
