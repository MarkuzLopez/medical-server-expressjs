const fileSystem = require("fs");
const Medico = require("../models/medico");
const Usuario = require("../models/usuario");
const Hospital = require("../models/hospital");

const borrarImagen = (path) => {
  if (fileSystem.existsSync(path)) {
    //borrar laimage anterior
    fileSystem.unlinkSync(path);
  }
};

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    let pathViejo = '';
  switch (tipo) {
    case "medicos":
      const medico = await Medico.findById(id);
      if (!medico) {
        console.log("noes un medico por id");
        return false;
      }

      pathViejo = `./uploads/medicos/${medico.img}`;
      borrarImagen(pathViejo);

      medico.img = nombreArchivo;

      await medico.save();
      return true;
    break;

    case "usuarios":
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log("no es un usuario por id");
        return false;
      }

      pathViejo = `./uploads/usuarios/${usuario.img}`;
      borrarImagen(pathViejo);

      usuario.img = nombreArchivo;
      console.log(usuario);

      await usuario.save();
      return true;
    break;

    case "hospitales":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("noes un hospital por id");
        return false;
      }

      pathViejo = `./uploads/hospitales/${hospital.img}`;
      borrarImagen(pathViejo);

      hospital.img = nombreArchivo;

      await hospital.save();
      return true;
    break;

  }
};

module.exports = {
  actualizarImagen,
};
 