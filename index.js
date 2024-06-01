import axios from "axios";

import { program } from "commander";
import inquirer from "inquirer";

import {
  getOrderID,
  delivery,
  createStoreList,
  getAuthToken,
  getTokenId,
  orderPizza
} from "./callsAndFunctions.js"



program.version("1.0.0").description("My CLI Domnios App");


// --- Questons For User --- //

const questions = [
  {
    type: "input",
    name: "firstNameAnswer",
    message: "What is your first name?",
  },
  {
    type: "input",
    name: "lastNameAnswer",
    message: "What is your last name?",
  },
  {
    type: "input",
    name: "phoneNumberAnswer",
    message: "What is your phone number?",
  },
  {
    type: "input",
    name: "emailAnswer",
    message: "What is your email?",
  },
  {
    type: "input",
    name: "streetFullAnswer",
    message: "What is your street address?",
  },
  {
    type: "input",
    name: "unitNumberAnswer",
    message: "What is your unit number?",
  },
  {
    type: "input",
    name: "cityAnswer",
    message: "What is your city?",
  },
  {
    type: "input",
    name: "stateAnswer",
    message: "What is your state?",
  },
  {
    type: "input",
    name: "zipcodeAnswer",
    message: "What is your zipcode?",
  },
  {
    type: "input",
    name: "deliveryInstructionsAnswer",
    message: "Do you have any delivery instructions?",
  },
  {
    type: "input",
    name: "houseOrBuisnessAnswer",
    message: "House or Buisness",
  },
  {
    type: "input",
    name: "organizationAnswer",
    message: "What is your organization's name?",
  },
  {
    type: "input",
    name: "cardNumberAnswer",
    message: "What is your card number?",
  },
  {
    type: "input",
    name: "cardTypeAnswer",
    message: "What is your card's type?",
  },
  {
    type: "input",
    name: "experationDateAnswer",
    message: "What is your card's experation date?",
  },
  {
    type: "input",
    name: "crvAnswer",
    message: "What is your card's crv?",
  },
  {
    type: "input",
    name: "billingZipAnswer",
    message: "What is your cards's billing zip?",
  },
  {
    type: "input",
    name: "tipTotalAnswer",
    message: "How much do you want to tip??",
  },
];



(async () => {

    // --- URI calls --- //
    
    const findLocalStore = 'https://www.dominos.com/graphql'
   
    


  program
  .command("ask")
  .description("Ask user details")
  .action(async () => {
    const answers = await inquirer.prompt(questions);

  const { 
      streetFullAnswer, 
      unitNumberAnswer, 
      cityAnswer, 
      stateAnswer, 
      zipcodeAnswer, 
      deliveryInstructionsAnswer, 
      houseOrBuisnessAnswer, 
      organizationAnswer, 
      firstNameAnswer, 
      lastNameAnswer, 
      phoneNumberAnswer, 
      emailAnswer, 
      cardNumberAnswer, 
      cardTypeAnswer, 
      experationDateAnswer,
      crvAnswer, 
      billingZipAnswer,
      tipTotalAnswer
  } = answers

  let localStoreArr = {}

  console.log(`Hello, ${firstNameAnswer} ${lastNameAnswer}!`);


  // --- Find Store --- //


  // let delivery = []


  const storeLocaterHeader = {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin"
    }
  }

  const storeLocaterPayload = {
    "query": "\n  query locateStores($input: StoreLocatorInput) {\n    locateStores(input: $input) {\n      Address {\n        City\n        PostalCode\n        Region\n        Street\n        StreetName\n        StreetNumber\n        UnitNumber\n        UnitType\n      }\n      Stores {\n        AddressDescription\n        AllowCarryoutOrders\n        AllowDeliveryOrders\n        AllowDuc\n        AllowPickupWindowOrders\n        ContactlessCarryout\n        ContactlessDelivery\n        HolidaysDescription\n        HoursDescription\n        IsDeliveryStore\n        IsNEONow\n        IsOnlineCapable\n        IsOnlineNow\n        IsOpen\n        IsSpanish\n        LanguageLocationInfo\n        LocationInfo\n        MaxDistance\n        MinDistance\n        Phone\n        ServiceHoursDescription {\n          Carryout\n          Delivery\n          DriveUpCarryout\n        }\n        ServiceIsOpen {\n          Carryout\n          Delivery\n          DriveUpCarryout\n        }\n        ServiceMethodEstimatedWaitMinutes {\n          Carryout {\n            Max\n            Min\n          }\n          Delivery {\n            Max\n            Min\n          }\n        }\n        StoreCoordinates {\n          StoreLatitude\n          StoreLongitude\n        }\n        StoreID\n      }\n    }\n  }\n",
    "variables": {
        "input": {
            "AddressLine2": "",
            "City": cityAnswer,
            "LocationName": "",
            "Region": stateAnswer,
            "ServiceType": "DELIVERY",
            "Street": streetFullAnswer,
            "PostalCode": zipcodeAnswer
            }
        }
    }

    // const testBody2 = {
    //     query: `
    //       query locateStores($input: StoreLocatorInput) {
    //         locateStores(input: $input) {
    //           Address {
    //             City
    //             PostalCode
    //             Region
    //             Street
    //           }
    //           Granularity
    //         }
    //       }
    //     `,
    //     variables: {
    //       input: {
    //         Street: "165 E 200 S",
    //         PostalCode: "84111"
    //       }
    //     }
    //   };
  
    // async function createStoreList(uri, payload, header) {
    //     try {
    //     const res = axios.post(uri, payload, header)
    //     const resData = (await res).data.data.locateStores.Stores
        
    //         resData.map(store => {
    //             if(
    //                 store.IsOnlineCapable 
    //                 && store.IsDeliveryStore
    //                 && store.IsOpen
    //                 && store.ServiceIsOpen.Delivery
    //             ) {
    //             delivery.push(store.StoreID)  
    //             } else {
    //                 delivery.push(store)
    //             }
    //         })

    //     return resData
    //     } catch(error) {
    //     console.log(error)
    //     }
    // }

    localStoreArr = await createStoreList(findLocalStore, storeLocaterPayload)
    console.log(delivery[0])
    
    const orderIDUri = 'https://order.dominos.com/power/validate-order'
    const priceOrder = 'https://order.dominos.com/power/price-order'
    const authUri = `https://order.dominos.com/power/paymentGatewayService/tokenizeTemplate?storeID=${delivery[0]}&cardType=VISA&retryCount=0`
    const tokenIdUri = 'https://directpost-acquirer-us.aciondemand.com/dp-rest/1.0/acquire'
    const orderUri = 'https://order.dominos.com/power/place-order'



    console.log('stop')

    






// --- Payload Variables --- //

    
    // --- ADDRESS --- //

    const street = streetFullAnswer.toUpperCase()
    const streetName = street.replace(/[0-9]/g, '')
    const streetNumber = street.replace(/[a-zA-Z]/g, '')
    const unitNumber = unitNumberAnswer
    const city = cityAnswer.toUpperCase()
    const state = stateAnswer.toUpperCase()
    const zipcode = zipcodeAnswer
    const deliveryInstructions = deliveryInstructionsAnswer
    const houseOrBuisness = houseOrBuisnessAnswer
    const organization = organizationAnswer


// --- GENERAL --- //

    const firstName = firstNameAnswer
    const lastName = lastNameAnswer
    const phoneNumber = phoneNumberAnswer
    const email = emailAnswer
    const customerID = ''
    const storeID = delivery[0]
    const coupons = []
    const total = 28.77

// --- CARD INFO --- //

    const cardNumber = cardNumberAnswer
    const cardType = cardTypeAnswer.toUpperCase()
    const experationDate = experationDateAnswer.replace(/\D+/g, '')
    const crv = crvAnswer
    const billingZip = billingZipAnswer
    const tipTotal = tipTotalAnswer



// --- Headers, Payloads, Calls --- //

    const orderIDHeader = {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json; charset=UTF-8",
          "dpz-language": "en",
          "dpz-market": "UNITED_STATES",
          "market": "UNITED_STATES",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-dpz-d": "30670069-d6af-4982-bfa7-480e422ca931"
        }
    }


    const orderIDPayload = {
        "Order": {
            "Address": {
                "Street": street,
                "StreetName": streetName,
                "StreetNumber": streetNumber,
                "UnitNumber": unitNumber,
                "UnitType": "",
                "City": city,
                "Region": state,
                "PostalCode": zipcode,
                "Type": houseOrBuisness,
                "OrganizationName": organization
            },
            "Coupons": [],
            "CustomerID": "",
            "Email": "",
            "Extension": "",
            "FirstName": "",
            "FutureOrderTime": "2024-05-24 13:00:00",
            "LastName": "",
            "LanguageCode": "en",
            "OrderChannel": "OLO",
            "OrderID": "",
            "OrderMethod": "Web",
            "OrderTaker": null,
            "Payments": [],
            "Phone": "",
            "PhonePrefix": "",
            "Products": [
                {
                    "Code": "14SCREEN",
                    "Qty": 1,
                    "ID": 1,
                    "isNew": true,
                    "Options": {
                        "X": {
                            "1/1": "1"
                        },
                        "C": {
                            "1/1": "1"
                        },
                        "P": {
                            "1/1": "1.5"
                        }
                    }
                }
            ],
            "ServiceMethod": "Delivery",
            "SourceOrganizationURI": "order.dominos.com",
            "StoreID": storeID,
            "Tags": {},
            "Version": "1.0",
            "NoCombine": true,
            "Partners": {},
            "HotspotsLite": false,
            "OrderInfoCollection": []
        }
    }

    const priceHeader = {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json; charset=UTF-8",
          "dpz-language": "en",
          "dpz-market": "UNITED_STATES",
          "dpz-source": "DSSPriceOrder",
          "market": "UNITED_STATES",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-dpz-d": "30670069-d6af-4982-bfa7-480e422ca931"
        }
    }


    // const userStreetAddressForQuery = '165 E 200 S'
    // const userPostalCodeForQuery = '84111'

    // const storeLocaterPayload = {
    //     "query": "\n  query locateStores($input: StoreLocatorInput) {\n    locateStores(input: $input) {\n      Address {\n        City\n        PostalCode\n        Region\n        Street\n        StreetName\n        StreetNumber\n        UnitNumber\n        UnitType\n      }\n      Stores {\n        AddressDescription\n        AllowCarryoutOrders\n        AllowDeliveryOrders\n        AllowDuc\n        AllowPickupWindowOrders\n        ContactlessCarryout\n        ContactlessDelivery\n        HolidaysDescription\n        HoursDescription\n        IsDeliveryStore\n        IsNEONow\n        IsOnlineCapable\n        IsOnlineNow\n        IsOpen\n        IsSpanish\n        LanguageLocationInfo\n        LocationInfo\n        MaxDistance\n        MinDistance\n        Phone\n        ServiceHoursDescription {\n          Carryout\n          Delivery\n          DriveUpCarryout\n        }\n        ServiceIsOpen {\n          Carryout\n          Delivery\n          DriveUpCarryout\n        }\n        ServiceMethodEstimatedWaitMinutes {\n          Carryout {\n            Max\n            Min\n          }\n          Delivery {\n            Max\n            Min\n          }\n        }\n        StoreCoordinates {\n          StoreLatitude\n          StoreLongitude\n        }\n        StoreID\n      }\n    }\n  }\n",
    //     "variables": {
    //         "input": {
    //             "AddressLine2": "",
    //             "City": "SALT LAKE CITY",
    //             "LocationName": "",
    //             "Region": "UT",
    //             "ServiceType": "DELIVERY",
    //             "Street": userStreetAddressForQuery,
    //             "PostalCode": userPostalCodeForQuery
    //         }
    //     }
    // }


    // --- API Calls --- //

    // async function createStoreList(uri, payload, header) {
    //   try {
    //     const res = axios.post(uri, payload, header)
    //     const resData = (await res).data.data.locateStores.Stores
    //     return resData
    //   } catch(error) {
    //     console.log(error)
    //   }

    // }

    // async function getOrderID(uri, payload, header){
    //     try {
    //         const res = await axios.post(uri, payload , header)
    //         const data = res.data.Order.OrderID
    //         const authToken = res.data

    //         return data

    //     } catch(error){
    //         console.log(error)
    //     }
    // }

    // async function getAuthToken(uri, header){
    //     try {
    //         const res = await axios.get(uri, null, header)
    //         const data = res.data
    //         const authToken = res.data.Request.Headers.Authorization

    //         return authToken

    //     } catch(error){
    //         console.log(error)
    //     }
    // }

    // async function getTokenId(uri, payload, header) {
    //     try {
    //         const res = await axios.post(uri, payload, header)
    //         const data = res.data.TOKEN_ID
    //         return data
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }

    // async function orderPizza(uri, payload, header) {
    //     try {
    //         const res = await axios.post(uri, payload, header)
    //         const data = res.data
    //         return data
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }


    let orderID = await getOrderID(orderIDUri,orderIDPayload, orderIDHeader)
    console.log(orderID)

    const getAuthHeader = {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json; charset=utf-8",
          "dpz-language": "en",
          "dpz-market": "UNITED_STATES",
          "market": "UNITED_STATES",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-dpz-d": "30670069-d6af-4982-bfa7-480e422ca931",
          "cookie": "X-DPZ-D=30670069-d6af-4982-bfa7-480e422ca931; AMCVS_1F046398524DCCF80A490D44%40AdobeOrg=1; _gcl_au=1.1.339147530.1716481939; s_ecid=MCMID%7C44461544729242769851411574914988156385; AMCV_1F046398524DCCF80A490D44%40AdobeOrg=-1712354808%7CMCIDTS%7C19867%7CMCMID%7C44461544729242769851411574914988156385%7CMCAAMLH-1717086738%7C9%7CMCAAMB-1717086738%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1716489138s%7CNONE%7CMCAID%7CNONE%7CvVersion%7C4.3.0; s_cc=true; _ga=GA1.1.665601284.1716481939; _gcl_aw=GCL.1716482048.Cj0KCQjw0ruyBhDuARIsANSZ3woAnhBLemg5Fv3UWLkJi5ap5v_mKjd-qTu5q-iBDVrlSGTxBwL9cJkaAgMwEALw_wcB; x-dpz-s=0.2d8d2117.1716482197.4231dd9; _ga_99R80WZ1RN=GS1.1.1716487472.3.1.1716487479.0.0.0; RT=\"z=1&dm=order.dominos.com&si=76675c9f-6e70-485a-8158-ec36cd885c82&ss=lwjkbna2&sl=1&tt=kn&rl=1\"; s_sq=%5B%5BB%5D%5D; utag_main=v_id:018fa64bd1c7001ed1f971b4e24305075013d06d00b78$_sn:1$_ss:0$_st:1716522879619$vapi_domain:dominos.com$ses_id:1716481937864%3Bexp-session$_pn:13%3Bexp-session",
          "Referer": "https://order.dominos.com/assets/build/xdomain/proxy.html",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        }
      }

    const tokenIdPayload = {
        "accountNumber": cardNumber,
        "cardExpiryDate": experationDate
    }

    const authToken = await getAuthToken(authUri, getAuthHeader)
    console.log('Authorization:', authToken)

    const tokenIdHeader = {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-US,en;q=0.9",
          "authorization": authToken,
          "content-type": "application/json",
          "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site"
        }
    }

    const pizzaHeaderData = {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json; charset=UTF-8",
            "dpz-language": "en",
            "dpz-market": "UNITED_STATES",
            "dpz-source": "DSSPlaceOrder",
            "market": "UNITED_STATES",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-dpz-captcha": "google-recaptcha-v3-enterprise-gnolo;token=03AFcWeA4SSsJIFboNokXs2b6xE3ksUiRJTvCOEj8yK-QGujH8FA5zciounpDeIELfVYSXGzABm5ULtElNjOTb-5DKGSW9U2pBcWoxNgKlrvud6Fsd7fRy7UE4CWUj1g5bs0h8qZ-32drT6lGEPW4SeNqAVWQb_oEtj9nt319Yyest1m3niMiKRXxPB1y4bt2Ieas7bG7qubQnkzAcXBNc-JhnZSgfyAXDn25FksZX7wR-ZTn3sDQS4_OJHIYxqjp-8NRwlRgqFtemNafgMglTKTreh5NPTpGVo8c1JwaMgyRZhpIZEYXS_qvIrGWWhOWpQTCr-Crz1fsbSj2_wxrakWi4nXV1uqigZHlGU7F_ZYuIQvTB6__8Sp_DEa5ugZei3bUynmQ5aYd5LPxI_Rwx-gqLmuhhy6nvKq2se35re_p52XiQafsvq4D06EQp8vABH9Cqh3qtg0AiPWP0RY9GfRYPFavOe-0TC3sF9RuISbJjwkvtmhScHldCNrWwIgGBu3wTH5yzjIx76UukTZLjYuVyuyUTWANyykU5-gqohNaa0hBonUCmwjC_jl-hsEtERcAEwjbQIvvak6V2T8UCXEyVOFKZd7ZyAtBZWI8hH7dcn6b0ri-Fw80j2LSwcdHlXroMN-qUDbDSz3-YeAO9Zqj9bb55tLDBLhl7vcNRMdUcviT8TZTATgWki89R7ZHm1BIABacpwZmnYrCsk8W14ghs_fnosHLb-KyqmdZSm_kWpZ7yt-oAO3ZX-9vANZPRJFwY3G_BbfvseHZU1JgmT_F4se60xiqKqcS7RYAF4bgf4xG2o91HF2gdzGmpJeV5eRMMPB3gBKLS2tf0uK31KRZ62Nga3RrpoF0tvCI5N4BLqpqjtLgTOttdAg_1GtBMYPz6Hb95mlo86d-1XJ8QuSpmqBylE_ZzkYr_3ugMyekUy0UR4nNHEp7mNGroVwrzoPS-kEOUouNUBJpjlMyfHXuflNVuoxHKgpOhmdsODOXrjwNVyDF89z5I2o7jM-QR2ijn69tKGl_GUgNuD19oHZcenMgqo69UlmVTCm5XenoTi6DZeBcWBHbXw_ZA4rD2ofgAX1X8rnJJyh3OctiKKHbpVjeiDNL3dkCnxFyRHRnVsHUFTbUa6XrMhMJWjMJ5cLn0zzi68dDfO6NqJrsFVtfyDt0pkqp4pelCox-cswghmrSq8tvw5ChPnZ9Q6druTh3PPgM7kzzSPmbGOjl0qjS0M4YeKAiAZy-NTZGa3C_aiFtkkAzmXDXpdtfuUF2t6aiqh80MD0-rDSrRDrfkTrTrFH2GePfPxGcnwiyu3Pk7O6Yoq2eSrWq3mr58qQZ4KAWGhuaIFjhxHCPabdKrZ7IjUToTevrAX7Wo2pZ-UCDxLydBPQGbJWyArAdP3z8F0AuHKjvFzvgtRUxlxTILflY5TPp3GdNPf8D9I6eb7WtPD0YY_lfwuQJFPAbFb_wn4DZtHCLVPlPhY-hRGTHKdz-b8jW_b7ZWe0USdauHttU2jGtMHODsVNQvJSW3MPGsAqiz11ZjO5uJBTHuqDkCU9w3lONSW0HaGJneU1-_QfzXxqc9pETqYVIQ2N2mkEXuX0kuI1_B_-DuHi192WBS0WYI1IS_CtvshDkJI99_2o9OIUo_siHI2xC3wHDjf7xlxwK_m-D07i7irpnzHALTmInL0ieAj-x_CGvm5bRv3HGOGuGWwLFOiKg;action=payment",
            "x-dpz-d": "30670069-d6af-4982-bfa7-480e422ca931",
            "authorization": authToken
          }
    }




    const TOKEN_ID = await getTokenId(tokenIdUri, tokenIdPayload, tokenIdHeader)
    console.log('TOKEN_ID:',TOKEN_ID)


    const finalPayload = {
        "Order": {
            "Address": {
                "Street": street,
                "StreetName": streetName,
                "StreetNumber": streetNumber,
                "UnitNumber": unitNumber,
                "UnitType": "STE",
                "City": city,
                "Region": state,
                "PostalCode": zipcode,
                "DeliveryInstructions": deliveryInstructions,
                "Type": houseOrBuisness,
                "OrganizationName": organization
            },
            "Coupons": [],
            "CustomerID": "",
            "Email": email,
            "Extension": "",
            "FirstName": firstName,
            "LastName": lastName,
            "LanguageCode": "en",
            "OrderChannel": "OLO",
            "OrderID": orderID,
            "OrderMethod": "Web",
            "OrderTaker": null,
            "Payments": [
                {
                    "Type": "CreditCard",
                    "Amount": 23.99,
                    "Number": cardNumber,
                    "CardType": cardType,
                    "Expiration": experationDate,
                    "SecurityCode": crv,
                    "PostalCode": billingZip,
                    "ProviderID": "",
                    "PaymentMethodID": "",
                    "OTP": "",
                    "gpmPaymentType": "",
                    "isNew": true,
                    "TipAmount": tipTotal,
                    "Token": TOKEN_ID,
                    "TokenType": "ACI"
                }
            ],
            "Phone": "8312776199",
            "PhonePrefix": "",
            "Products": [
                {
                    "Code": "14SCREEN",
                    "Qty": 1,
                    "ID": 1,
                    "isNew": true,
                    "ShowBestPriceMessage": false,
                    "Options": {
                        "X": {
                            "1/1": "1"
                        },
                        "C": {
                            "1/1": "1"
                        },
                        "P": {
                            "1/1": "1.5"
                        }
                    }
                }
            ],
            "ServiceMethod": "Delivery",
            "SourceOrganizationURI": "order.dominos.com",
            // "StoreID": storeID,
            "StoreID": storeID,
            "Tags": {},
            "Version": "1.0",
            "NoCombine": true,
            "Partners": {},
            "HotspotsLite": false,
            "OrderInfoCollection": [],
            "NewUser": true,
            "metaData": {
                "DPZDNT": null,
                "DPZ_TTP": null,
                "DPZ_TTCALLBACK": null,
                "screen_dimensions": {
                    "height": 1120,
                    "width": 1792
                },
                "PiePassPickup": false,
                "calculateNutrition": "true",
                "orderFunnel": "payments",
                "dtmOrder": false,
                "OrderReadyTime": {
                    "source": "DELTA",
                    "deltaLowerBound": 18,
                    "deltaUpperBound": 29
                },
                "isDomChat": 0,
                "ABTests": [
                    "ECOM-89656-Ctrl",
                    "ECOM-87264-Ctrl",
                    "ECOM-79102-ExpB"
                ]
            }
        }
    }


    // console.log(finalPayload)
    // console.log( await orderPizza(orderUri, finalPayload, pizzaHeaderData))
    const finalConformationRecipt = await orderPizza(orderUri, finalPayload, pizzaHeaderData)
    console.log(finalConformationRecipt.Order.StatusItems)
    console.log("Thanks For Your Order!")

    });

    program.parse(process.argv);

  })()
  