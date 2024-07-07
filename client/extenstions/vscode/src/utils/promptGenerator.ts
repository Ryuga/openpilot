import axios from "axios";
import { ApiClient } from "../core/apiClient";

export class OllamaClient{
    
    apiClient: ApiClient
    constructor(baseUrl: string, responseType: string){
        this.apiClient = new ApiClient(baseUrl, responseType="stream")
    }
    async *readStream(endpoint: string, data: any) {
        let controller = new AbortController();
        try {
            let response = await this.apiClient.post(
                "http://127.0.0.1:11434/api/generate/", 
                data,
                {
                    responseType: "stream"
                }
            )
            for await(const chunk of response.data){
                let jsonResp = JSON.parse(chunk.toString())
                if(!jsonResp.done){
                    yield jsonResp.response
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
