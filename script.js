const materiasPorAnio = {
  anio1: [
    { nombre: "Biología celular y genética", habilita: ["Microbiología y parasitología", "Fisiología Humana", "Enfermedades infecciosas"] },
    { nombre: "Ciencias sociales y obstetricia", habilita: ["Salud pública"] },
    { nombre: "Psicología" },
    { nombre: "Anatomia, Histologia y Embriologia", habilita: ["Fisiología Humana"] },
    { nombre: "Obstetricia Normal", habilita: ["Clinica obstetrica normal y patológica", "Obstetricia patologica", "Neonatología normal y patológica"] }
  ],
  anio2: [
    { nombre: "Epidemiología", habilita: ["Enfermedades infecciosas", "Salud pública"] },
    { nombre: "Educación para la salud reproductiva" },
    { nombre: "La salud materno infantil" },
    { nombre: "Farmacología general", habilita: ["Terapéutica bases farmacológicas", "Enfermedades infecciosas"] },
    { nombre: "Microbiologia y parasitologia", habilita: ["Enfermedades infecciosas"] },
    { nombre: "Obstetricia patologica", habilita: ["Neonatología normal y patológica", "Clínica obstétrica normal y patológica"] },
    { nombre: "Fisiología humana" }
  ],
  anio3: [
    { nombre: "Investigación en salud", habilita: ["Tesina"] },
    { nombre: "Salud pública" },
    { nombre: "Terapéutica bases farmacológicas", habilita: ["Enfermedades infecciosas"] },
    { nombre: "Clinica obstetrica normal y patológica" },
    { nombre: "Neonatología normal y patológica" }
  ],
  anio4: [
    { nombre: "Inglés técnico", habilita: ["Tesina"] },
    { nombre: "Informática aplicada a las ciencias de la salud", habilita: ["Tesina"] },
    { nombre: "Enfermedades infecciosas" },
    { nombre: "Ética, deontología y obstetricia" },
    { nombre: "PFO" },
    { nombre: "Tesina" }
  ]
};

const estado = {};
const mensaje = document.getElementById("mensaje");
const barra = document.getElementById("barra-progreso");
const porcentaje = document.getElementById("porcentaje");

Object.entries(materiasPorAnio).forEach(([anioId, materias]) => {
  const contenedor = document.querySelector(`#${anioId} .materias-container`);
  materias.forEach((materia) => {
    const btn = document.createElement("div");
    btn.textContent = materia.nombre;
    btn.className = "materia";
    estado[materia.nombre] = false;

    if (!materia.habilita || materia.habilita.length === 0) {
      btn.classList.add("habilitada");
    }

    btn.onclick = () => {
      if (btn.classList.contains("habilitada")) {
        estado[materia.nombre] = true;
        btn.classList.remove("habilitada");
        btn.classList.add("aprobada");
        btn.textContent = `✓ ${materia.nombre}`;
        mensaje.textContent = `Aprobaste: ${materia.nombre}`;

        Object.values(materiasPorAnio).flat().forEach((m) => {
          if (m.habilita && m.habilita.includes(materia.nombre)) {
            const todasAprobadas = m.habilita.every(dep => estado[dep]);
            if (todasAprobadas) {
              const botones = document.querySelectorAll(".materia");
              botones.forEach(b => {
                if (b.textContent === m.nombre) {
                  b.classList.add("habilitada");
                }
              });
            }
          }
        });

        const total = Object.keys(estado).length;
        const completadas = Object.values(estado).filter(v => v).length;
        const progreso = Math.round((completadas / total) * 100);
        barra.value = progreso;
        porcentaje.textContent = `${progreso}%`;
      }
    };

    contenedor.appendChild(btn);
  });
});
