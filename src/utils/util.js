export function _debounce(fn, dealy) {
    var timer = null
    return function () {
        clearTimeout(timer)
        var args = arguments
        var self = this
        timer = setTimeout(() => {
            fn.apply(self, args)
        }, dealy);
    }
}

export function LBC() {
    return {
        add(key, value) {
            localStorage.setItem(key, JSON.stringify(value))
        },
        get(key) {
            return JSON.parse(localStorage.getItem(key))
        },
        remove(key) {
            localStorage.removeItem(key)
        }
    }
}
