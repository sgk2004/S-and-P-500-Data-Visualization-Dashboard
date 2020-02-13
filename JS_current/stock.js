// Function for on change (Ticker)for the dropdown menu
function optionChangedTicker(){
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
     }
 
 // ------------------------------------------------------------------------------------------------------

 optionChangedTicker();

 d3.select("#shareDataset1").on('change',() => {
   optionChangedTicker(d3.event.target.value);
});