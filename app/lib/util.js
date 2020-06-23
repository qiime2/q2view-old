export const readBlobAsText = blob => (
    new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
        const reader = new FileReader();
        reader.onload = (event) => { // eslint-disable-line no-unused-vars
            resolve(reader.result);
        };
        reader.readAsText(blob, 'utf8');
    })
);

export const timeoutAt = (timeout, reason = 'Timed out') => (
    new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
        setTimeout(() => { reject(reason); }, timeout);
    })
);

export const waitUntil = condition => (
    new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
        const checkCondition = () => {
            const isCondition = condition();
            if (isCondition) {
                resolve(isCondition);
            } else {
                setTimeout(checkCondition, 5);
            }
        };
        checkCondition();
    })
);

export const parseFileNameFromURL = urlString => (
    (new URL(urlString)).pathname.split('/').pop()
);
