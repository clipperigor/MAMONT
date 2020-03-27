export class File {
  constructor(public name: string, public  path: string, public  directory: boolean) {

  }
  toString(): string {
    return this.path;
  }
}
