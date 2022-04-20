import { patchInfo, postInfo } from "../Server/Connections/info";
import { Event } from "./Util/Event";

export class InfoSection {
  constructor(name, ...data) {
    this.name = name;
    this.info = [];
    data[0].forEach((d) => this.initialise(d));
  }

  update = new Event();

  initialise(data) {
    if (this.info.includes(data)) return;
    this.info.push(data);
    this.update.dispatch();
  }

  add(data, contactID) {
    if (this.info.includes(data)) return;
    if (data === "") return;
    this.info.push(data);
    this.update.dispatch();
    postInfo([this], contactID)
  }

  remove(uneditedInfo, index, contactID) {
    this.info.splice(index, 1);
    this.update.dispatch();
    patchInfo([uneditedInfo], [this], contactID)
  }

  editName(uneditedInfo, data, contactID) {
    this.name = data;
    this.update.dispatch();
    patchInfo([uneditedInfo], [this], contactID)
  }

  editInfo(uneditedInfo, data, index, contactID) {
    this.info.splice(index, 1, data);
    this.update.dispatch();
    patchInfo([uneditedInfo], [this], contactID)
  }


}
