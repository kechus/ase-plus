const HTMLParser = require('fast-html-parser');



export const parseHTML = (HTMLString) => {
  const horario = [];
  const root = HTMLParser.parse(HTMLString);
  const numberOfTables = root.querySelectorAll(".tabla").length;
  const table = root.querySelectorAll(".tabla")[numberOfTables - 1];
  for (let i = 4; i < table.childNodes.length; i++) {
    const tagname = table.childNodes[i].tagName;
    if (tagname == "tr") {
      findHours(table.childNodes[i], horario);
    }
  }
  return horario;
};

const findHours = (tr, horario) => {
  const hour = {
    time: "",
    classes: [],
  };
  for (let i = 0; i < tr.childNodes.length; i++) {
    const th = tr.childNodes[i];
    if (th.tagName == "th") {
      const childLength = th.childNodes.length;
      switch (childLength) {
        case 1:
          hour.time = th.childNodes[0].rawText;
          break;
        case 9:
          hour.classes.push({});
          break;
        case 15:
          hour.classes.push(buildModule(th));
          break;
      }
    }
  }
  horario.push(hour);
};

const buildModule = (th) => {
  const names = ["materia", "grupo", "edificio", "salon", "nombre"];
  const mod = {};
  let counter = 0;
  for (let i = 0; i < th.childNodes.length; i++) {
    const child = th.childNodes[i];
    if (child.tagName == "span") {
      mod[names[counter]] = child.childNodes[0].rawText;
      counter++;
    }
  }
  return mod;
};

export const scheduleParser = (HTMLString) => {
  const grades = [];
  const root = HTMLParser.parse(HTMLString);
  const trs = root.querySelectorAll("tr");
  console.log(trs);
  return;
  const tables = root.querySelectorAll(".tabla");
  let gradesTable = root.querySelectorAll(".tabla")[4];
  for (const table of tables) {
    if (table.attributes.width == 950) {
      gradesTable = table;
    }
  }
  console.log("//");
  for (let i = 0; i < 100; i++) {
    const tagname = gradesTable.childNodes[i].tagName;
    if (tagname == "tr") {
      findAsignatures(gradesTable.childNodes[i], grades);
      console.log(gradesTable);
      gradesTable = gradesTable.childNodes[i];
    }
  }
};

const findAsignatures = (tr, grades) => {
  let realTDcounter = 0;
  for (let i = 0; i < tr.childNodes.length; i++) {
    const td = tr.childNodes[i];
    if (td.tagName == "td") {
      switch (realTDcounter) {
        //materia
        case 2:
          console.log(td);
          break;
        //maestro
        case 3:
          console.log(td);
          break;
        //estatus
        case 4:
          break;
        //ponderacion
        case 5:
          break;
      }
      realTDcounter++;
    }
  }
};

