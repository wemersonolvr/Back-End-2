import { CustomError } from '../model/CustomError';
import { UserDatabase } from '../model/Userdatabase';

class UserService {
  private userDatabase: UserDatabase;

  constructor(userDatabase: UserDatabase) {
    this.userDatabase = userDatabase;
  }

  public async getUserById(id: string) {
    const user = await this.userDatabase.getUserById(id);
    if (!user) {
      throw new CustomError(404, "User not found");
    }
    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole(),
    };
  }
  public async getAllUsers(userRole: string) {
    if (userRole !== 'ADMIN') {
      throw new CustomError(403, "Unauthorized access. Admin role required");
    }

    const allUsers = await this.userDatabase.getAllUsers();
    return allUsers.map(user => ({
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole(),
    }));
    }

    public async getUserProfile(userId: string) {
        const user = await this.userDatabase.getUserById(userId);
        if (!user) {
          throw new CustomError(404, "User not found");
        }
        return {
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          role: user.getRole(),
        };
    }
}

export { UserService }