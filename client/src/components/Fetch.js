
class Fetch {    

    static buildQueryString(params) {
        let kv = [];
        for(const key in params) {
            const value = params[key];
            if(Array.isArray(value)) {
                for(const v of value) {
                    kv.push(key+'='+v);
                }
            }
            else {
                kv.push(key+'='+value);
            }
        }
        return kv.join('&');
    }

    /**
     * GET
     * @param api - (e.g., 'search/typeahead')
     * @param params - e.g., {query: 'xxx', verbose: true}
     */
    static GET(api, params) {       
        return new Promise(async function(resolve, reject) {

            let url = api;                    
            if(params) {                
                url += '?'+Fetch.buildQueryString(params);               
            }  
           
            fetch(url)
            .then(async function(res) {                 
                if(res.ok) {  
                    let json = await res.json();                    
                    resolve(json);
                }
                else {    
                    reject(res.status, res.statusText);                    
                }                         
            })
            .catch((e) => {                
                reject(e);    
            }) 
        })       
    }

    /**
     * POST
     * @param api - (e.g., 'search')    
     * @param body - string or JSON object
     * @param params - e.g., {verbose: true}
     */
    static POST(api, body, params) {   
        const isJson = typeof body !== 'string';     
        return new Promise(async function(resolve, reject) {
           
            let url = api;                    
            if(params) {                
                url += '?'+Fetch.buildQueryString(params);               
            }  

            // await Fetch.getToken();                  
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': isJson ? 'application/json' : 'text/plain'
                },                
                body: isJson ? JSON.stringify(body) : body
            })
            .then(async function(res) {
                if(res.ok) {
                    let json = await res.json(); 
                    resolve(json);
                }
                else { 
                  reject(res);                    
                }                         
            })
            .catch(res => {
                reject(res);    
            })           
        })     
    }
}

export default Fetch