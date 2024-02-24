import { createHmac, randomBytes } from "crypto";
import { singleton } from "tsyringe";
@singleton()
export default class HashPassword {
  constructor() {}
  public hash = (password: string) => {
    const salt = randomBytes(16).toString();
    password = createHmac("sha256", salt).update(password).digest("hex");
    return { password, salt };
  };
  public deHash = (password: string, salt: string) => {
    password = createHmac("sha256", salt).update(password).digest("hex");

    return password;
  };
}
