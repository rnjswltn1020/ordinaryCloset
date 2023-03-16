export async function imageUpload(file) {
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
    const postUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_CLOUD_UNSIGNED_UPLOAD_PRESET);

    return fetch(postUrl, {
        method: 'POST',
        body: formData,
    })
        .then(res => res.json())
        .then(data => data.url);
}
