// url='TEST.json' 
// d3.json(url).then(data => {
//     console.log(data)
// }); 

function optionChanged(selected_sector, chartChoice) {

    const sectors= ['Consumer Cyclical', 'Energy', 'Technology', 'Industrials', 'Financial Services', 'Communication Services', 'Consumer Defensive', 'Healthcare', 'Basic Materials', 'Real Estate', 'Utilities'];
    d3.select("#selDataset").html("");
    sectors.forEach(item => 

    d3.select("#selDataset").append('option').attr('value', item).text(item));
    // d3.select("#selDataset").node().value = selected_sector;
    d3.select("#selDataset").node().value = selected_sector;
    
////////////////////////////////////////////////////////////////////////////////////CHART///////////////////////////////////////////
    d3.json(`http://localhost:5000/sector/${selected_sector}/`).then( data => {
    // d3.json("2018AMAZON.json").then( data => {
        console.log(data)
        const tickers =data.map( record => record.ticker);
        const revenue= data.map(record=> (record.Revenue));
        const sector= data.map(record=> record.Sector);
        // const EPS= data.map(record=> record.EPS);
        console.log(tickers)
        console.log(revenue)
        console.log(sector)

    //chart.js pie
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
        
        });
        console.log(tickers)
    });

    ///////////////////
    // var button= d3.select('#graph-btn');
    // if (button.on('click', searchEPS)) {
    // function searchEPS () {
    //     var chartChoice= d3.select('#graph-btn').text();
    //     return optionChanged(selected_sector, chartChoice)
    // };
    // }
    // else {
    //     var chartChoice = 'sector';
    // }
   
    
};
optionChanged('Energy', 'sector');
d3.select("#selDataset").on('change',() => {
    optionChanged(d3.event.target.value);
});

// function searchEPS () {
//     var chartChoice= d3.select('#graph-btn').text();
//     var selected_sector= document.getElementById("selDataset").value;
//     console.log(selected_sector)
//     return optionChanged(selected_sector, chartChoice)
// };

// function searchEPS2 () {
//     var chartChoice= d3.select('#graph-btn').text();
//     var selected_sector= document.getElementById("selDataset").value;
//     console.log(selected_sector)
//     return optionChanged(selected_sector, chartChoice)
// };

// var button= d3.select('#graph-btn');
// button.on('click', searchEPS);
// var button2= d3.select('#graph-btn2');
// button2.on('click', searchEPS2);
