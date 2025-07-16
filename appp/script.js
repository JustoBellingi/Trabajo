const presidentes = [
  { nombre: "Julio Argentino Roca", desde: 1880, hasta: 1886 },
  { nombre: "Miguel Juárez Celman", desde: 1886, hasta: 1890 },
  { nombre: "Carlos Pellegrini", desde: 1890, hasta: 1892 },
  { nombre: "Luis Sáenz Peña", desde: 1892, hasta: 1895 },
  { nombre: "José Evaristo Uriburu", desde: 1895, hasta: 1898 },
  { nombre: "Julio Argentino Roca", desde: 1898, hasta: 1904 },
  { nombre: "Manuel Quintana", desde: 1904, hasta: 1906 },
  { nombre: "José Figueroa Alcorta", desde: 1906, hasta: 1910 },
  { nombre: "Roque Sáenz Peña", desde: 1910, hasta: 1914 },
  { nombre: "Victorino de la Plaza", desde: 1914, hasta: 1916 },
  { nombre: "Hipólito Yrigoyen", desde: 1916, hasta: 1922 },
  { nombre: "Marcelo T. de Alvear", desde: 1922, hasta: 1928 },
  { nombre: "Hipólito Yrigoyen", desde: 1928, hasta: 1930 },
  { nombre: "José Félix Uriburu (de facto)", desde: 1930, hasta: 1932 },
  { nombre: "Agustín P. Justo", desde: 1932, hasta: 1938 },
  { nombre: "Roberto M. Ortiz", desde: 1938, hasta: 1942 },
  { nombre: "Ramón Castillo", desde: 1942, hasta: 1943 },
  { nombre: "Pedro P. Ramírez (de facto)", desde: 1943, hasta: 1944 },
  { nombre: "Edelmiro J. Farrell (de facto)", desde: 1944, hasta: 1946 },
  { nombre: "Juan Domingo Perón", desde: 1946, hasta: 1955 },
  { nombre: "Eduardo Lonardi (de facto)", desde: 1955, hasta: 1955 },
  { nombre: "Pedro Eugenio Aramburu (de facto)", desde: 1955, hasta: 1958 },
  { nombre: "Arturo Frondizi", desde: 1958, hasta: 1962 },
  { nombre: "José María Guido", desde: 1962, hasta: 1963 },
  { nombre: "Arturo Illia", desde: 1963, hasta: 1966 },
  { nombre: "Juan Carlos Onganía (de facto)", desde: 1966, hasta: 1970 },
  { nombre: "Roberto M. Levingston (de facto)", desde: 1970, hasta: 1971 },
  { nombre: "Alejandro A. Lanusse (de facto)", desde: 1971, hasta: 1973 },
  { nombre: "Héctor J. Cámpora", desde: 1973, hasta: 1973 },
  { nombre: "Raúl Alberto Lastiri", desde: 1973, hasta: 1973 },
  { nombre: "Juan Domingo Perón", desde: 1973, hasta: 1974 },
  { nombre: "Isabel Perón", desde: 1974, hasta: 1976 },
  { nombre: "Jorge Rafael Videla (de facto)", desde: 1976, hasta: 1981 },
  { nombre: "Roberto Viola (de facto)", desde: 1981, hasta: 1981 },
  { nombre: "Leopoldo Galtieri (de facto)", desde: 1981, hasta: 1982 },
  { nombre: "Reynaldo Bignone (de facto)", desde: 1982, hasta: 1983 },
  { nombre: "Raúl Alfonsín", desde: 1983, hasta: 1989 },
  { nombre: "Carlos Menem", desde: 1989, hasta: 1999 },
  { nombre: "Fernando de la Rúa", desde: 1999, hasta: 2001 },
  { nombre: "Adolfo Rodríguez Saá", desde: 2001, hasta: 2001 },
  { nombre: "Eduardo Camaño", desde: 2001, hasta: 2002 },
  { nombre: "Eduardo Duhalde", desde: 2002, hasta: 2003 },
  { nombre: "Néstor Kirchner", desde: 2003, hasta: 2007 },
  { nombre: "Cristina Fernández de Kirchner", desde: 2007, hasta: 2015 },
  { nombre: "Mauricio Macri", desde: 2015, hasta: 2019 },
  { nombre: "Alberto Fernández", desde: 2019, hasta: 2023 },
  { nombre: "Javier Milei", desde: 2023, hasta: 2027 },
];

function buscarPresidente() {
  const anio = parseInt(document.getElementById("anio").value);
  const resultado = document.getElementById("resultado");

  if (isNaN(anio)) {
    resultado.innerHTML = "<p>Ingresá un año válido.</p>";
    return;
  }

  const presidente = presidentes.find(
    (p) => anio >= p.desde && anio <= p.hasta
  );

  if (presidente) {
    resultado.innerHTML = `<p>En <strong>${anio}</strong> el presidente era <strong>${presidente.nombre}</strong>.</p>`;
  } else {
    resultado.innerHTML = "<p>No hay datos para ese año.</p>";
  }
}
function generarListasPorSiglo() {
  const lista20 = document.getElementById("siglo20");
  const lista21 = document.getElementById("siglo21");

  presidentes.forEach((p) => {
    const item = document.createElement("li");
    item.textContent = `${p.nombre} (${p.desde} - ${p.hasta})`;

    if (p.desde < 2000) {
      lista20.appendChild(item);
    } else {
      lista21.appendChild(item);
    }
  });
}

window.onload = generarListasPorSiglo;