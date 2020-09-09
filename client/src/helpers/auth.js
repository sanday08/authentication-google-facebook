import cookie from 'js-cookie';


//Set in Cookie 
export const  setCookie=(key,value)=>{
    if(window!=='undefined'){
        cookie.set(key,value,{
            expires:1
        })
    }
}


//Remove from cookie

export const removeCookie=key=>{
    
    if(window!=='undefined'){
        cookie.remove(key,{
            expires:1  
        })
    }
}

//Get from cookie like token

export const getCookies =key=>{
    if(window!=='undefined')
        return cookie.get(key);
}