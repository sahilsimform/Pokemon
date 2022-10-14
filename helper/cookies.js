export function setCookie(name, val, expires = 1) {
  const date = new Date();
  const value = val;
  // Set it expire in expires day
  date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
  // Set it
  document.cookie =
    name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}
export function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length == 2) {
    return parts.pop().split(";").shift();
  }
}
export function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
}
