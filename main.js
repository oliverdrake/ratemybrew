if (Meteor.isServer) {
  Meteor.startup(function () {

    // Dirty Hack!!!!!
    OffFlavours.remove({});
    Beers.remove({});


    OffFlavours.insert({
      name: "acetaldehyde",
      description: "Green apple-like aroma and flavor."
    });
    OffFlavours.insert({
      name: "diacetyl",
      description: "Artificial butter, butterscotch, or toffee aroma and flavor. Sometimes perceived as a slickness on the tongue."
    });

    Beers.insert({
      name: "Oli's Porter"
    });
    Beers.insert({
      name: "Oli's Pale Ale"
    });
  });
  // /Dirty Hack
}
