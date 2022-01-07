import { dirname } from "path";
import { fileURLToPath } from "url";

import { readPackageUpSync } from "read-pkg-up";

export const readPackageJson = () => {
  const foundPackage = readPackageUpSync({
    cwd: dirname(fileURLToPath(import.meta.url)),
  });

  if (!foundPackage) {
    throw new Error("Could not find package.json");
  }

  return foundPackage?.packageJson;
};

class Color {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  public validateColorHex = () => {
    if (!/^#?([a-f\d]{3}|[a-f\d]{6})$/i.test(this.value)) {
      throw new Error("Invalid color hex");
    }
    return this;
  };

  public rrggbb = () => {
    this.value = this.value.replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (_, r, g, b) => r + r + g + g + b + b,
    );
    return this;
  };

  public hashPrefix = (hasPrefix: boolean) => {
    this.value = this.value.replace(
      /^#?([a-f\d]{6})$/i,
      (_, hex) => `${hasPrefix ? "#" : ""}${hex}`,
    );
    return this;
  };

  public toString = () => this.value.toString();
}

export const normalizeColorHex = (hex: string, hasPrefix = true): string =>
  new Color(hex)
    .validateColorHex()
    .rrggbb()
    .hashPrefix(hasPrefix)
    .toString()
    .toLowerCase();
