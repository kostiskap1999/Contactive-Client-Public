export function loginJSON(data) {
  return {
    username: data.username,
    password: data.password,
  };
}

export function registerJSON(data) {
  return {
    username: data.username,
    email: data.email,
    password: data.password,
    level: 0,
  };
}

export function contactJSON(data) {
  return {
    name: data.name ? data.name : "New Contact",
    icon: data.icon ? data.icon : null,
    visibility: data.visibility ? data.visibility : 0,
  };
}

export function infosectionJSON(data) {
  return {
    [data.name]: data.info,
  };
}

export function patchInfoJSON(uneditedInfo, editedInfo) {
  return {
    delete: infosectionJSON(uneditedInfo),
    new: infosectionJSON(editedInfo),
  };
}
