export class UserSettings {
  constructor(user, settings = {}) {
    this.user = user;
    this.darkMode = settings.darkMode || false;
  }
}
