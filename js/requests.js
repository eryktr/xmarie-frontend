const BASE_URL = "http://127.0.0.1:5000/";
const RUN_URL = BASE_URL + "run";

const INPUT_AREA = document.getElementById('inputArea');

function getPostData(debug) {
  return {
    code: editor.getValue(),
    debug: debug,
    input: INPUT_AREA.value,
    breakpoints: breakpoints.sort((a, b) => a - b),
    token: getToken(),
    action: "step",
  };
}

function runCode() {
  console.log(getPostData(true))
  axios
    .post(RUN_URL, getPostData(false))
    .then(function (response) {
      console.log(response);
      updateState(response['data']['snapshots'][0]);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function debugCode() {
  axios
    .post(RUN_URL, getPostData(true))
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
