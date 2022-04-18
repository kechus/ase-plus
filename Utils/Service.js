const LOGIN_ROUTE = 'https://ase1.ceti.mx/tecnologo/seguridad/iniciarsesion'
const SCHEDULE_ROUTE = 'https://ase1.ceti.mx/tecnologo/tgoalumno/horario'

import iconv from "iconv-lite";
import { Buffer } from "buffer";

const login = async (user) => {
  const resultingHTML = await postUser(LOGIN_ROUTE, user);
  return succesfulLogin(resultingHTML);
};

const succesfulLogin = (resultingHTML) => {
  return !resultingHTML.includes("INGRESO AL SISTEMA ESCOLAR");
};

function postUser(route, user) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.onload = () => {
      if (request.status === 200) {
        resolve(iconv.decode(Buffer.from(request.response), "iso-8859-2"));
      } else {
        reject(new Error(request.statusText));
      }
    };
    request.onerror = () => reject(new Error(request.statusText));
    request.responseType = "arraybuffer";

    request.open("POST", route);
    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    request.send(`registro=${user.registro}&password=${user.password}`);
  });
}

function getSchedule(route) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.onload = () => {
      if (request.status === 200) {
        resolve(iconv.decode(Buffer.from(request.response), "iso-8859-2"));
      } else {
        reject(new Error(request.statusText));
      }
    };
    request.onerror = () => reject(new Error(request.statusText));
    request.responseType = "arraybuffer";

    request.open("GET", route);
    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    request.send();
  });
}

const fetchSchedule = async () => {
  const buffer = await getSchedule(SCHEDULE_ROUTE);
  return buffer;
};

export { fetchSchedule, login }