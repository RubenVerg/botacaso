"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parse(message, re = /\s+/) {
    return {
        command: message.split(re)[0].slice(1),
        arguments: message.split(re).slice(1),
        input: message,
        regex: re,
    };
}
exports.default = parse;
//# sourceMappingURL=argparse.js.map