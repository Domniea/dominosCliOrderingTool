import axios from "axios"

let delivery = []

async function getOrderID(uri, payload, header){
    try {
        const res = await axios.post(uri, payload , header)
        const data = res.data.Order.OrderID
        const authToken = res.data

        return data

    } catch(error){
        console.log(error)
    }
}

  
async function createStoreList(uri, payload, header) {
    try {
    const res = axios.post(uri, payload, header)
    const resData = (await res).data.data.locateStores.Stores
    
        resData.map(store => {
            if(
                store.IsOnlineCapable 
                && store.IsDeliveryStore
                && store.IsOpen
                && store.ServiceIsOpen.Delivery
            ) {
            delivery.push(store.StoreID)  
            } else {
                delivery.push(store)
            }
        })

    return resData
    } catch(error) {
    console.log(error)
    }
}


async function getAuthToken(uri, header){
    try {
        const res = await axios.get(uri, null, header)
        const data = res.data
        const authToken = res.data.Request.Headers.Authorization

        return authToken

    } catch(error){
        console.log(error)
    }
}

async function getTokenId(uri, payload, header) {
    try {
        const res = await axios.post(uri, payload, header)
        const data = res.data.TOKEN_ID
        return data
    } catch(error) {
        console.log(error)
    }
}

async function orderPizza(uri, payload, header) {
    try {
        const res = await axios.post(uri, payload, header)
        const data = res.data
        return data
    } catch(error) {
        console.log(error)
    }
}



export {
    getOrderID,
    delivery,
    createStoreList,
    getAuthToken,
    getTokenId,
    orderPizza
}