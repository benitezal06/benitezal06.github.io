
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

function buildPlot(sampleId){
    d3.json("samples.json").then(function (data){
        var samples = data.samples;
        //console.log(data)
        var resultArray = samples.filter(obj => obj.id == sampleId);
        //console.log(resultArray);
        var otu_ids = resultArray[0].otu_ids
        // console.log(otu_ids)
        var sample_values = resultArray[0].sample_values
        //console.log(sample_values);
        var otu_labels = resultArray[0].otu_labels
        // console.log(otu_labels);
        var trace = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(ot => `OTU ${ot}`).reverse(),
            name: "OTU",
            type: "bar",
            orientation: "h",
            marker: {
                color: 'rgb(123,204,196',
                opacity: 0.6,
            }
        }
        var layout = {
            title: "Belly Button Biodiversity",
            margin: {
              l: 100,
              r: 100,
              t: 100,
              b: 100
            }
        }

        Plotly.newPlot("bar", [trace], layout);

        var trace1 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
              size: sample_values,
              color: otu_ids,
              
            }
            
        }

        var layout1 = {
            height: 600,
            width: 1200
        }
        Plotly.newPlot("bubble", [trace1],layout1);

    }
 

)}

buildPlot(940)



function getInfo(metaId) {
    d3.json("samples.json").then(function (data){
        var metadata = data.metadata;
        //console.log(data)
        var metaArray = metadata.filter(obj => obj.id.toString()== metaId);
        console.log(metaArray);
        var id = metaArray[0].id
        console.log(id);
        var ethnicity = metaArray[0].ethnicity
        console.log(ethnicity);
        var gender = metaArray[0].gender
        console.log(gender)
        var age = metaArray[0].age
        console.log(age);
        var location = metaArray[0].location
        console.log(location)
        var bbtype = metaArray[0].bbtype
        console.log(bbtype)
        var wfreq = metaArray[0].wfreq
        console.log(wfreq);
  
        var panel = d3.select('#sample-metadata').text("h6");
        panel.text("ID: " + id);
        var panel = d3.select('#sample-metadata').append("h6");
        panel.text("Ethnicity: " + ethnicity);
        var panel = d3.select('#sample-metadata').append("h6");
        panel.text("Gender: " + gender);
        var panel = d3.select('#sample-metadata').append("h6");
        panel.text("Age: " + age);
        var panel = d3.select('#sample-metadata').append("h6");
        panel.text("Location: " + location);
        var panel = d3.select('#sample-metadata').append("h6");
        panel.text("Bbtype: " + bbtype);
        var panel = d3.select('#sample-metadata').append("h6");
        panel.text("Wfreq: " + wfreq);
  
})
}
getInfo(940)

function init(){
    var dropmenu = d3.select("#selDataset")
    d3.json("samples.json").then(function (data){
        //console.log(data);
        data.names.forEach(name =>{
            dropmenu.append("option").text(name).property("value", name);
        })

    })
}

init()
function optionChanged(b){
    buildPlot(b)
    getInfo(b)

}
