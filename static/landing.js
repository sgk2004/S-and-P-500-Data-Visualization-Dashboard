// Function for on change for the dropdown menu
function optionChangedSector(selectedID){
        // Check if the right value selected is passed to the function
    // console.log(selectedID);
 
    // Read the json file for the data
    d3.json("/sector/").then((data) => {
         // Check if data is loaded fully
        //  console.log(data);
    
 
    // ----------------------------------------------------------------------------
    // To clear the dropdown before appending all the option attributes value
    d3.select("#sectorDataset").html("");   
    
    // To Select only the unique values from Sector
    const arraySector = data.map(item => item.Sector)
    const sectors = [...new Set(arraySector)];
       
   //  console.log(sectors) ;
   
   // Append SECTORS to dropdown menu
    sectors.forEach(item =>
         {
          //   console.log(item);
          // console.log(item.id);
         d3.select ("#sectorDataset").append('option').attr('value', item).text(item);
         });

   
    // // -----------------------------------------------------------------------------------
    // // Passing the user selected value
    d3.select("#sectorDataset").node().value = selectedID;
    
    // // Filter Metadata for user selected ID from drop down
    const idMetadata = data.filter(item=> (item.Sector == selectedID));
             
      
    // // Check if the right metadata is loaded for the user selected ID
          //console.log(idMetadata);
    // // ---------------------------------------------------------------------------------
   
    d3.select("#shareDataset").html(""); 
     
   
   
   // Append TICKERS to the dropdown
   const arrayTicker = [];
   idMetadata.forEach(item =>
        {
          arrayTicker.push(item.ticker)

     //     console.log(item.ticker);
          d3.select ("#shareDataset").append('option').attr('value', item.ticker).text(item.ticker);
        });
        localStorage.setItem("allTickers",arrayTicker);
        // console.log(localStorage.getItem("allTickers"));

      
    });

     // // JENNIE
     d3.json(`/sector/${selectedID}/`).then( data => {
          // d3.json("2018AMAZON.json").then( data => {
            //   console.log(data)
              const tickers =data.map( record => record.ticker);
              const revenue= data.map(record=> (record.Revenue));
              const sector= data.map(record=> record.Sector);
              // const EPS= data.map(record=> record.EPS);
            //   console.log(tickers)
            //   console.log(revenue)
            //   console.log(sector)
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
                              backgroundColor: ["#3E95CD", "#8E5EA2","#3CBA9F",'#FF6384', 'CornflowerBlue', 'orange', 'teal', 'Aquamarine', 'salmon', 'GreenYellow'],
                              hoverBorderWidth: 15,
                              hoverBorderColor: ["#3E95CD", "#8E5EA2","#3CBA9F",'#FF6384', 'CornflowerBlue', 'orange', 'teal', 'Aquamarine', 'salmon', 'GreenYellow']
                          }
                      ],
                  },
                  options: {
                      title: {
                          display: true,
                          text: `Revenue for ${selectedID} sector in 2018`,
                          fontSize: 20,
                          position: 'top',
                          fontColor: 'black',
                          defaultFontFamily: 'Arial'
                      },
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
                        //   console.log(activePoints);
                          var tickerSelected= (activePoints.map(record => record._model.label));
                        //   console.log(tickerSelected)   
                          return window.open(`https://finance.yahoo.com/quote/${tickerSelected}?p=${tickerSelected}&.tsrc=fin-srch.com/bar`);
                          //return window.open('chart2.html');
                      //console.log(item)
                          },
                  fill: 'rgba(255, 0, 255, 0.5)',
                  },
              
              });
            //   console.log(tickers)
          });

 
}


 
 // ------------------------------------------------------------------------------------------------------
 // Initial page load takes the id 940
 optionChangedSector('Energy');
 
 // When SECTOR from dropdown is selected, event on change takes the value and calls the function
 d3.select("#sectorDataset").on('change',() => {
 optionChangedSector(d3.event.target.value);
 });
//  localStorage.setItem("Sector",sectorSelectedPage1 )

//  d3.select("#shareDataset1").on('change',() => {
//     optionChangedTicker(d3.event.target.value);
//  });