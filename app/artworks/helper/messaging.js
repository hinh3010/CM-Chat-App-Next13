import { WORKER_PARSE_ARTWORK, WORKER_PARSE_LAYER_ARTWORK } from "../const";

const SIGNATURE = "hellocacbantre";

/**
 * Creates a message object with the given message and value.
 * @param {string} message
 * @param {any} value
 */
export function createMessage(
    message,
    value
) {
    return { message, value, signature: SIGNATURE, timestamp: Date.now() }
}


/**
 * Checks if a value is an {@link ExampleMessage}.
 * This is meant to be used to check the
 * @param data
 */
export function validateMessage(data) {
    if (
        !(
            typeof data === "object" &&
            data !== null &&
            "message" in data &&
            "value" in data &&
            data["signature"] === SIGNATURE
        )
    ) {
        throw new TypeError(`data is not an ExampleMessage (got ${data})`);
    }

    // Check if the "message" field contains known message messages

    const message = data.message;
    switch (message) {
        case WORKER_PARSE_LAYER_ARTWORK:
        case "MainImageData":
        case WORKER_PARSE_ARTWORK:
            console.log("worker validation :::", WORKER_PARSE_ARTWORK)
            // These are valid, so pass
            return;
        default:
            // Will fail message check if switch statement is non-exhaustive
            ((value) => {
                throw new TypeError(`
                    Unexpected ExampleMessage message: 
                    ${typeof value === "object" ? JSON.stringify(value, null, 2) : value}
                `);
            })(message);
    }
}
