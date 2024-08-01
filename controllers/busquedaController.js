const { response } = require("express");
const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const getDcoumentsCollection = async (req, res = response) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  let data;

  switch (tabla) {
    case "medicos":
      data = await Medico.find({ nombre: regex })
        .populate("hospital", "nombre")
        .populate("usuario", "nombre img");
      break;
    case "hospitales":
      data = await Hospital.find({ nombre: regex }).populate(
        "usuario",
        "nombre img"
      );
      break;
    case "usuarios":
      data = await Usuario.find({ nombre: regex });
      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "la tabla tiene que ser usaurios/medicos/hospitales",
      });
  }

  res.json({
    ok: true,
    resultado: data,
  });
};

const getTodo = async (req, res = response) => {
  const busqueda = req.params.id;
  const regex = new RegExp(busqueda, "i"); // para datos insensibles(es decir que buqeu, sin se explicito)

  // const usuarios =    await Usuario.find({ nombre: regex })
  // const medicos =     await Medico.find({ nombre: regex })
  // const hospitales =  await Hospital.find({ nombre: regex })

  const [usuarios, medicos, hospitales] = await Promise.all([
    await Usuario.find({ nombre: regex }),
    await Medico.find({ nombre: regex }),
    await Hospital.find({ nombre: regex }),
  ]);

  res.json({
    ok: true,
    msg: "getTodo",
    usuarios,
    medicos,
    hospitales,
  });
};

module.exports = {
  getTodo,
  getDcoumentsCollection,
};
