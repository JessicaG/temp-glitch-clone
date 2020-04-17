d3.csv('sdks-used-trial-accounts.csv')
    .then(makeChart);

function makeChart(sdks) {
    var labels = sdks.map(sdk => sdk.SDK)
    var distinctCounts = sdks.map(sdk => sdk.COUNT)
    var ctx = document.getElementById('chart').getContext('2d'); //from the docs https://www.chartjs.org/docs/latest/getting-started/
    var chart = new Chart(ctx, {
    // not sure what charts we like but this is is a start
    type: 'bar',

    // Fake data
    data: {
        labels,
        datasets: [{
            label: 'distinct sdks used in trial accounts',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: distinctCounts
        }]
    },

    // Config options go here (not sure what we want)
    options: {}
});
}