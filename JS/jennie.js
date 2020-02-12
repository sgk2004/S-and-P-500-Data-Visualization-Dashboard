// url='TEST.json' 
// d3.json(url).then(data => {
//     console.log(data)
// }); 

function






////////////////////////////////////////////////////////////////////////////////////CHART///////////////////////////////////////////
d3.json("http://localhost:5000/sector/Technology/").then( data => {
// d3.json("2018AMAZON.json").then( data => {
    console.log(data)
    const tickers =data.map( record => record.ticker);
    const revenue= data.map(record=> (record.Revenue/1000000000));
    const sector= data.map(record=> record.Sector);
    console.log(tickers)
    console.log(revenue)
    console.log(sector)
//});


//chart.js pie
    // var Chart = require('Test.js');
    var ctx = document.getElementById('myChart').getContext('2d');
    const chart= new Chart(ctx, {
        type: 'pie',
        data: {
            labels: tickers,
            datasets: [
                {
                    label: tickers,
                    data: revenue,
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f",'#ff6384', 'CornflowerBlue', 'orange', 'teal', 'Aquamarine', 'salmon', 'GreenYellow'],
                    hoverBorderWidth: 15,
                    hoverBorderColor: ["#3e95cd", "#8e5ea2","#3cba9f",'#ff6384', 'CornflowerBlue', 'orange', 'teal', 'Aquamarine', 'salmon', 'GreenYellow']
                }
            ],
        },
        options: {
            // title: {
            //     display: true,
            //     text: 'Revenue in 2018',
            //     fontSize: 50,
            //     position: 'top',
            //     fontColor: 'black',
            //     defaultFontFamily: 'Arial'
            // },
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 50,
                    Padding: 25,
                    fontStyle: 'bold',
                    fontColor: 'black',
                    fontSize: 18,


                }
            },
            responsive: true, 
            aspectRatio: 1,
            maintainAspectRatio: false,
            animation: {
                animateRotate: true,
                render: false
            },
            //events: ['click'],
            onClick : function (item) {
                var activePoints = chart.getElementsAtEvent(item);
                console.log(activePoints);
                var tickerSelected= (activePoints.map(record => record._model.label));
                console.log(tickerSelected)   
                return window.open(`https://finance.yahoo.com/quote/${tickerSelected}?p=${tickerSelected}&.tsrc=fin-srch.com/bar`);
                //return window.open('chart2.html');
              //console.log(item)
                },
        fill: 'rgba(255, 0, 255, 0.5)',
        },
    
        //labels: record.ticker

    });
    console.log(tickers)
});

