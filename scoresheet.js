

var off_flavours = OffFlavours.find();

var fields = {};
off_flavours.forEach(function(entry) {
  fields[entry.name] = {
    required: false
  };
});
fields["beerId"] = {
  required: true
};
fields["aroma"] = {
  required: true
};
fields["flavour"] = {
  required: true
};

Mesosphere({
  name:"reviewForm",
  method:"submitReview",
  template:"scoresheet",
  fields:fields,
  onFailure: function(erroredFields, formHandle) {
    console.log("hi");
     Mesosphere.Utils.failureCallback(erroredFields, formHandle);
  },
  onSuccess: function(data) {
    console.log(data);
    console.log("success");
  }
});


Meteor.methods({
  submitReview: function (rawData, templateData) {
    Mesosphere.reviewForm.validate(rawData, function(errors, formData){
        if(!errors){
          console.log(formData);

          var reviewOffFlavours = [];
          off_flavours.forEach(function(off_flavour) {
            var name = off_flavour.name;
            if (formData[name] === "on") {
              reviewOffFlavours.push(off_flavour);
            }
          })

          var id = Reviews.insert({
            submitted: new Date(),
            reviewer: "Jim",
            beerId: formData.beerId,
            beerName: Beers.findOne({_id: formData.beerId}).name,
            comments: {
              aroma: formData.aroma,
              flavour: formData.flavour,
            },
            offFlavours: reviewOffFlavours,
          });
          if (Meteor.isClient) {
            Router.go("/review/" + id);
          }
        }else{
            _(errors).each( function( value, key ) {
              console.log(key+": "+value.message);
            });
        }
    });
  }
});
