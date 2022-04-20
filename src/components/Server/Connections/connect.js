import { getCookie } from "../Util/cookies.js";

import { errorHandling } from "../Util/errors.js";

const HOSTNAME = "http://snf-883240.vm.okeanos.grnet.gr:8080";

export function fetchLogin(data) {
  let page = "login";
  fetch(HOSTNAME + "/" + page, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      else return response.text();
    })
    .then((data) => {
      data = data.split('"'); //split is necessary since the response comes in " "
      if (data[1] === "") alert("False Credentials");
      else {
        document.cookie = `authorization=${data[1]};sameSite=Lax`;
        window.location.reload();
      }
    })
    .catch((error) => {
      errorHandling(error, page);
    });
}

export function fetchRegister(data) {
  let page = "register";
  fetch(HOSTNAME + "/" + page, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then((response) => response.text())
    .then((data) => {
      data = data.split('"'); //split is necessary since the response comes in " "
      document.cookie = `authorization=${data[1]};sameSite=Lax`;
      window.location.reload();
    })
    .catch((error) => {
      errorHandling(error, page);
    });
}

export function fetchLogout() {
  let page = "logout";
  fetch(HOSTNAME + "/" + page, {
    method: "POST",
    headers: {
      Authorization: "Basic " + getCookie("authorization"),
    },
  })
    .then((response) => response.text())
    .then(() => {
      document.cookie = "authorization=;expires=Thu, 01 Jan 1970;sameSite=Lax";
      document.cookie = "userData=;expires=Thu, 01 Jan 1970;sameSite=Lax";
      window.location.reload();
    })
    .catch((error) => {
      errorHandling(error, page);
    });
}

export async function fetchRenew() {
  let page = "renew";
  fetch(HOSTNAME + "/" + page, {
    method: "POST",
    headers: {
      Authorization: "Basic " + getCookie("authorization"),
    },
  })
    .then((response) => response.text())
    .catch((error) => {
      errorHandling(error, page);
    });
}
