class Color {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  public validateColorHex = () => {
    if (!/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(this.value)) {
      throw new Error("Invalid color");
    }
    return this;
  };

  public rrggbb = () => {
    this.value = this.value.replace(
      /^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i,
      (_, r, g, b) => r + r + g + g + b + b,
    );
    return this;
  };

  public prefixHash = (hasPrefix: boolean) => {
    this.value = this.value.replace(
      /^#?([0-9a-f]{6})$/i,
      (_, hex) => `${hasPrefix ? "#" : ""}${hex}`,
    );
    return this;
  };

  public toString = () => this.value.toLowerCase();
}

export const normalizeColorHex = (hex: string, hasPrefix = true): string =>
  new Color(hex)
    .validateColorHex()
    .rrggbb()
    .prefixHash(hasPrefix)
    .toString()
    .toLowerCase();
