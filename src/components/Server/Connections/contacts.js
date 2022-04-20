import { getCookie } from '../Util/cookies.js';
import { contactJSON } from '../../Model/Util/JSONModel.js';

import { errorHandling } from '../Util/errors.js';

const HOSTNAME = "http://snf-883240.vm.okeanos.grnet.gr:8080"; 
const PAGE = "contacts"
export async function getContacts() {
    return await fetch(HOSTNAME + "/" + PAGE, {
      method: "GET",
      headers: {
        'Authorization': "Basic " + getCookie('authorization'),
      }
    })
    .then((response) => {
        if(!response.ok) throw new Error(response.status);
        else return response.json()
    })
    .catch((error) => {
        errorHandling(error, PAGE);
    });
}

export async function postContact(contacts) {

    var data = "[" + contacts.map( contact => JSON.stringify(contactJSON(contact)) ) + "]" 

    return await fetch(HOSTNAME + "/" + PAGE, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Basic " + getCookie('authorization')
      },
      body: data
    })
    .then((response) => {
      if(!response.ok) throw new Error(response.status);
      else return response.json();
    })
    .catch((error) => {
      errorHandling(error, PAGE);
  });
}

export function deleteContact(contactId) {

  fetch(HOSTNAME + "/" + PAGE + "/" + contactId, {
    method: "DELETE",
    headers: {
      'Authorization': "Basic " + getCookie('authorization')
    },
  })
  .then((response) => {
    if(!response.ok) throw new Error(response.status);
  })
  .catch((error) => {
    errorHandling(error, PAGE);
  });
}

export function patchContact(contact) {

  var data = JSON.stringify(contactJSON(contact)) 

  fetch(HOSTNAME + "/" + PAGE + "/" + contact.id, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Basic " + getCookie('authorization')
    },
    body: data
  })
  .then((response) => {
    if(!response.ok) throw new Error(response.status);
    else return response.text();
  })
  .catch((error) => {
    errorHandling(error, PAGE);
  });
}

export async function fetchSearchResults(query, page, buffer = 10) {
  return await fetch(`${HOSTNAME}/${PAGE}/public?q=${query}&page=${page}&buffer=${buffer}`, {
    method: "GET",
    headers: {
      'Authorization': "Basic " + getCookie('authorization')
    }
  })
  .then((response) => {
    if(!response.ok) throw new Error(response.status);
    else return response.json();
  })
  .catch((error) => {
    errorHandling(error, PAGE);
  });
}

export async function getPrivateContactKey(contactID) {
  return await fetch(`${HOSTNAME}/${PAGE}/key?id=${contactID}`, {
    method: "GET",
    headers: {
      'Authorization': "Basic " + getCookie('authorization')
    }
  })
  .then((response) => {
    if(!response.ok) throw new Error(response.status);
    else return response.text();
  })
  .catch((error) => {
    errorHandling(error, PAGE);
  });
}

export async function getContactByKey(key) {
  return await fetch(`${HOSTNAME}/${PAGE}/private?key=${key}`, {
    method: "GET",
    headers: {
      'Authorization': "Basic " + getCookie('authorization')
    }
  })
  .then((response) => {
    if(!response.ok) throw new Error(response.status);
    else return response.json();
  })
  .catch((error) => {
    errorHandling(error, PAGE);
  });
}

export async function getPublicContactById(contactID) {
  return await fetch(`${HOSTNAME}/${PAGE}/public/${contactID}`, {
    method: "GET",
    headers: {
      'Authorization': "Basic " + getCookie('authorization')
    }
  })
  .then((response) => {
    if(!response.ok) throw new Error(response.status);
    else return response.json();
  })
  .catch((error) => {
    errorHandling(error, PAGE);
  });
}
