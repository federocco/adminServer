// import { QueryInterface, DataTypes } from 'sequelize';
// import { User } from '../models';

// /**
//  * function that sequelize-cli runs if you want to add this migration to your database
//  * */
// export async function up(query: QueryInterface) {
//   try {
//     return [
//       query.addColumn(User.TableName, 'email', {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//         unique: true,
//         comment: 'User email',
//       }),
//       query.addColumn(User.TableName, 'facebookId', {
//         type: DataTypes.STRING(255),
//       }),
//     ];
//   } catch (e) {
//     return Promise.reject(e);
//   }
// }

// /**
//  * function that sequelize-cli runs if you want to remove this migration from your database
//  * */
// export async function down(query: QueryInterface) {
//   try {
//     return query.removeColumn(User.TableName, 'email');
//   } catch (e) {
//     return Promise.reject(e);
//   }
// }
