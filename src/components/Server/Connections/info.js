import { getCookie } from '../Util/cookies.js';
import { infosectionJSON } from '../../Model/Util/JSONModel.js';

import { errorHandling } from '../Util/errors.js';

const HOSTNAME = "http://snf-883240.vm.okeanos.grnet.gr:8080";
const PAGE = "info"

export async function getInfo(id) {
    return await fetch(HOSTNAME + "/" + PAGE + "/" + id, {
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

export function postInfo(infosections, contactId) {

  var data = infosections.map( infosection => JSON.stringify(infosectionJSON(infosection)) );
  
  fetch(HOSTNAME + "/" + PAGE + "/" + contactId, {
    method: "POST",
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

export async function deleteInfo(infosections, id) {

  var data = infosections.map( infosection => JSON.stringify(infosectionJSON(infosection)) );

  return await fetch(HOSTNAME + "/" + PAGE + "/" + id, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Basic " + getCookie('authorization'),
    },
    body: data
  })
  .then((response) => {
      if(!response.ok) throw new Error(response.status);
  })
  .catch((error) => {
      errorHandling(error, PAGE);
    });
}

export async function patchInfo(uneditedInfosections, editedInfosections, id) {

  var uneditedData = uneditedInfosections.map( infosection => infosectionJSON(infosection) );
  var editedData = editedInfosections.map( infosection => infosectionJSON(infosection) );
  var data = JSON.stringify({
    "delete": uneditedData[0],
    "new": editedData[0]
  })

  return await fetch(HOSTNAME + "/" + PAGE + "/" + id, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Basic " + getCookie('authorization'),
    },
    body: data
  })
  .then((response) => {
      if(!response.ok) throw new Error(response.status);
  })
  .catch((error) => {
      errorHandling(error, PAGE);
    });  
}
