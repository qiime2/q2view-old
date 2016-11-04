export const readBlobAsText = (blob) => (
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(reader.result);
        }
        reader.readAsText(blob, 'utf8');
    })
)

export const TimeoutAt = (timeout, reason = 'Timed out') => (
    new Promise((resolve, reject) => {
        setTimeout(() => { reject(reason); }, timeout);
    })
);

export const WaitUntil = (condition) => (
    new Promise((resolve, reject) => {
        const checkCondition = () => {
            const isCondition = condition();
            if (isCondition) {
                resolve(isCondition);
            } else {
                setTimeout(checkCondition, 5);
            }
        }
        checkCondition();
    })
)
