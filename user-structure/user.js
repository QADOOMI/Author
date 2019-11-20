function SignUpUser(userJsonData) {
  this.userId = userJsonData.userId;
  this.username = userJsonData.username;
  this.password = userJsonData.password;
  this.email = userJsonData.email;
  this.birthday = userJsonData.birthday;
  this.aboutMe = userJsonData.aboutMe;
  this.facebookAccount = userJsonData.facebookAccount;
  this.twitterAccount = userJsonData.twitterAccount;
  this.linkedInAccount = userJsonData.linkedInAccount;
  this.profileImage = userJsonData.profileImage;
  this.token = userJsonData.token;
  this.followed = null;

  this.error = null;
  this.signInState = null;
  this.signInMessage = null;

}

function SignInUser(userJsonData) {
  this.password = userJsonData.password;

  this.email = userJsonData.email;
  this.token = userJsonData.token;

  this.error = null;
  this.signInState = null;
  this.signInMessage = null;


}

exports.SignInUser = SignInUser;
exports.SignUpUser = SignUpUser;
