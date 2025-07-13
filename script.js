const materiasPorAnio = {
  anio1: [
    { nombre: "Biología celular y genética", abre: ["Microbiología y parasitología", "Fisiología Humana", "Enfermedades infecciosas"] },
    { nombre: "Ciencias sociales y obstetricia", abre: ["Salud pública"] },
    { nombre: "Psicología" },
    { nombre: "Anatomia, Histologia y Embriologia", abre: ["Fisiología Humana"] },
    { nombre: "Obstetricia Normal", abre: ["Clinica obstetrica normal y patológica", "Obstetricia patologica", "Neonatología normal y patológica"] }
  ],
  anio2: [
    { nombre: "Epidemiología", abre: ["Enfermedades infecciosas", "Salud pública"] },
    { nombre: "Educación para la salud reproductiva" },
    { nombre: "La salud materno infantil" },
    { nombre: "Farmacología general", abre: ["Terapéutica bases farmacológicas", "Enfermedades infecciosas"] },
    { nombre: "Microbiologia y parasitologia", abre: ["Enfermedades infecciosas"] },
    { nombre: "Obstetricia patologica", abre: ["Neonatología normal y patológica", "Clínica obstétrica normal y patológica"] },
    { nombre: "Fisiología humana" }
  ],
  anio3: [
    { nombre: "Investigación en salud", abre: ["Tesina"] },
    { nombre: "Salud pública" },
    { nombre: "Terapéutica bases farmacológicas", abre: ["Enfermedades infecciosas"] },
    { nombre: "Clinica obstetrica normal y patológica" },
    { nombre: "Neonatología normal y patológica" }
  ],
  anio4: [
    { nombre: "Inglés técnico", abre: ["Tesina"] },
    { nombre: "Informática aplicada a las ciencias de la salud", abre: ["Tesina"] },
    { nombre: "Enfermedades infecciosas" },
    { nombre: "Ética, deontología y obstetricia" },
    { nombre: "PFO" },
    { nombre: "Tesina" }
  ]
};

const estado = {};
const mensaje = document.getElementById("mensaje");

Object.entries(materiasPorAnio).forEach(([anioId, materias]) => {
  const contenedor = document.querySelector(`#${anioId} .materias-container`);
  materias.forEach((materia, i) => {
    const btn = document.createElement("div");
    btn.textContent = materia.nombre;
    btn.className = "materia";
    estado[materia.nombre] = false;

    // Habilitar si no depende de nada
    if (!materia.abre) btn.classList.add("habilitada");

    btn.onclick = () => {
      if (btn.classList.contains("habilitada")) {
        estado[materia.nombre] = true;
        btn.classList.remove("habilitada");
        btn.classList.add("aprobada");
        btn.textContent = `✓ ${materia.nombre}`;
        mensaje.textContent = `Aprobaste: ${materia.nombre}`;

        // Habilitar materias correlativas
        Object.values(materiasPorAnio).flat().forEach((m) => {
          if (m.abre && m.abre.includes(materia.nombre)) {
            const todasAprobadas = m.abre.every(dep => estado[dep]);
            if (todasAprobadas) {
              const botones = document.querySelectorAll(".materia");
              botones.forEach(b => {
                if (b.textContent === m.nombre) b.classList.add("habilitada");
              });
            }
          }
        });
      }
    };
    contenedor.appendChild(btn);
  });
});
const total = Object.keys(estado).length;
const completadas = Object.values(estado).filter(v => v).length;
const progreso = Math.round((completadas / total) * 100);

document.getElementById("barra-progreso").value = progreso;
document.getElementById("porcentaje").textContent = `${progreso}%`;
