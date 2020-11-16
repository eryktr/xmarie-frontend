const AC_SPAN = document.getElementById('AC');
const PC_SPAN = document.getElementById('PC');
const MBR_SPAN = document.getElementById('MBR');
const MAR_SPAN = document.getElementById('MAR');
const IR_SPAN = document.getElementById('IR');
const X_SPAN = document.getElementById('X');
const Y_SPAN = document.getElementById('Y');
const OUTPUT_SPAN = document.getElementById('output');
const STACK_SPAN = document.getElementById('stack');

const REG_NAME_TO_SPAN = {
    'AC': AC_SPAN,
    'PC': PC_SPAN,
    'MBR': MBR_SPAN,
    'MAR': MAR_SPAN,
    'IR': IR_SPAN,
    'X': X_SPAN,
    'Y': Y_SPAN,
}

function updateState(snapshot) {
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
}
