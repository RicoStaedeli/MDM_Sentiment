// Get the input element that has the text
const inputElement = document.getElementById("input-text");
const ctx = document.getElementById('myChart');

// Listen for the "change" event on the input element
inputElement.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        console.log("Enter pressed")
      handleFiles()
    }
});

chartdata = {
  labels: ['Negativity', 'Positivity'],
  datasets: [{
    label: 'Data for Sentiment Analysis',
    data: [50,50],
    borderWidth: 1
  }]
};
chart = new Chart(ctx, {
    type: 'bar',
    data: chartdata,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


// Define the handleFiles function
function handleFiles() {
    console.log("Try to send the text")

    fetch('/sentiment?'+ new URLSearchParams({
        text: inputElement.value
    })).then(response => response.json())
    .then(data => {
        console.log(data)
        //clear data in chart 
        chartdata.labels = []
        chartdata.datasets[0].data = []
        
        //Add new Data to chart
        data.forEach(element => {
            chartdata.datasets[0].data.push(element.probability)
            chartdata.labels.push(element.className)
        });
        console.log(chartdata)
        chart.update();
    })   
}