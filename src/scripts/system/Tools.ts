
export class Tools {
    static massiveRequire(req:__WebpackModuleApi.RequireContext) {
        const files:RequireEntry[] = [];

        req.keys().forEach(key => {
            files.push(new RequireEntry(key, req(key)));
        });

        return files;
    }
}

export class RequireEntry {
    key:String;
    data:__WebpackModuleApi.RequireContext;

    constructor(key:String, data:__WebpackModuleApi.RequireContext) {
        this.key = key;
        this.data = data;
    }
}