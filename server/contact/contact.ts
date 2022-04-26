export default class Contact {
  name: string;
  lastname: string;
  firstname: string;
  mail: string;
  creationDate: string;

  constructor(name: string, lastname: string, firstname: string, mail: string, creationDate: string) {
    this.name = name;
    this.lastname = lastname;
    this.firstname = firstname;
    this.mail = mail;
    this.creationDate = creationDate;
  }
}
