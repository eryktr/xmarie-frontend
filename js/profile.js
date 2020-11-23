function getProfileReport(totalCost, instrToCallCount, lineNumToCallCount) {
    let report = "<h3>Profile Report </h3>";
    const numAllCalls = Object.values(lineNumToCallCount).reduce((a, b) => a + b);
    report += `Total cost: ${totalCost} <br>`;
    report += "<h3> Number of executed instructions </h3>"
    for (let [k, v] of Object.entries(instrToCallCount)) {
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
    let red = Math.floor(ratio * maxVal)
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