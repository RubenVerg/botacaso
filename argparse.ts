interface Results {
    command: string,
    arguments: string[],
    input: string,
    regex: RegExp,
}

export default function parse(message: string, re: RegExp = /\s+/): Results {
    return {
        command: message.split(re)[0].slice(1),
        arguments: message.split(re).slice(1),
        input: message,
        regex: re,
    }
}