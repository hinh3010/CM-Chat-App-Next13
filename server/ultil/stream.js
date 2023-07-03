// https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(iterator) {
    return new ReadableStream({
        async pull(controller) {
            const { value, done } = await iterator.next()

            if (done) {
                controller.close()
            } else {
                controller.enqueue(value)
            }
        },
    })
}

function sleep(time = 500) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

const encoder = new TextEncoder()

async function* makeIterator() {
    yield encoder.encode('<p>One</p>')
    await sleep(200)
    yield encoder.encode('<p>Two</p>')
    await sleep(200)
    yield encoder.encode('<p>Three</p>')
}

export async function GET() {
    const iterator = makeIterator()
    const stream = iteratorToStream(iterator)

    return new Response(stream)
}