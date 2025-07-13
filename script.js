const materias = [
  { nombre: "Biología celular y genética", abre: ["Microbiología y parasitología", "Fisiología Humana", "Enfermedades infecciosas"] },
  { nombre: "Ciencias sociales y obstetricia", abre: ["Salud pública"] },
  { nombre: "Psicología" },
  { nombre: "Anatomia, Histologia y Embriologia", abre: ["Fisiología Humana"] },
  { nombre: "Obstetricia Normal", abre: ["Clinica obstetrica normal y patológica", "Obstetricia patologica", "Neonatología normal y patológica"] },
  { nombre: "Epidemiología", abre: ["Enfermedades infecciosas", "Salud pública"] },
  { nombre: "Educación para la salud reproductiva" },
  { nombre: "La salud materno infantil" },
  { nombre: "Farmacología general", abre: ["Terapéutica bases farmacológicas", "Enfermedades infecciosas"] },
  { nombre: "Microbiologia y parasitologia", abre: ["Enfermedades infecciosas"] },
  { nombre: "Obstetricia patologica", abre: ["Neonatología normal y patológica", "Clínica obstétrica normal y patológica"] },
  { nombre: "Fisiología humana" },
  { nombre: "Investigación en salud", abre: ["Tesina"] },
  { nombre: "Salud pública" },
  { nombre: "Terapéutica bases farmacológicas", abre: ["Enfermedades infecciosas"] },
  { nombre: "Clinica obstetrica normal y patológica" },
  { nombre: "Neonatología normal y patológica" },
  { nombre: "Inglés técnico", abre: ["Tesina"] },
  { nombre: "Informática aplicada a las ciencias de la salud", abre: ["Tesina"] },
  { nombre: "Enfermedades infecciosas" },
  { nombre: "Ética, deontología y obstetricia" },
  { nombre: "PFO" },
  { nombre: "Tesina" }
];

const container = document.getElementById("malla-container");
const mensaje = document.getElementById("mensaje");
let estado = {};

materias.forEach((materia, i) => {
  const boton = document.createElement("button");
  boton.textContent = materia.nombre;
  boton.className = "materia";
  estado[materia.nombre] = false;

  if (!materia.abre) boton.classList.add("habilitada");

  boton.onclick = () => {
    if (boton.classList.contains("habilitada")) {
      estado[materia.nombre] = true;
      boton.classList.remove("habilitada");
      boton.classList.add("aprobada");
      boton.textContent = `✓ ${materia.nombre}`;
      mensaje.textContent = `Aprobaste: ${materia.nombre}`;

      materias.forEach((m, j) => {
        if (m.abre && m.abre.includes(materia.nombre)) {
          const allPrev = m.abre.every(prev => estado[prev]);
          if (allPrev) container.children[j].classList.add("habilitada");
        }
      });
    }
  };
  container.appendChild(boton);
});
