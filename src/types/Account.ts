export class Account {
  public static fromJson(value: any): Account {
    return new Account(value._key)
  }

  private readonly _name: string

  public constructor(name: string) {
    if (name.startsWith("accounts/")) {
      this._name = name
    } else {
      this._name = "accounts/" + name
    }
  }

  get name() {
    return this._name.replace("accounts/", "")
  }

  public toString(): string {
    return this.name
  }

  public toJson(): any {
    return { _key: this._name }
  }
}
