const url = "https://dog.ceo/api/breeds/image/random";

export async function fetchImage() {
    const response = await fetch(url);
    if (response.status !== 200) {
        return Promise.reject("Could not fetch an image!");
    }
    return await response.json();
};