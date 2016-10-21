export function TimeoutAt(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { reject('Timed Out'); }, timeout);
    });
}

export function WaitUntil(test) {
    return new Promise((resolve, reject) => {
        function check() {
            if (test()) {
                resolve(true);
            } else {
                setTimeout(check, 5);
            }
        }
        check();
    });
}
