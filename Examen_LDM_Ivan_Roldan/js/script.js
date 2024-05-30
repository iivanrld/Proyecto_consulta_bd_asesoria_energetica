document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    fetchResults();
});

function fetchResults() {
    const cif = document.getElementById('cif').value;
    const nombre = document.getElementById('nombre').value;
    const comercializadora = document.getElementById('comercializadora').value;
    const estado = document.getElementById('estado').value;

    const url = new URL('http://192.168.101.4:3000/asesoria_energetica');
    const params = {};

    if (cif) params.cif = cif;
    if (nombre) params.nombre = nombre;
    if (comercializadora) params.comercializadora = comercializadora;
    if (estado) params.estado = estado;

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Verifica la estructura de los datos aquí

            const resultsTableBody = document.getElementById('resultsTableBody');
            resultsTableBody.innerHTML = '';

            if (Array.isArray(data)) {
                data.forEach(contract => {
                    // Filtrar solo los contratos que coinciden con los parámetros de búsqueda
                    const matchesCif = !cif || contract.CIF === cif;
                    const matchesNombre = !nombre || contract.NOMBRE === nombre;
                    const matchesComercializadora = !comercializadora || contract.COMERCIALIZADORA === comercializadora;
                    const matchesEstado = !estado || contract.ESTADO === estado;

                    if (matchesCif && matchesNombre && matchesComercializadora && matchesEstado) {
                        const row = document.createElement('tr');

                        const id = contract.CIF ?? 'N/A';
                        const nombre = contract.NOMBRE ?? 'N/A';
                        const fecha = contract.FECHA ?? 'N/A';
                        const comercializadora = contract.COMERCIALIZADORA ?? 'N/A';
                        const estado = contract.ESTADO ?? 'N/A';

                        // Crear todas las celdas para mostrar toda la información
                        row.innerHTML = `
                            <td>${id}</td>
                            <td>${nombre}</td>
                            <td>${fecha}</td>
                            <td>${comercializadora}</td>
                            <td>${estado}</td>
                        `;
                        resultsTableBody.appendChild(row);
                    }
                });
                
            } else {
                console.error('Respuesta inesperada:', data);
            }
        })
        .catch(error => console.error('Error al realizar la consulta:', error));
}
