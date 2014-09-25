Mesosphere({
  name:"reviewForm",
  method:"submitReview",
  template:"scoresheet",
  fields:{
    beerId:{
      required:true,
    },
    aroma:{
      required:true,
    },
    flavour:{
      required:true,
    }
  },
  onFailure: function(erroredFields, formHandle) {
    console.log("hi");
     Mesosphere.Utils.failureCallback(erroredFields, formHandle);
  },
  onSuccess: function(data) {
    console.log("success");
  }
});


// if (Meteor.isClient) {
//   Template.scoresheet.events({
//     'click .submit-review': function () {
//       console.log("hi hi");
//     }
//   })
//
// }

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.methods({
    submitReview: function (rawData, templateData) {
      Mesosphere.reviewForm.validate(rawData, function(errors, formData){
          if(!errors){
            Reviews.insert({
              submitted: new Date(),
              reviewer: "Jim",
              beerId: formData.beerId,
              beerName: Beers.findOne({_id: formData.beerId}).name,
              comments: {
                aroma: formData.aroma,
                flavour: formData.flavour,
              },
            });
          }else{
              _(errors).each( function( value, key ) {
                console.log(key+": "+value.message);
              });
          }
      });
    }
  });
}
