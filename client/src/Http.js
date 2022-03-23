// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
export async function postData(url = '', token = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
    return response;
}
