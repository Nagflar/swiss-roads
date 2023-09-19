const response = await fetch("./data.json");
const data = await response.json();
console.log(data);

document.addEventListener("DOMContentLoaded", function(){
    // Code here waits to run until the DOM is loaded.
    console.log("DOM is ready");
});
  
let monthCtx = document.getElementById('month-chart-canvas').getContext('2d');
let roadsCtx = document.getElementById('roads-chart-canvas').getContext('2d');
let severityCtx = document.getElementById('severity-chart-canvas').getContext('2d');
let frenchRoadsCtx = document.getElementById('french-roads-chart-canvas').getContext('2d');
let frenchAccidentBubbleCtx = document.getElementById('french-accident-bubble-chart-canvas').getContext('2d');
let accidentBubbleCtx = document.getElementById('accident-bubble-chart-canvas').getContext('2d');

let monthChart = new Chart(monthCtx, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: '# of Accidents',
            // Should listen an event and swap data
            data: [],
        }]
    },
    options: {
        indexAxis: 'y',
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 400,
                ticks: {
                    font: {
                        size: 12
                    }
                }
            },
            x: {
                ticks: {
                    font: {
                        size: 12
                    }
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Accidents per Month'
            }
        }
    }
});
let roadsChart = new Chart(roadsCtx, {
    type: 'pie',
    data: {
        labels: ['Motorway', 'Express way', 'Principal road', 'Minor road', 'Motorway side installation', 'Other'],
        datasets: [{
            label: '# of Accidents',
            // Should listen an event and swap data
            data: []
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 400
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Accidents per Month'
            }
        }
    }
});
let frenchRoadsChart = new Chart(frenchRoadsCtx, {
    type: 'pie',
    data: {
        labels: ['Road type metropole', 'Road type town', 'Road type national', 'Road type departemental', 'Road type roadway', 'Road type non public', 'Road type other'],
        datasets: [{
            label: '# of Accidents',
            // Should listen an event and swap data
            data: []
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 400
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Accidents per Month'
            }
        }
    }
});
let severityChart = new Chart(severityCtx, {
    type: 'pie',
    data: {
        labels: ['Fatalities', 'Severe', 'Light', 'Property'],
        datasets: [{
            label: '# of Accidents',
            // Should listen an event and swap data
            data: [],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ]
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Accidents per Month'
            }
        }
    }
});
let frenchAccidentBubbleChart = new Chart(frenchAccidentBubbleCtx, {
    type: 'bubble',
    data: {
        datasets: [],
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Accidents per 1000 habitants and canton population'
            }
        }
    }

})
let accidentBubbleChart = new Chart(accidentBubbleCtx, {
    type: 'bubble',
    data: {
        datasets: [],
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Accidents per 1000 habitants and canton population'
            }
        }
    }

})


let updateMonthChart = () => {
    const year = document.getElementById("month-year-select").value;
    const zone = document.getElementById("month-zone-select").value;

    const cantonData = data["swiss"][year].find(c=>c.cantonCode == zone);
    const monthData = [
        cantonData.accident_count_january,
        cantonData.accident_count_february,
        cantonData.accident_count_march,
        cantonData.accident_count_april,
        cantonData.accident_count_may,
        cantonData.accident_count_june,
        cantonData.accident_count_july,
        cantonData.accident_count_august,
        cantonData.accident_count_september,
        cantonData.accident_count_october,
        cantonData.accident_count_november,
        cantonData.accident_count_december
    ];
    monthChart.data.datasets[0].data = monthData;
    monthChart.options.plugins.title.text = cantonData.cantonCode + ' : Accidents per Month in ' + year;
    monthChart.update();
}

let updateRoadsChart = () => {
    const year = document.getElementById("roads-year-select").value;
    const zone = document.getElementById("roads-zone-select").value;

    const cantonData = data["swiss"][year].find(c=>c.cantonCode == zone);
    const roadData = [
        cantonData.accident_count_rt430,
        cantonData.accident_count_rt431,
        cantonData.accident_count_rt432,
        cantonData.accident_count_rt433,
        cantonData.accident_count_rt434,
        cantonData.accident_count_rt439,
    ];
    roadsChart.data.datasets[0].data = roadData;
    roadsChart.options.plugins.title.text = cantonData.cantonCode + ' : Road types ' + year;
    roadsChart.update();
}

let updateFrenchRoadsChart = () => {
    const year = document.getElementById("french-roads-year-select").value;
    const zone = document.getElementById("french-roads-zone-select").value;
    const departementData = data["french"][year].find(c=>c.departementCode == zone);
    const roadData = [
        departementData.accident_count_metropole,
        departementData.accident_count_communale,
        departementData.accident_count_nationale,
        departementData.accident_count_departementale,
        departementData.accident_count_autoroute,
        departementData.accident_count_non_public,
        departementData.accident_count_autre,
    ];
    frenchRoadsChart.data.datasets[0].data = roadData;
    frenchRoadsChart.options.plugins.title.text = departementData.departementCode + ' : Road types ' + year;
    frenchRoadsChart.update();
}

let updateSeverityChart = () => {
    const year = document.getElementById("severity-year-select").value;
    const zone = document.getElementById("severity-zone-select").value;
    const cantonData = data["swiss"][year].find(c=>c.cantonCode == zone);
    const severityData = [
        cantonData.accident_count_fatalities,
        cantonData.accident_count_severe,
        cantonData.accident_count_light,
        cantonData.accident_count_property,
    ];
    severityChart.data.datasets[0].data = severityData;
    severityChart.options.plugins.title.text = cantonData.cantonCode + ' : Severity ' + year;
    severityChart.update();
}

let updateFrenchAccidentBubbleChart = () => {
    const year = document.getElementById("french-accident-1000-year-select").value;
    const depData = data["french"][year];
    frenchAccidentBubbleChart.data.datasets = [];
    depData.forEach(c=>{
        frenchAccidentBubbleChart.data.datasets.push({
            label: c.departementCode,
            data: [
                {
                    x: c.population,
                    y: c.accident_count_per_1000_population,
                    r: 10
                }
            ]
        })
    })
    frenchAccidentBubbleChart.update();
}

let updateAccidentBubbleChart = () => {
    const year = document.getElementById("accident-1000-year-select").value;
    const cantonData = data["swiss"][year];
    accidentBubbleChart.data.datasets = [];
    cantonData.forEach(c=>{
        accidentBubbleChart.data.datasets.push({
            label: c.cantonCode,
            data: [
                {
                    x: c.population,
                    y: c.accident_count_per_1000_population,
                    r: 10
                }
            ]
        })
    })
    accidentBubbleChart.update();
}

document.getElementById("month-year-select").addEventListener("change", updateMonthChart)
document.getElementById("month-zone-select").addEventListener("change", updateMonthChart);

document.getElementById("roads-year-select").addEventListener("change", updateRoadsChart)
document.getElementById("roads-zone-select").addEventListener("change", updateRoadsChart);

document.getElementById("french-roads-year-select").addEventListener("change", updateFrenchRoadsChart)
document.getElementById("french-roads-zone-select").addEventListener("change", updateFrenchRoadsChart);

document.getElementById("severity-year-select").addEventListener("change", updateSeverityChart)
document.getElementById("severity-zone-select").addEventListener("change", updateSeverityChart);

document.getElementById("french-accident-1000-year-select").addEventListener("change", updateFrenchAccidentBubbleChart)

document.getElementById("accident-1000-year-select").addEventListener("change", updateAccidentBubbleChart)


updateMonthChart();
updateRoadsChart();
updateSeverityChart();
updateFrenchRoadsChart();
updateAccidentBubbleChart();
updateFrenchAccidentBubbleChart();