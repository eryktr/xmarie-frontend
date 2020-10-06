
let breakpoints = [];

CodeMirror.defineSimpleMode("simplemode", {
    // The start state contains the rules that are intially used
    start: [
      {regex: /Load|Add|Push|Pop|StoreX|StoreY|Store|LoadX|LoadY|Subt|ShiftL|ShiftR|Output|Halt|Jump|JumpI|JnS|AddI|SubtI|Input/,
       token: "keyword"},
      {regex: /DEC|HEX/, token: "atom"},
      {regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
       token: "number"},
     
    ],
  });
  

var editor = CodeMirror(document.getElementById('codemirror'), {
    value: "Load X\nAdd Y\nOutput\nHalt\nX, DEC 10\nY, HEX 0xFFFF\n",
    mode:  "simplemode",
    lineNumbers: true,
    gutters: ["CodeMirror-linenumbers", "breakpoints"]
  });
  editor.on("gutterClick", function(cm, n) {
    var info = cm.lineInfo(n);
    if (!info.gutterMarkers) {
        breakpoints.push(n)
    }
    cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
  });
  
  function makeMarker() {
    var marker = document.createElement("div");
    marker.style.color = "#822";
    marker.innerHTML = '●';
    return marker;
  }
