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
  updatePlotly();
  
}
 // *****************************************SUPARNA*************************
 basic_url = "http://localhost:5000/"
 company_url= "http://localhost:5000/companyname/"
 
 
 // // Call updatePlotly() when a change takes place to the DOM
 // d3.selectAll("#selTicker").on("change", updatePlotly);
 
 // // This function is called when a dropdown menu item is selected
 function updatePlotly() {
 
 // ********************************************************************
 
   // Use D3 to select the dropdown menu
   var tickerdropdownMenu = d3.select("#shareDataset1");
   // Assign the value of the dropdown menu option to a variable
   var ticker = tickerdropdownMenu.property("value");
   
     //Build url
     var url = `http://localhost:5000/${ticker}`;
     var company_url = `http://localhost:5000/companyname`
     console.log(url); 
     //Pull company data and loop through it for graphs
     d3.json(company_url).then(function(data) {
         console.log(data);
         company = data.filter(function (item){item.Symbol ===ticker});     
         company_name = company.Name;
     });
     //Pull all stock data and create candlestick
     d3.json(url).then(function(data) {
     console.log(data);
     dates = data.map(item=> item.date);
     volume = data.map(item=> +item.volume);
     console.log(dates);
     console.log(volume);
     console.log(data.map(item=> item.close));
     
 
     var trace = {
     x: data.map(item=> item.date),
     close: data.map(item=> item.close),
     high: data.map(item=> item.high),
     low: data.map(item=> item.low),
     open: data.map(item=> item.open),
   
     //Customize colors
     increasing: {line: {color: 'black'}},
     decreasing: {line: {color: 'red'}},
   
     type: 'candlestick', 
     xaxis: 'x',
     yaxis: 'y'
   };
   
   var data = [trace];
   
   var layout = {
     dragmode: 'zoom',
     showlegend: false,
     title: `Open- High - Low - Close Chart of ${company_name}`,
     xaxis: {
       autorange: true,
       title: 'Date',
        rangeselector: {
           x: 0,
           y: 1.2,
           xanchor: 'left',
           font: {size:8},
           buttons: [{
               step: 'month',
               stepmode: 'backward',
               count: 1,
               label: '1 month'
           }, {
               step: 'month',
               stepmode: 'backward',
               count: 6,
               label: '6 months'
           }, {
               step: 'all',
               label: 'All dates'
           }]
         }
     },
     yaxis: {
       autorange: true,
     }
   };
   // Plot the volume of the company
 
   var trace_vol = {
     x: dates,
     y: volume, 
     mode: 'lines',
     line: {
       color: 'orange',
       width: 1
     },
     legend: {
         y: 0.5,
         traceorder: 'reversed',
         font: {
           size: 16
         }
     }       
     };
   
   var data_vol = [trace_vol];
   
   var layout_vol = {
     xaxis: {
       autorange: true,
       title: 'Date',
     },
     yaxis: {
       autorange: true,
       title: 'Volume',
     },
     title :`Daily Volume Chart of ${company_name}`
   };
   
   Plotly.newPlot('plot', data, layout);
   Plotly.newPlot('volumeplot', data_vol, layout_vol);
   });
 
 
// -----------------------------------------------------------------------------------------

// *********************************************************************************************
//**************************************************************************************************************/
//Quarterly Data Plot
// d3.selectAll(".Quarterly").on("click", updatePlotly_quarterly);
// function updatePlotly_quarterly() {
// quarterly_url = `${basic_url}/AMZN/Q`
// d3.json(quarterly_url).then(function(data) {
//     console.log(data);
//     console.log(quarterly_url);
    
//     month = data.map(item=> item.month);
//     var month_name =[];
    
//     for (let i =0; i<= month.length; i++){
//       
//       if (month[i] >= 1 && month[i]<= 3){
//       var  mon_short ="Q1";
//       }
//       if (month[i] >= 4 && month[i]<= 6){
//       var  mon_short ="Q2";
//       }
//       if (month[i] >= 7 && month[i]<= 9){
//       var  mon_short ="Q3";
//       }
//       if (month[i] >= 10 && month[i]<= 12){
//       var  mon_short ="Q4";
//       }
//       month_name.push(mon_short);
//     }
//     console.log(month_name);
//   });
//       }  
//     year = data.map(item => item.Year);
//     volume = data.map(item => item.volume);
//     //Build an array with the month and Year for each dictionary in the array
//     month_yeararr=[]
//     for(let i=0; i< month.length; i++){
//         monthYear = `${year[i]}-${month[i]}`;
//         month_yeararr.push(monthYear);
//     }
//     console.log(month);
//     console.log(year);
//     console.log(month_yeararr);

    
// var mon_trace = {
//     x: month_yeararr,
//     close: data.map(item=> item.close),
//     high: data.map(item=> item.high),
//     low: data.map(item=> item.low),
//     open: data.map(item=> item.open),

      
//     //Customize colors
//         increasing: {line: {color: 'black'}},
//         decreasing: {line: {color: 'red'}},
      
//         type: 'candlestick', 
//         xaxis: 'x',
//         yaxis: 'y'
//       };
      
//       var mon_data = [mon_trace];
      
//       var mon_layout = {
//         dragmode: 'zoom',
//         showlegend: false,
//         title: `Open- High - Low - Close Chart of AMZN (taking monthly average values)`,
//         xaxis: {
//           autorange: true,
//           title: 'Date',
//            rangeselector: {
//               x: 0,
//               y: 1.2,
//               xanchor: 'left',
//               font: {size:8},
//             },
//         yaxis: {
//           autorange: true,
//         }
//       }
//     }
//     Plotly.newPlot('plot', mon_data, mon_layout);

//       // Plot the volume of the company
    
//       var mon_trace = {
//         x: month_yeararr,
//         y: volume, 
//         mode: 'lines',
//         line: {
//           color: 'orange',
//           width: 1
//         },
//         legend: {
//             y: 0.5,
//             traceorder: 'reversed',
//             font: {
//               size: 16
//             }
//         }       
//         };
      
//       var data_vol = [mon_trace];
      
//       var layout_vol = {
//         xaxis: {
//           autorange: true,
//           title: 'Date',
//         },
//         yaxis: {
//           autorange: true,
//           title: 'Volume',
//         },
//         title :`Volume Chart of AMZN taking average values`
//       };
      
      
//       Plotly.newPlot('volumeplot', data_vol, layout_vol);
//       });
//     }

//**************************************************************************************************************/
//Monthly Data Plot
d3.selectAll(".Monthly").on("click",updatePlotly_monthly);

function updatePlotly_monthly()
 {
   ticker = d3.select ("#shareDataset1").node().value;
  monthly_url = `${basic_url}${ticker}/M`
  d3.json(monthly_url).then(function(data) {
    console.log(data);
    console.log(monthly_url);
    
    month = data.map(item=> item.month);
    console.log(month);
    year = data.map(item => item.Year);
    volume = data.map(item => item.volume);
    //Build an array with the month and Year for each dictionary in the array
    month_yeararr=[]
    for(let i=0; i< month.length; i++){
        monthYear = `${year[i]}-${month[i]}`;
        month_yeararr.push(monthYear);
    }
    console.log(month);
    console.log(year);
    console.log(month_yeararr);

    
var mon_trace = {
    x: month_yeararr,
    close: data.map(item=> item.close),
    high: data.map(item=> item.high),
    low: data.map(item=> item.low),
    open: data.map(item=> item.open),

      
    //Customize colors
        increasing: {line: {color: 'black'}},
        decreasing: {line: {color: 'red'}},
      
        type: 'candlestick', 
        xaxis: 'x',
        yaxis: 'y'
      };
      
      var mon_data = [mon_trace];
      
      var mon_layout = {
        dragmode: 'zoom',
        showlegend: false,
        title: `Open- High - Low - Close Chart of ${company_name} (taking monthly average values)`,
        xaxis: {
          autorange: true,
          title: 'Date',
           rangeselector: {
              x: 0,
              y: 1.2,
              xanchor: 'left',
              font: {size:8},
            },
        yaxis: {
          autorange: true,
        }
      }
    }
    Plotly.newPlot('plot', mon_data, mon_layout);

      // Plot the volume of the company
    
      var mon_trace = {
        x: month_yeararr,
        y: volume, 
        mode: 'lines',
        line: {
          color: 'orange',
          width: 1
        },
        legend: {
            y: 0.5,
            traceorder: 'reversed',
            font: {
              size: 16
            }
        }       
        };
      
      var data_vol = [mon_trace];
      
      var layout_vol = {
        xaxis: {
          autorange: true,
          title: 'Date',
        },
        yaxis: {
          autorange: true,
          title: 'Volume',
        },
        title :`Monthly Volume Chart of ${company_name} taking average values`
      };
      
      
      Plotly.newPlot('volumeplot', data_vol, layout_vol);
      });
    }
//**************************************************************************************************************//

//Daily Data Plot
d3.selectAll(".Daily").on("click", updatePlotly);

//********************************************************************************************************** *//
//Yearly Data Plot
d3.selectAll(".Yearly").on("click", updatePlotly_yearly);
function updatePlotly_yearly() {
ticker = d3.select ("#shareDataset1").node().value;
yearly_url = `${basic_url}${ticker}/Y`
d3.json(yearly_url).then(function(data) {
    console.log(data);
    console.log(yearly_url);
    
    year = data.map(item => item.Year);
    volume = data.map(item => item.volume);
    
var trace = {
    x: year,
    close: data.map(item=> item.close),
    high: data.map(item=> item.high),
    low: data.map(item=> item.low),
    open: data.map(item=> item.open),

      
    //Customize colors
        increasing: {line: {color: 'black'}},
        decreasing: {line: {color: 'red'}},
      
        type: 'candlestick', 
        xaxis: 'x',
        yaxis: 'y'
      };
      
      var data = [trace];
      
      var layout = {
        dragmode: 'zoom',
        showlegend: false,
        title: `Open- High - Low - Close Chart of ${company_name} (taking yearly average values)`,
        xaxis: {
          autorange: true,
          title: 'Date',
           rangeselector: {
              x: 0,
              y: 1.2,
              xanchor: 'left',
              font: {size:8},
            },
        yaxis: {
          autorange: true,
        }
      }
    }
    Plotly.newPlot('plot', trace, layout);

      // Plot the volume of the company
    
      var trace = {
        x: year,
        y: volume, 
        mode: 'lines',
        line: {
          color: 'orange',
          width: 1
        },
        legend: {
            y: 0.5,
            traceorder: 'reversed',
            font: {
              size: 16
            }
        }       
        };
      
      var data_vol = [trace];
      
      var layout_vol = {
        xaxis: {
          autorange: true,
          title: 'Date',
        },
        yaxis: {
          autorange: true,
          title: 'Volume',
        },
        title :`Yearly Volume Chart of ${company_name} taking average values`
      };
      
      
      Plotly.newPlot('volumeplot', data_vol, layout_vol);
      });
    }
  }
    // *******************************************************************************************
 optionChangedTicker(localStorage.getItem("Ticker"));
 

 d3.select("#shareDataset1").on('change',() => {
   var tickerSelected = d3.select("#shareDataset1");
   var tickerValue = tickerSelected.property("value");
   optionChangedTicker(tickerValue);
   
});