const LOGIN_ROUTE = 'https://ase1.ceti.mx/tecnologo/seguridad/iniciarsesion'
const SCHEDULE_ROUTE = 'https://ase1.ceti.mx/tecnologo/tgoalumno/horario'


const login = async (user) => {
  const userOptions = buildLoginOptions(user)
  const resultingHTML = await fetchHtmlAsText(LOGIN_ROUTE, userOptions)
  return succesfulLogin(resultingHTML)
}

const buildLoginOptions = (user) => {
  const formData = buildFormData(user)
  return {
    method: 'post',
    body: formData
  }
}

const buildFormData = (user) => {
  let formData = new FormData();
  formData.append('registro', user.registro);
  formData.append('password', user.password)
  return formData
}

const fetchHtmlAsText = async (path, options) => {
  const res = await fetch(path, options);
  return await res.text();
};

const succesfulLogin = (resultingHTML) => {
  return !resultingHTML.includes("INGRESO AL SISTEMA ESCOLAR");
};

const fetchSchedule = async () => {
  const html = await fetchHtmlAsText(SCHEDULE_ROUTE, {});
  return html;
};

export { fetchSchedule, login }