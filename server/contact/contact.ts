
export default class Contact {

    lastName: String;
    firstName: String;
    email: String;
    creationDate: Date;


  constructor(lastName: String, firstName: String, email:String, creationDate: Date) {
      this.lastName = lastName;
      this.firstName = firstName;
      this.email = email;
      this.creationDate = creationDate;
  }
}
