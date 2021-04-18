export class Config{
    constructor(){
        this.settings = {
            "version": "00001",
            "projectName": "TestJs Sourcemaps With browserify",
            "name":"testBrowserify",
            "author": "CB Lombard",
        }
    }

    get(){
        return this.settings;
    }
}