import { NewUserI, UserI, UserQuery } from '../interfaces/users';
import { UserFactoryDAO } from '../models/users/users.factory';
import { TipoPersistencia } from '../models/users/users.factory';
/* import { CartAPI } from './carts'; */
/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = TipoPersistencia.MongoAtlas;

class User {
  private users;

  constructor() {
    this.users = UserFactoryDAO.get(tipo);
  }

  async get(id?: string): Promise<UserI[]> {
    if (id) return this.users.get(id);

    return this.users.get();
  }

  async add(productData: NewUserI): Promise<UserI> {
    const newUser = await this.users.add(productData);
    /* await CartAPI.createCart(newUser._id); */
    return newUser;
  }

  async update(id: string, userData: NewUserI) {
    const updatedUser = await this.users.update(id, userData);
    return updatedUser;
  }

  async delete(id: string) {
    await this.users.delete(id);
    //Borrar carrito tambien
  }

  async query(username?: string, email?: string): Promise<UserI> {
    const query = {
      $or: [] as UserQuery[],
    };

    if (username) query.$or.push({ username });

    if (email) query.$or.push({ email });

    return this.users.query(query);
  }

  async validatePassword(username: string, password: string) {
    return this.users.validateUserPassword(username, password);
  }
}

export const UserAPI = new User();