function getProfileReport(totalCost, instrToCallCount, lineNumToCallCount) {
    let report = "";
    const numAllCalls = Object.values(lineNumToCallCount).reduce((a, b) => a + b);
    report += `<h3>Total cost: ${totalCost} <br></h3>`;
    report += "<h3> Number of executed instructions </h3>"
    sortedInstrToCallCount = sortByVals(instrToCallCount);
    for (let [k, v] of sortedInstrToCallCount) {
        report += `${k}: ${v}<br>`;
    }
    report += "<h3> Visualization </h3>"
    report += '<div style="text-align:center">'
    for (let [num, count] of Object.entries(lineNumToCallCount)) {
        report += `
        <span style="color:${getColor(count, numAllCalls)}">
            ${getLine(num - 1)} ${count} <br> 
        </span>`
    }
    report += "</div>"
    return report;
    
}


function getColor(numCalls, numAllCalls) {
    const maxVal = 255;
    let ratio = numCalls / numAllCalls;
    let red = Math.min(Math.floor(ratio * maxVal + numCalls), 255);
    let r = toHex(red);
    let g = toHex(0);
    let b = toHex(255 - red);
    console.log(b)
    return `#${r}${g}${b}`
}

function toHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function sortByVals(obj) {
    elems = [];
    for (let [k, v] of Object.entries(obj)) {
        elems.push([k, v]);
    }
    elems.sort((a, b) => b[1] - a[1]);
    return elems;
}