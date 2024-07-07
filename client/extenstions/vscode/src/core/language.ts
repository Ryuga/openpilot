import { config } from "process";
import { LanguageConfig } from "./types";

export const languageConfig: {[key: string]: LanguageConfig} = {
    // To add support for a new language add config with corresponding format. 
    "python": {
        name: "Python",
        fileExtensions: [".py", "ipynb"],
        comment: {
            startIdentifier: "#",
            multilineIndentifier: '"""',
            endIdentifier: '"""',
        }
    },
    "javascript": {
        name: "Javascript",
        fileExtensions: [".js", ".jsx"],
        comment: {
            startIdentifier: "//",
            multilineIndentifier: "/*",
            endIdentifier: "*/",
        }
    },
    "java": {
        name: "Java",
        fileExtensions: [".java"],
        comment: {
            startIdentifier: "//",
            multilineIndentifier: "/*",
            endIdentifier: "*/",
        }
    },
    "c#": {
        name: "C Sharp (C#)",
        fileExtensions: [".cs"],
        comment: {
            startIdentifier: "//",
            multilineIndentifier: "/*",
            endIdentifier: "*/",
        }
    },
    "go": {
        name: "Go Lang",
        fileExtensions: [".go"],
        comment: {
            startIdentifier: "//",
            multilineIndentifier: "/*",
            endIdentifier: "*/",
        }
    },
}

export const getLanguageConfig = (filePath: string): LanguageConfig => {
    let extension: string = `.${filePath.split('.').pop()}` || ".py";
    let match = Object.values(languageConfig).find((conf) => conf.fileExtensions.includes(extension));
    console.log(match ? "Language detected: " + match.name : "Using default language")
    return match ? match : languageConfig.python;
}