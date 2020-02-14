// Function for on change (Ticker)for the dropdown menu
function optionChangedTicker(ticker){
          // console.log(tickerSelected);
          console.log(localStorage.getItem("allTickers"));
          var arrayTicker1 = localStorage.getItem("allTickers")
          console.log(typeof(arrayTicker1));    
          tickerArray= arrayTicker1.split(',')
          console.log(tickerArray);
          console.log(typeof(tickerArray));
                    
          d3.select("#shareDataset1").html("");
          tickerArray.forEach(item => 
               {
                    console.log(item);
                    d3.select ("#shareDataset1").append('option').attr('value', item).text(item);
      });
      d3.select ("#shareDataset1").node().value= ticker;
    
 
 // ------------------------------------------------------------------------------------------------------
  // Filter Metadata for user selected ID from drop down
  
  d3.json("http://localhost:5000/sector/").then((data) => {
  const financialIndicator = data.filter(item=> (item.ticker == ticker));
  // {
  //    console.log("------------------------")
  //    console.log(item);
  //    console.log(item.id);
     
  // });
// Check if the right metadata is loaded for the user selected ID
console.log(financialIndicator);
// ---------------------------------------------------------------------------------

//Display each key-value pair from the metadata JSON object into <div> class "panel panel-primary" 
// append <p> and for each item of the array display the 
const panelDisplay = d3.select("#financialIndicator");
panelDisplay.html("");
Object.entries(financialIndicator[0]).forEach(item=> 
  {
     // console.log(item);
     panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
  });
  })
  
}
// -----------------------------------------------------------------------------------------

 optionChangedTicker(localStorage.getItem("Ticker"));
 

 d3.select("#shareDataset1").on('change',() => {
   var tickerSelected = d3.select("#shareDataset1");
   var tickerValue = tickerSelected.property("value");
   optionChangedTicker(tickerValue);
});