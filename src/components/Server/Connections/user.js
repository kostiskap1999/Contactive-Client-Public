import { getCookie } from "../Util/cookies.js";

import { errorHandling } from "../Util/errors";

const HOSTNAME = "http://snf-883240.vm.okeanos.grnet.gr:8080";

export async function getUserData() {
  let page = "me";
  return await fetch(HOSTNAME + "/" + page, {
    method: "GET",
    headers: {
      Authorization: "Basic " + getCookie("authorization"),
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      else return response.json();
    })
    .catch((error) => {
      errorHandling(error, page);
    });
}
