"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeColorHex = void 0;
class Color {
    value;
    constructor(value) {
        this.value = value;
    }
    validateColorHex = () => {
        if (!/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(this.value)) {
            throw new Error("Invalid color");
        }
        return this;
    };
    rrggbb = () => {
        this.value = this.value.replace(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i, (_, r, g, b) => r + r + g + g + b + b);
        return this;
    };
    prefixHash = (hasPrefix) => {
        this.value = this.value.replace(/^#?([0-9a-f]{6})$/i, (_, hex) => `${hasPrefix ? "#" : ""}${hex}`);
        return this;
    };
    toString = () => this.value.toLowerCase();
}
const normalizeColorHex = (hex, hasPrefix = true) => new Color(hex)
    .validateColorHex()
    .rrggbb()
    .prefixHash(hasPrefix)
    .toString()
    .toLowerCase();
exports.normalizeColorHex = normalizeColorHex;
