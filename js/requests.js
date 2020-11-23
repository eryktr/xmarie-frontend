const BASE_URL = "http://127.0.0.1:5000/";
const RUN_URL = BASE_URL + "run";

const INPUT_AREA = document.getElementById('inputArea');

function getPostData(debug, action) {
  return {
    code: editor.getValue(),
    debug: debug,
    input: INPUT_AREA.value,
    breakpoints: breakpoints.sort((a, b) => a - b),
    token: getToken(),
    action: action,
  };
}

function getContinuePostData(token) {
  return {
    token: getToken(),
    action: 'continue',
  }
}

function getStepPostData(token) {
  return {
    token: getToken(),
    action: 'step',
  }
}



function getRunSnapshot() {
  let getData = (new Promise((resolve, reject) => {
    data = getPostData(false, 'run');
    resolve(data);
  }))
  return getData.then(data => axios.post(RUN_URL, data))
                .then(resp => {console.log(resp); return resp['data']['snapshots'][0]});

}
function runCode() {
  getRunSnapshot().then(ss => updateState(ss))
}

function debugCode() {
  axios
    .post(RUN_URL, getPostData(true, 'debug'))
    .then(function (response) {
      console.log(response);
      highlightLineAsBreakpointHit(response['data']['breakpoint']['original_lineno']);
      updateState(response['data']['snapshot']);
    })
    .catch(function (error) {
      console.log(error);
    });
}


function step() {
  data = getStepPostData(getToken())
  console.log("sending")
  console.log(data)
  axios
    .post(RUN_URL, data)
    .then(function (response) {
      console.log(response);
      clearExecutedHighlight(lastExecutedLine)
      if (response['data']['status'] == 'hit') {
        highlightLineAsExecuted(response['data']['original_lineno']);
        updateState(response['data']['snapshot']);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function continueDebug() {
  data = getContinuePostData(getToken());
  axios
    .post(RUN_URL, data)
    .then(function (response) {
      console.log(response);
      clearBreakpointHighlight(lastMarkedLine);
      console.log(response['data']['breakpointHit']);
      if (response['data']['breakpointHit']) {
        highlightLineAsBreakpointHit(response['data']['breakpoint']['original_lineno']);
        updateState(response['data']['snapshot']);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}


function profile() {
  getRunSnapshot().then(ss => {
    console.log(ss);
    updateState(ss);
    let report = getProfileReport(
      ss['cost_of_executed_instrs'],
      ss['instr_to_call_count'],
      ss['lineno_to_num_calls']
    );
    document.getElementById('profileReport').innerHTML = report;
  })
  
}