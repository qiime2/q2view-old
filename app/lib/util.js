export const TimeoutAt = (timeout, reason = 'Timed out') => (
    new Promise((resolve, reject) => {
        setTimeout(() => { reject('Timed Out'); }, timeout);
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
