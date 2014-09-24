// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Players = new Mongo.Collection("players");
OffFlavours = new Mongo.Collection("off-flavour-definitions");

if (Meteor.isClient) {
  Template.off_flavours.off_flavours = function () {
     return OffFlavours.find({});
   };


  Template.example.players = function () {
    return Players.find({}, {sort: {score: -1, name: 1}});
  };

  Template.example.selected_name = function () {
    var player = Players.findOne(Session.get("selected_player"));
    return player && player.name;
  };

  Template.player.selected = function () {
    return Session.equals("selected_player", this._id) ? "selected" : '';
  };

  Template.example.events({
    'click button.inc': function () {
      Players.update(Session.get("selected_player"), {$inc: {score: 5}});
    }
  });

  Template.player.events({
    'click': function () {
      Session.set("selected_player", this._id);
    }
  });
}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {

    // Dirty Hack!!!!!
    OffFlavours.remove({});

    if (OffFlavours.find().count() === 0) {
        OffFlavours.insert({
            name: "acetaldehyde",
            description: "Green apple-like aroma and flavor."
        })
    }

    if (Players.find().count() === 0) {
      var names = ["Ada Lovelace",
                   "Grace Hopper",
                   "Marie Curie",
                   "Carl Friedrich Gauss",
                   "Nikola Tesla",
                   "Claude Shannon"];
      for (var i = 0; i < names.length; i++)
        Players.insert({name: names[i], score: Math.floor(Random.fraction()*10)*5});
    }
  });
}
