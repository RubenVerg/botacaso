interface Results {
    command: string;
    arguments: string[];
    input: string;
    regex: RegExp;
}
export default function parse(message: string, re?: RegExp): Results;
export {};
//# sourceMappingURL=argparse.d.ts.map