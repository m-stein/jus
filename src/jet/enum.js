/**
 * @template {Record<string, number>} T
 * @param {T} baseEnum
 * @returns {{ readonly [K in keyof T]: T[K] }}
 */
export function createEnum(baseEnum) {
    return new Proxy(baseEnum, {
        /**
         * @param {T} target
         * @param {string | symbol} name
         * @returns {T[keyof T]}
         */
        get(target, name) {
            if (!Object.prototype.hasOwnProperty.call(baseEnum, name)) {
                throw new Error(
                    `'${String(name)}' does not exist in the enum`
                );
            }
            return /** @type {T[keyof T]} */ (
                target[/** @type {keyof T} */ (name)]
            );
        },

        set(_target, _name, _value) {
            throw new Error('Cannot add a new value to the enum');
        },
    });
}
