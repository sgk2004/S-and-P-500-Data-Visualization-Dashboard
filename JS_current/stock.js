// Function for on change for the dropdown menu
function optionChanged(selectedID){

    // Check if the right value selected is passed to the function
    console.log(selectedID);
 
    // Read the json file for the data
    d3.json("http://localhost:5000/").then((data) => {
 
    // Check if data is loaded fully
    console.log(data); 
 
    // ----------------------------------------------------------------------------
    // To clear the dropdown before appending all the option attributes value
    d3.select("#selDataset").html("");   
    
    // Select the metadata array and for each item append the item ID
    // add ID to the dropdown
    data.forEach(item =>
         {
          // console.log(item.id);
         d3.select ("#selDataset").append('option').attr('value', item.ticker).text(item.ticker);
         });
    // // -----------------------------------------------------------------------------------
    // // Passing the user selected value
    d3.select("#selDataset").node().value = selectedID;
    
    // // Filter Metadata for user selected ID from drop down
    const idMetadata = data.filter(item=> 
        {
        (item.ticker == selectedID)
        console.log("------------------------")
        console.log(item);
        console.log(item.id);
          
       });
    // // Check if the right metadata is loaded for the user selected ID
    console.log(idMetadata);
    // // ---------------------------------------------------------------------------------
    
    // //Display each key-value pair from the metadata JSON object into <div> class "panel panel-primary" 
    // // append <p> and for each item of the array display the 
    const panelDisplay = d3.select("#sample-metadata");
    panelDisplay.html("");
    Object.entries(idMetadata[0]).forEach(item=> 
       {
          console.log(item);
          panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
       });

    });
}

 
    // -----------------------------------------------------------------------------------------
 
    // BAR CHART------------------------------------------------------------------------------------  
    
 
    // Filtering the data from sample array for the user selected ID
    // const idSample = data.samples.filter(item => parseInt(item.id) == selectedID);
    
    // // Checking values by logging to console
    // // console.log(typeof parseInt(item.id));
    // // console.log(idSample[0].sample_values);  
    // // console.log(idSample[0].otu_ids);  
    // // console.log(idSample[0].otu_labels);  
    
    // // ----------------------------------------------------
    // // Slicing the top 10 sample values
    // var sampleValue = idSample[0].sample_values.slice(0,10);
    // sampleValue= sampleValue.reverse();
    // var otuID = idSample[0].otu_ids.slice(0,10);
    // otuID = otuID.reverse();
    // var otuLabels = idSample[0].otu_labels
    // otuLabels = otuLabels.reverse();
 
    // // Checking values by logging to console
    // // console.log(sampleValue);
    // // console.log(otuID);
    // // console.log(otuLabels);
 
    // // Y axis of bar chart---------------------------------   
    // const yAxis = otuID.map(item => 'OTU' + " " + item);
    //    // console.log(yAxis);
    
    // // Defining the trace object and layout-----------------
    //    const trace = {
    //    y: yAxis,
    //    x: sampleValue,
    //    type: 'bar',
    //    orientation: "h",
    //    text:  otuLabels,
    //    marker: {
    //       color: 'rgb(142,124,195)',
    //       line: {
    //          width: 3
    //      }
    //     }
    //    },
    //    layout = {
    //    title: 'Top 10 Operational Taxonomic Units (OTU) /Individual',
    //    xaxis: {title: 'Number of Samples Collected'},
    //    yaxis: {title: 'OTU Id'}
    //    };
 
    //    // Plotting the graph using plotly----------------------------------------
    //    Plotly.newPlot('bar', [trace], layout,  {responsive: true});    
       
 // -------------------------------------------------------------------------------------------
       
 // BUBBLE CHART
 
//  // All the Sample value and otuID taken from the individual
//  var sampleValue1 =idSample[0].sample_values;
//  var otuID1= idSample[0].otu_ids;
 
//  // Defining the trace object and layout-----------------
//  const trace1 = {
//     x: otuID1,
//     y: sampleValue1,
//     mode: 'markers',
//     marker: {
//       color: otuID1,
      
//       size: sampleValue1
//     }
//   },
 
//   layout1 = {
//     title: 'Bubble Chart For Each Sample',
//     xaxis: {title: 'OTU Id'},
//     yaxis: {title: 'Number of Samples Collected'},
//     showlegend: false,
//     height: 800,
//     width: 1800
//     };
    
//  // Plotting the graph using plotly----------------------------------------
//  Plotly.newPlot('bubble', [trace1], layout1);
//  // -------------------------------------------------------------------------------------------
 
//  // GAUGE CHART--------------------------------------------------------------------------------
//  //Gauge Chart to plot the weekly washing frequency of the individual.   
//  const guageDisplay = d3.select("#gauge");
//  guageDisplay.html(""); 
//  const washFreq = idMetadata[0].wfreq;
 
//  const guageData = [
//     {
//       domain: { x: [0, 1], y: [0, 1] },
//       value: washFreq,
//       title: { text: "Belly Button Washing Frequency <br> (Scrubs Per Week)" },
//       type: "indicator",
//       mode: "gauge+number",     
//     //   text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
//     //   textposition: 'inside',
//     //   marker: {
//     //    colors: ['','','','','','','','','','white'],
//     //    labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
//     //    hoverinfo: 'label'
//     //  },    
//        gauge: {
//        axis: { range: [0,9] },
//        bar: { color: "d7b5d8" },
//        steps: [
//           { range: [0, 2], color: "#f2f0f7" },
//           { range: [2, 4], color: "#cbc9e2" },
//           { range: [4, 6], color: "#9e9ac8" },
//           { range: [6, 8], color: "#756bb1" },
//           { range: [8, 9], color: "#54278f" }
          
          
          
//         ],
//        threshold: {
//        //    line: { color: "red", width: 4 },
//        //    thickness: 0.75,
//           value: washFreq
//         }
//       }
//     }
//   ]; 
//   const gaugeLayout = {  width: 600, 
//                    height: 400, 
//                    margin: { t: 0, b: 0 }, 
//                    // xaxis: {
//                    //    // tickmode: "array", 
//                    //    tickvals: [0,1,2,3,4,5,6,7,8,9],
//                    //    ticktext: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6','6-7','7-8','8-9']}
//                     };
 
//  // Plotting the graph using plotly----------------------------------------
//   Plotly.newPlot('gauge', guageData, gaugeLayout); 
 
 
 
 // ------------------------------------------------------------------------------------------------------
 // Initial page load takes the id 940
 optionChangedSector('Technology');
 optionChangedTicker('AAPL');

 
 // When SECTOR from dropdown is selected, event on change takes the value and calls the function
 d3.select("#sectorDataset").on('change',() => {
 optionChangedSector(d3.event.target.value);
 });

 d3.select("#shareDataset").on('change',() => {
   optionChangedTicker(d3.event.target.value);
});