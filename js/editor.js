let breakpoints = [];
let lastMarkedLine = 0;
let lastExecutedLine = 0;

CodeMirror.defineSimpleMode("simplemode", {
    // The start state contains the rules that are intially used
    start: [
      {regex: /Load|Add|Push|Pop|StoreX|StoreY|Store|LoadX|LoadY|Subt|ShiftL|ShiftR|Output|Halt|Jump|JumpI|JnS|AddI|SubtI|Input|Skipcond/,
       token: "keyword"},
      {regex: /DEC|HEX/, token: "atom"},
      {regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
       token: "number"},
     
    ],
  });
  

var editor = CodeMirror(document.getElementById('codemirror'), {
    value: "Load X\nLoop, Add Y\nSkipcond 400\nJump Loop\nOutput\nHalt\nX, DEC 10\nY, HEX 0xFFFFF\n",
    mode:  "simplemode",
    lineNumbers: true,
    gutters: ["CodeMirror-linenumbers", "breakpoints"]
  });
  editor.on("gutterClick", function(cm, n) {
    var info = cm.lineInfo(n);
    if (!info.gutterMarkers) {
        breakpoints.push(n+1);
    } else {
      let idx = breakpoints.indexOf(n+1);
      breakpoints.splice(idx, 1);
    }
    cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
  });
  
  function makeMarker() {
    var marker = document.createElement("div");
    marker.style.color = "#822";
    marker.innerHTML = '●';
    return marker;
  }


  function highlightLineAsBreakpointHit(lineNum) {
    editor.addLineClass(lineNum - 1, "background", "bg-danger");
    lastMarkedLine = lineNum;
  }

  function clearBreakpointHighlight(lineNum) {
    console.log("Clearing ", lineNum);
    editor.removeLineClass(lineNum - 1, "background", "bg-danger");
  }

  function highlightLineAsExecuted(lineNum) {
    editor.addLineClass(lineNum - 1, "background", "bg-warning");
    lastExecutedLine = lineNum;
  }

  function clearExecutedHighlight(lineNum) {
    editor.removeLineClass(lineNum - 1, "background", "bg-warning");
  }
