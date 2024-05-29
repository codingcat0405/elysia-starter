import {AppDataSource} from "../data-source";
import {User} from "../entities";
import {AppRole} from "../types";

const isAuthenticated = (roles: AppRole[] = []) => {
  const userRepository = AppDataSource.getRepository(User);
  return async ({headers, jwt}: any) => {
    //get headers
    const {authorization} = headers;
    if (!authorization) {
      throw new Error("Authorization header not found");
    }
    //get token
    const token = authorization.split(" ")[1];
    if (!token) {
      throw new Error("Token not found");
    }
    //verify token
    const user: User = await jwt.verify(token);
    if (!user) {
      throw new Error("Token is invalid");
    }
    const userInDb = await userRepository.findOneBy({id: user.id});
    if (!userInDb) {
      throw new Error("User not found");
    }


    //check role
    //skip for admin role
    if (userInDb.role === AppRole.ADMIN) {
      return {user: userInDb};
    }
    //check role
    if (roles.length && !roles.includes(userInDb.role)) {
      throw new Error("User doesn't have permission");
    }
    //add user to request
    return {user: userInDb};
  }
}

export default isAuthenticated