export interface DataPathFormat {
    location: string[];
    objPath: string[];
}
export declare function getUserData(id: number, data: DataPathFormat): any;
export declare function setUserData(id: number, dataPath: DataPathFormat, data: any): void;
export declare function getUserFile(id: number, pth: string[]): any;
export declare function setUserFile(id: number, pth: string[], data: any): void;
//# sourceMappingURL=database.d.ts.map