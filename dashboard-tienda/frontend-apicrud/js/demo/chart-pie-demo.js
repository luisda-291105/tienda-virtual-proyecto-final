// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#dda20a', '#be2617'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});

// cargar distribución de métodos de pago
function loadPieChartData() {
  const root = window.API_ROOT || 'http://localhost:3000';
  fetch(`${root}/api/pedidos`)
    .then(r => r.json())
    .then(pedidos => {
      const counts = {};
      pedidos.forEach(p => {
        const m = p.metodo_pago || 'Desconocido';
        counts[m] = (counts[m] || 0) + 1;
      });
      myPieChart.data.labels = Object.keys(counts);
      myPieChart.data.datasets[0].data = Object.values(counts);
      myPieChart.update();
    })
    .catch(err => console.error('Error cargando datos pie chart', err));
}

loadPieChartData();
