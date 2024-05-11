import { User } from './User';

class UserDatabase {
  private users: User[];

  constructor() {
    this.users = [
      new User('1', 'John', 'john@example.com', 'USER'),
      new User('2', 'Jane', 'jane@example.com', 'ADMIN'),
      new User('3', 'Doe', 'doe@example.com', 'USER'),
    ];
  }

  public async getUserById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.getId() === id);
    return user ? user : null;
  }

  public async getAllUsers(): Promise<User[]> {
    return this.users;
  }
}

export { UserDatabase };
