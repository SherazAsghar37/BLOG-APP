import { singleton, inject } from "tsyringe";
import UserRepository from "../repositories/user_repository";
import { Genders } from "../utils/enums";
import { CustomError } from "../exceptions/custom_error";
import { ThrowCriticalError } from "../exceptions/critical_error";
import HttpStatusCode from "../utils/HttpStatusCode";
import HashPassword from "../utils/hash_password";
import JWT_Utils from "../utils/JWT_Utils";

@singleton()
export default class UserService {
  constructor(
    @inject(UserRepository)
    private readonly _userRepository: UserRepository
  ) {}
  public signUpLocal = async (
    full_name: string,
    email: string,
    password: string,
    gender: Genders
  ): Promise<string> => {
    try {
      const salt = null;
      const user = await this._userRepository.createByLocal({
        salt,
        full_name,
        email,
        password,
        gender,
      });
      const jwt = new JWT_Utils();
      return jwt.generateUserToken(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new ThrowCriticalError(error);
      }
    }
  };
  public loginLocal = async (
    email: string,
    password: string
  ): Promise<string> => {
    try {
      const user = await this._userRepository.findByEmail(email);
      const pass = new HashPassword().deHash(password, user.salt!);
      if (pass === user.password) {
        const jwt = new JWT_Utils();
        return jwt.generateUserToken(user);
      } else {
        throw new CustomError(
          "Authentication failed, wrong password",
          HttpStatusCode.UNAUTHORIZED
        );
      }
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new ThrowCriticalError(error);
      }
    }
  };
}
