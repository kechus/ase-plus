const LOGIN_ROUTE = 'https://ase1.ceti.mx/tecnologo/seguridad/iniciarsesion'
const SCHEDULE_ROUTE = 'https://ase1.ceti.mx/tecnologo/tgoalumno/horario'
const GRADES_ROUTE = "https://ase1.ceti.mx/tecnologo/tgoalumno/calificaciones";

import iconv from "iconv-lite";
import { Buffer } from "buffer";

export const login = async (user) => {
  const resultingHTML = await postXMLHTTP(LOGIN_ROUTE, user);
  return succesfulLogin(resultingHTML);
};

const succesfulLogin = (resultingHTML) => {
  return !resultingHTML.includes("INGRESO AL SISTEMA ESCOLAR");
};

function postXMLHTTP(route, user) {
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

function getXMLHTTP(route) {
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

export const fetchSchedule = async () => {
  const html = await getXMLHTTP(SCHEDULE_ROUTE);
  return html;
};

export const fetchGrades = async () => {
  const html = await getXMLHTTP(GRADES_ROUTE);
  return html;
};
