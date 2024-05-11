import { UserService } from '../../services/UserService';
import { CustomError } from '../../model/CustomError';

describe('getUserById', () => {
  it('should throw error when user does not exist', async () => {
    const userId = 'nonexistent_id';
    const mockUserDatabase = {
      getUserById: jest.fn().mockResolvedValue(null),
    };
    const userService = new UserService(mockUserDatabase);

    // Act & Assert
    await expect(userService.getUserById(userId)).rejects.toThrowError(
      new CustomError(404, 'User not found')
    );
    expect(mockUserDatabase.getUserById).toHaveBeenCalledWith(userId);
  });

  it('should return user information for existing user', async () => {
    // Arrange
    const userId = 'existing_id';
    const mockUser = {
      id: userId,
      name: 'Rubens',
      email: 'rubens@gmail.com',
      role: 'ADMIN',
    };
    const mockUserDatabase = {
      getUserById: jest.fn().mockResolvedValue(mockUser),
    };
    const userService = new UserService(mockUserDatabase);

    // Act
    const result = await userService.getUserById(userId);

    // Assert
    expect(result).toEqual({
      id: userId,
      name: 'Rubens',
      email: 'rubens@gmail.com',
      role: 'ADMIN',
    });
    expect(mockUserDatabase.getUserById).toHaveBeenCalledWith(userId);
  });
});

describe('getAllUsers', () => {
  it('should throw error when user is not admin', async () => {
    // Arrange
    const userRole = 'USER';
    const mockUserDatabase = {} as any; // Mock vazio, deve ser substituído pelo real
    const userService = new UserService(mockUserDatabase);

    // Act & Assert
    await expect(userService.getAllUsers(userRole)).rejects.toThrowError(
      new CustomError(403, 'Unauthorized access. Admin role required')
    );
  });

  it('should return all users for admin user', async () => {
    // Arrange
    const userRole = 'ADMIN';
    const mockUser1 = {
      id: '35b62ff4-64af-4721-a4c5-d038c6f730cf',
      name: 'tinker',
      email: 'tinker@cad.com',
      role: 'ADMIN',
    };
    const mockUserDatabase = {
      getAllUsers: jest.fn().mockResolvedValue([mockUser1]),
    };
    const userService = new UserService(mockUserDatabase);

    // Act
    const result = await userService.getAllUsers(userRole);

    // Assert
    expect(result).toEqual([
      {
        id: '35b62ff4-64af-4721-a4c5-d038c6f730cf',
        name: 'tinker',
        email: 'tinker@cad.com',
        role: 'ADMIN',
      }
    ]);
    expect(mockUserDatabase.getAllUsers).toHaveBeenCalled();
  });
});

describe('getUserProfile', () => {
  it('should throw error when user does not exist', async () => {
    // Arrange
    const userId = 'nonexistent_id';
    const mockUserDatabase = {
      getUserById: jest.fn().mockResolvedValue(null),
    };
    const userService = new UserService(mockUserDatabase);

    // Act & Assert
    await expect(userService.getUserProfile(userId)).rejects.toThrowError(
      new CustomError(404, 'User not found')
    );
    expect(mockUserDatabase.getUserById).toHaveBeenCalledWith(userId);
  });

  it('should return user profile for existing user', async () => {
    // Arrange
    const userId = 'existing_id';
    const mockUser = {
      id: userId,
      name: 'harp',
      email: 'harp@ai.com',
      role: 'ADMIN',
    };
    const mockUserDatabase = {
      getUserById: jest.fn().mockResolvedValue(mockUser),
    };
    const userService = new UserService(mockUserDatabase);

    // Act
    const result = await userService.getUserProfile(userId);

    // Assert
    expect(result).toEqual({
      id: userId,
      name: 'harp',
      email: 'harp@ai.com',
      role: 'ADMIN',
    });
    expect(mockUserDatabase.getUserById).toHaveBeenCalledWith(userId);
  });
});
