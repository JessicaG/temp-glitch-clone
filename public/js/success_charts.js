var ctx = document.getElementById('chart').getContext('2d'); //from the docs https://www.chartjs.org/docs/latest/getting-started/
var chart = new Chart(ctx, {
    // not sure what charts we like but this is is a start
    type: 'line',

    // Fake data
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'data',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },

    // Config options go here (not sure what we want)
    options: {}
});