const axios = require("axios")

async function tester(){
try{
    const response = await axios({
        url: `https://verifier.meetchopra.com/verify/bo.korn16@gmail.com?token=2b1e810090b21cab8a8753ec6bd1f0919bc1c698e5439627351a7f8dbbd17041f0569652a98ec7a58777cfce4df37ae6`,
        method: "get"
    })
    console.log(response.data.status)    
}
catch(err){
    console.log(err)
}
}

tester()
