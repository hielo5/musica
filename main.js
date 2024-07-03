// Obtener la referencia al elemento donde mostrarás la lista de archivos
const listaElement = document.getElementById('lista');

// URL de donde obtendremos los archivos de audio e imágenes
const url = '/audio/';

// Utilizamos fetch para obtener los datos
fetch(url)
  .then(response => response.text())
  .then(data => {
    // Convertimos la respuesta de texto a HTML para poder manipularlo
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(data, 'text/html');

    // Obtenemos todos los enlaces a los archivos
    const links = htmlDocument.querySelectorAll('a');

    // Creamos una lista para almacenar los nombres de archivos limpios
    const fileList = document.createElement('ul');

    links.forEach(link => {
      const href = link.getAttribute('href');
      const fileName = link.textContent.trim();

      // Limpiamos el nombre del archivo para eliminar la fecha y hora al final
      const cleanedFileName = fileName.replace(/\.\w{3,4}\d{1,8}(\/\d{1,2}\/\d{4} \d{1,2}:\d{1,2}:\d{1,2})?$/, '');

      // Creamos un elemento de lista para cada archivo
      const listItem = document.createElement('li');
      const fileParts = cleanedFileName.split('.'); // Separamos por punto para obtener la extensión
      const name = fileParts[0]; // Nombre del archivo sin la fecha al final
      const extension = fileParts.slice(1).join('.'); // Extensión del archivo

      listItem.textContent = `${name}.${extension}`.trim(); // Mostramos el nombre limpio del archivo con la extensión

      fileList.appendChild(listItem);
    });

    // Limpiamos el contenido previo del elemento lista
    listaElement.innerHTML = '';

    // Agregamos la lista de archivos al elemento con id="lista"
    listaElement.appendChild(fileList);
  })
  .catch(error => {
    console.error('Error al obtener los archivos:', error);
    listaElement.textContent = 'Error al cargar la lista de archivos.';
  });
