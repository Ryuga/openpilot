import { Config } from "./types";

const fs = require('fs');
const path = require('path');
const CONFIG_FILE = path.join(__dirname, "../../config.json")

let _paused:boolean = false;
let _ignoreList: string[] = [];
let _backendType: string = "server";
let _inferenceUrl: string = "http://localhost:8000";
let _rawConfig: any = null;

const readConfig = () => {
    fs.readFile(CONFIG_FILE, 'utf8', (err: any, data: any) => {
        if (err) {
            console.error('Error reading config::', err);
        }
        try {
            _rawConfig = JSON.parse(data) || null;
            console.log(_rawConfig)
            return _rawConfig
        } catch (err) {
            console.error('Error parsing config file::', err);
        }
    });
}

export default { 
    setPaused(val: boolean):boolean {return _paused=val},
    getPaused():boolean {return _paused},
    setBackend(val: string):string {return _backendType=val},
    getBackend():string {return _backendType},
    setInferenceUrl(val: string):string {return _inferenceUrl=val},
    getInferenceUrl():string {return _inferenceUrl},
    pushIgnoreFile(file: string){ return _ignoreList.push(file)},
    popIgnoreFile(file: string){ _ignoreList.splice(_ignoreList.indexOf(file), 1)},
    loadConfig(){
    }
}
