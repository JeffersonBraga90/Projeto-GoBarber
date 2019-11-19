import Sequelize, { Model } from 'sequelize';
import bscript from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bscript.hash(user.password, 8);
      }
    });
    return this;
  }

  checkPassword(password) {
    return bscript.compare(password, this.password_hash);
  }
}

export default User;
