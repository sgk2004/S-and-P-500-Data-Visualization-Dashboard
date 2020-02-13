// Function for on change for the dropdown menu
function optionChangedSector(selectedID){

    // Check if the right value selected is passed to the function
    console.log(selectedID);
 
    // Read the json file for the data
    d3.json("2018.json").then((data) => {
         // Check if data is loaded fully
         // console.log(data);
    
 
    // ----------------------------------------------------------------------------
    // To clear the dropdown before appending all the option attributes value
    d3.select("#sectorDataset").html("");   
    
    // To Select only the unique values from Sector
    const arraySector = data.map(item => item.Sector)
    const sectors = [...new Set(arraySector)];
       
   //  console.log(sectors) ;
   
   // Add the sectors to dropdown menu
    sectors.forEach(item =>
         {
          // console.log(item.id);
         d3.select ("#sectorDataset").append('option').attr('value', item).text(item);
         });

   
    // // -----------------------------------------------------------------------------------
    // // Passing the user selected value
    d3.select("#sectorDataset").node().value = selectedID;
    
    // // Filter Metadata for user selected ID from drop down
    const idMetadata = data.filter(item=> (item.Sector == selectedID));
             
      
    // // Check if the right metadata is loaded for the user selected ID
    console.log(idMetadata);
    // // ---------------------------------------------------------------------------------
   
    d3.select("#shareDataset").html("");   
   
   // Select the metadata array and for each item append the item ID
   // add ID to the dropdown
   idMetadata.forEach(item =>
        {
         // console.log(item.id);
        d3.select ("#shareDataset").append('option').attr('value', item.ticker).text(item.ticker);
        });


    
    // //Display each key-value pair from the metadata JSON object into <div> class "panel panel-primary" 
    // // append <p> and for each item of the array display the 
   //  const panelDisplay = d3.select("#sample-metadata");
   //  panelDisplay.html("");
   //  Object.entries(idMetadata[0]).forEach(item=> 
   //     {
   //        console.log(item);
   //        panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
   //     });

    });
}
 
 // ------------------------------------------------------------------------------------------------------
 // Initial page load takes the id 940
 optionChangedSector('Energy');
 
 // When SECTOR from dropdown is selected, event on change takes the value and calls the function
 d3.select("#sectorDataset").on('change',() => {
 optionChangedSector(d3.event.target.value);
 });
