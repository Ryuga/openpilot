import { Config } from "./types";

const fs = require('fs');
const path = require('path');
const CONFIG_FILE = path.join(__dirname, "../../config.json")

let _paused:boolean = false;
let _ignoreList: string[] = [];
let _backendType: string = "server";
let _inferenceUrl: string = "http://localhost:8000";
let _rawConfig: Config;

const readConfig = ():boolean => {
    try{
        let data = fs.readFileSync(CONFIG_FILE, 'utf-8');
        _rawConfig = JSON.parse(data)
        return true
    }
    catch(err){
        console.error('Error parsing config file::', err);
    }
    return false
}

export default { 
    setPaused(val: boolean):boolean {return _paused=val},
    getPaused():boolean {return _paused},
    setBackend(val: string):string {return _backendType=val},
    getBackend():string {return _backendType},
    setInferenceUrl(val: string):string {return _inferenceUrl=val},
    getInferenceUrl():string {return _inferenceUrl},
    pushIgnoreList(file: string){ return _ignoreList.push(file)},
    popIgnoreList(file: string){ _ignoreList.splice(_ignoreList.indexOf(file), 1)},
    getIgnoreList(){ return _ignoreList },
    loadConfig(){
        if(readConfig())
        {
            this.setPaused(_rawConfig.paused);
            this.setBackend(_rawConfig.backendType);
            this.setInferenceUrl(_rawConfig.inferenceUrl);
            _rawConfig.ignoreList.forEach(item=> this.pushIgnoreList(item));
            return true;
        }
        return false;
    }
}
