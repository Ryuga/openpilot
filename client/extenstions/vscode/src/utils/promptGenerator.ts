import axios from "axios";
import { ApiClient } from "../ core/apiClient";

export class OllamaClient extends ApiClient {
    

    constructor(baseUrl: string){
        super(
            baseUrl=baseUrl,
        )
    }
    async* readStream(endpoint: string, data: any) {
        let controller = new AbortController();
        try {
            // let resp = await this.apiClient.post(
            //     "http://127.0.0.1:11434/api/generate/", 
            //     data,
            //     {signal: controller.signal},
            // )
            let resp = await fetch("http://localhost:11434" + endpoint, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                      'Content-Type': 'application/json',
                    },
                signal: controller.signal,
              });
            
            if (!resp.ok || !resp.body) {
                throw Error('Unable to connect to backend');
            }
            // resp.data.on('data', (chunk: any) => {
            //     console.log(chunk)
            //   });
            
            //   resp.data.on('end', () => {
            //     console.log("completed")
            //   });
            let reader = resp.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
        
            while (true) {
            const { done, value } = await reader.read();
            if (done) {
                console.log("Done... Exiting")
                if (buffer) yield buffer;
                break;
            }
        
            buffer += decoder.decode(value, { stream: true });
            let newlineIndex;
            while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
                yield buffer.slice(0, newlineIndex);
                buffer = buffer.slice(newlineIndex + 1);
            }
            }
        }
        catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        } else {
            console.error('Fetch error:', error);
        }
        } finally {
        controller.abort();
        console.log("Aborting...")
        }
        
    }

}
