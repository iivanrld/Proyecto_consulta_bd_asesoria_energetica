document.addEventListener('DOMContentLoaded', function() {
    fetch('http://192.168.101.4:3000/asesoria_energetica')
        .then(response => response.json())
        .then(data => {
            let TRAMITADOCount = 0;
            let noTramitadoCount = 0;

            data.forEach(order => {
                if (order.ESTADO === "TRAMITADO") {
                    TRAMITADOCount++;
                } else if (order.ESTADO.trim() === "") { // Considerar también string vacío
                    noTramitadoCount++;
                }
            });

            const ctx = document.getElementById('ordersChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['TRAMITADO', 'No Tramitado'],
                    datasets: [{
                        label: 'Estado de Pedidos',
                        data: [TRAMITADOCount, noTramitadoCount],
                        backgroundColor: ['#36a2eb', '#ff6384'],
                        borderColor: ['#36a2eb', '#ff6384'],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Estado de los Pedidos'
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
});
