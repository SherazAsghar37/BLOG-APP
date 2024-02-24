import { User } from "../@types/user";
import userModel from "../models/user";
import { CustomError } from "../exceptions/custom_error";
import HttpStatusCode from "../utils/HttpStatusCode";
export default class UserRepository {
  public createByLocal = async (data: User): Promise<User> => {
    try {
      const newUser = await userModel.create({
        full_name: data.full_name as string,
        email: data.email as string,
        password: data.password as string,
        gender: data.gender,
        avatar:
          data.gender === "FEMALE"
            ? "images/female-user.jpg"
            : "images/male-user.jpg",
      });

      if (newUser) {
        return newUser as User;
      } else {
        throw new CustomError(
          "Failed to create user",
          HttpStatusCode.INTERNAL_SERVER_ERROR
        );
      }
    } catch (error) {
      throw new CustomError(`${error}`, HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
  };

  public findByEmail = async (email: string): Promise<User> => {
    try {
      const newUser = await userModel.findOne({
        email,
      });

      if (newUser) {
        return newUser as User;
      } else {
        throw new CustomError("Unable to find user", HttpStatusCode.NOT_FOUND);
      }
    } catch (error) {
      throw new CustomError(
        `Error : ${error}`,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  };
}
