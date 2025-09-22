const seededRandom = (seed)=>{
    const m =  2**35 -31;
    const a = 185852 ;
    let s = seed % m ;
    return ()=> (s= s * a % m) / m
}



export const fetchAPI = (date)=>{

   if(!date || !(date instanceof Date) || isNaN(date)){
    console.warn('Invalid date provided to fetchAPI,using current date');
        date = new Date();
    }

    let result =  [];
    const random = seededRandom(date.getDate());

    for (let i = 17 ; i <= 23 ; i++){
        if(random() < 0.5){
            result.push(i+':00');
        }
        if(random() < 0.5 ){
            result.push(i + ':30')
        }
    }

    return result;
}

export const submitAPI = (formData)=>{
   if(formData){
    return true ;
   }else{
    return false
   }

}







