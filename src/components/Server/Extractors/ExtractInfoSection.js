import { InfoSection } from "../../Model/InfoSection.js";

export function extractInfoSection(infosection) {
  return new InfoSection(
    infosection[0],
    infosection[1].map((data) => {
      return data;
    })
  );
}
