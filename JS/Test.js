// url='TEST.json' 
// d3.json(url).then(data => {
//     console.log(data)
// }); 

// d3.json("http://127.0.0.1:5000/sector/").then( data => {
d3.json("2018AMAZON.json").then( data => {
    const tickers =data.map( record => record.ticker);
    const revenue= data.map(record=> (record.Revenue/100000));
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
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"]
                }
            ],
        },
        options: {
            title: {
                display: true,
                text: 'Revenue in 2018',
                fontSize: 50,
                position: 'top',
                fontColor: 'black'
            },
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

