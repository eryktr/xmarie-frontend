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

function runCode() {
  axios
    .post(RUN_URL, getPostData(false, 'run'))
    .then(function (response) {
      console.log(response);
      updateState(response['data']['snapshots'][0]);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function debugCode() {
  console.log(getPostData(true, 'debug'))
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
