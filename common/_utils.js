getUsersName = function(user) {
  var name = "Unknown user";
  if (user.hasOwnProperty("profile") && user.profile.hasOwnProperty("name")) {
    name = user.profile.name;
  }
  else if (user.hasOwnProperty("username")) {
    name = user.username;
  }
  return name;
}
