'use server';

import qs from 'query-string'

const BASE_URL = process.env.COINGECKO_BASE_URL
const API_KEY = process.env.COINGECKO_API_KEY

if( !BASE_URL ) throw new Error('COINGECKO_BASE_URL is not defined')
if( !API_KEY ) throw new Error('COINGECKO_API_KEY is not defined')

export async function fetcher<T>( endpoint : string , params? : QueryParams , revalidate = 60) : Promise<T>{

    // constructing the url with query params
    const url = qs.stringifyUrl({
        url : `${BASE_URL}/${endpoint}`,
        query : params
    } , { skipNull: true , skipEmptyString: true })

    const response = await fetch(url , {
        headers : {
            'x-cg-demo-api-key' : API_KEY,
            'Content-Type' : 'application/json'
        } as Record<string , string>,
        next : { revalidate }
    })

    if( !response.ok ){
        const errorData : CoinGeckoErrorBody = await response.json()
        .catch(() => ({}))

        throw new Error(`API Error: ${response.status}:${errorData.error || response.statusText}`)
    }

    return response.json()
}