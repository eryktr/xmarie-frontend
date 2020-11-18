function getProfileReport(totalCost, instrToCallCount, lineNumToCallCount) {
    let report = "<h2>Profile Report </h2>";
    report += `Total cost: ${totalCost} <br>`;
    report += "<h2> Number of executed instructions </h2>"
    for (let [k, v] of Object.entries(instrToCallCount)) {
        report += `${k}: ${v}<br>`;
    }
    return report;
}