const HTMLParser = require('fast-html-parser');

const horario = []

const parseHTML = (HTMLString) => {
  const root = HTMLParser.parse(HTMLString);
  console.log('=======nuevo=============')
  const table = root.querySelectorAll(".tabla")[4]
  for (let i = 4; i < table.childNodes.length; i++) {
    const tagname = table.childNodes[i].tagName
    if (tagname == 'tr') {
      findHours(table.childNodes[i])
    }
  }
  return horario
}

const findHours = (tr) => {
  const hour = {
    time: '',
    classes: [],
  }
  for (let i = 0; i < tr.childNodes.length; i++) {
    const th = tr.childNodes[i]
    if (th.tagName == 'th') {
      const childLength = th.childNodes.length
      switch (childLength) {
        case 1:
          hour.time = th.childNodes[0].rawText
          break
        case 9:
          hour.classes.push({})
          break
        case 15:
          hour.classes.push(buildModule(th))
          break
      }
    }
  }
  horario.push(hour)
}

const buildModule = (th) => {
  const names = ['materia', 'grupo', 'edificio', 'salon', 'nombre']
  const mod = {}
  let counter = 0
  for (let i = 0; i < th.childNodes.length; i++) {
    const child = th.childNodes[i]
    if (child.tagName == 'span') {
      mod[names[counter]] = child.childNodes[0].rawText
      counter++
    }
  }
  return mod
}

export { parseHTML }