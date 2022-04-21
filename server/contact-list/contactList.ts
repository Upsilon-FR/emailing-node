export default class contactList {
    name: string;
    description: string;
    created: Date;

    constructor(name: string, description: string, created: Date) {
        this.name = name;
        this.description = description;
        this.created = created;
    }
}