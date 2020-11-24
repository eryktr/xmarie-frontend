const AC_SPAN = document.getElementById('AC');
const PC_SPAN = document.getElementById('PC');
const MBR_SPAN = document.getElementById('MBR');
const MAR_SPAN = document.getElementById('MAR');
const IR_SPAN = document.getElementById('IR');
const X_SPAN = document.getElementById('X');
const Y_SPAN = document.getElementById('Y');
const OUTPUT_SPAN = document.getElementById('output');
const STACK_SPAN = document.getElementById('stack');
const VARIABLES_DIV = document.getElementById('variables');
const ERRORS_DIV = document.getElementById('errors');

const REG_NAME_TO_SPAN = {
    'AC': AC_SPAN,
    'PC': PC_SPAN,
    'MBR': MBR_SPAN,
    'MAR': MAR_SPAN,
    'IR': IR_SPAN,
    'X': X_SPAN,
    'Y': Y_SPAN,
}

function errorsOccured(resp) {
    return (resp['data']['status'] == 'parsingError');
}

function showErrors(resp) {
    console.log(resp);
    ERRORS_DIV.innerHTML += resp['data']['message'];
}

function updateState(snapshot) {
    console.log(snapshot);
    for (const [regname, span] of Object.entries(REG_NAME_TO_SPAN)) {
        dict = snapshot[regname]
        span.innerHTML = `${dict['dec']} (${dict['hex']})`;
    }

    let output = ""
    for (let line of snapshot['output_stream']) {
        output += line + "\n";
    }
    OUTPUT_SPAN.innerText = output;

    let stack = ""
    for (let elem of snapshot['stack']) {
        stack += `${elem['dec']} (${elem['hex']})\n`;
    }
    STACK_SPAN.innerText = stack;
    let variablesOutput = "";
    console.log(snapshot['variables']);
    for (let [varname, varval] of Object.entries(snapshot['variables'])) {
        variablesOutput += `${varname}: ${varval} <br>`;
    }
    VARIABLES_DIV.innerHTML = variablesOutput;
}
