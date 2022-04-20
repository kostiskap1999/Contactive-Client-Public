const CLIENTNAME = window.location.protocol + "//" + window.location.host;

export function errorHandling(error, page = null) {

  console.log(error);
  
  if(error.name === "TypeError"){
    alert("There is a network error. Please try again later.")
    document.cookie = "authorization=;expires=Thu, 01 Jan 1970 00:00:00 UTC;sameSite=Lax";
  }

  // eslint-disable-next-line
  if (error == "Error: 401") {
    if (page === "logout" || page === "me" || page === "renew") {
      document.cookie = "authorization=;expires=Thu, 01 Jan 1970 00:00:00 UTC;sameSite=Lax";
    }
    if (page === "login"){
      alert("False credentials");
      return;
    }
  }
  // eslint-disable-next-line
  else if (error == "Error: 404") {
    if (page === "login"){
      alert("User does not exist");
      return;
    }
  }
  // eslint-disable-next-line
  else if (error == "Error: 422") {
    if (page === "contacts"){
      alert("Invitation invalid.\nYou either own or have already joined this contact.");
      window.location = CLIENTNAME + "/profile";
    }   
  }
  // eslint-disable-next-line
  else if (error == "Error: 500") {
    if (page === "info")
      window.location.reload();
  }

  window.location = CLIENTNAME;
}
