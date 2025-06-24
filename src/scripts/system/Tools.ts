
export class Tools {
    static massiveRequire(req:__WebpackModuleApi.RequireContext) {
        const files:RequireEntry[] = [];

        req.keys().forEach(key => {
            files.push(new RequireEntry(key, req));
        });

        return files;
    }
}

export class RequireEntry {
    key:String;
    req:__WebpackModuleApi.RequireContext;

    constructor(key:String, req:__WebpackModuleApi.RequireContext) {
        this.key = key;
        this.req = req;
    }
}