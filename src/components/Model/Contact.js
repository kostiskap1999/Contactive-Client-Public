import { Event } from "./Util/Event";

import { deleteInfo, getInfo } from "../Server/Connections/info";
import { extractInfoSection } from "../Server/Extractors/ExtractInfoSection";
import { patchContact } from "../Server/Connections/contacts";

export class Contact {
  // isPersona = false;
  // isSelfPersona = false;

  constructor(id, name, icon, visibility, creator, ...infosections) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.visibility = visibility;
    this.creator = creator;
    this.infosections = [];
    infosections[0].forEach((i) => this.initialise(i));
  }

  update = new Event();

  initialise(infosection) {
    this.infosections.push(infosection);
    this.update.connect(() => infosection.update.dispatch());
    this.update.dispatch();
  }

  add(infosection) {
    this.infosections.push(infosection);
    this.update.connect(() => infosection.update.dispatch());
    this.update.dispatch();
  }

  remove(index) {
    deleteInfo([this.infosections[index]], this.id);
    this.infosections.splice(index, 1);
    this.update.dispatch();
  }

  edit() {
    patchContact(this);
    this.update.dispatch();
  }

  extractInfoSections(infosections) {
    this.infosections = Object.entries(infosections.info).map((infosection) => {
      return extractInfoSection(infosection);
    });
  }

  async fetchInfoSections() {
    var infosections = await getInfo(this.id);
    this.extractInfoSections(infosections);
  }

}
