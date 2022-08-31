const APIGATEWAT = 'https://thumbnail.webtoon.guru/'

function originalImageToWebImage(webtoon, width, height, format='webp') {
    // console.log(webtoon);

    if(webtoon.thumbnail.indexOf("mrblue") != -1){
        return `${APIGATEWAT}?key=${webtoon._id}&width=${width}&height=${height}&format=${format}&trim=true`
    } else {
        return `${APIGATEWAT}?key=${webtoon._id}&width=${width}&height=${height}&format=${format}`
    }
}

export default originalImageToWebImage