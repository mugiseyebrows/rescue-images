const HOST_URL = "http://localhost:4000/save"

function drawImage(canvas, ctx, image) {
    canvas.width = image.width
    canvas.height = image.height
    ctx.drawImage(image,0,0)
}

function replaceExt(name, newExt) {
    return name.replace(/\.[^/.]+$/, newExt)
}

async function sendImage(canvas, ctx, image) {
    var name = image.src.split('/').slice(-1)[0]
    name = replaceExt(name, ".png")
    try {
        await fetch(HOST_URL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                image: canvas.toDataURL(),
                name,
            })
        })
        return name
    } catch (e) {
        console.log(e)
    }
}

async function sendImages(canvas, ctx, images) {
    for(var image of images) {
        drawImage(canvas, ctx, image)
        var name = await sendImage(canvas, ctx, image)
        if (name !== undefined) {
            console.log(`${name} saved`)
        }
    }
}

function cleanup(canvas) {
    document.body.removeChild(canvas)
}

async function main() {
    var images = document.querySelectorAll('img') // use more specific css selector
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    document.body.append(canvas)
    await sendImages(canvas, ctx, images)
    cleanup(canvas)
    console.log('done')
}

main().then(() => {})
