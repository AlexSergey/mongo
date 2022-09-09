import { connect, Mongoose } from 'mongoose';

export interface IDatabase {
  connect: () => Promise<Mongoose>;
  close: () => void;
}

interface IOptions {
  authSource: string;
  user: string;
  pass: string;
}

let db: Mongoose;

export const createDatabase = (connectionString: string, options: IOptions): IDatabase => ({
  close: (): void => {
    db?.connection?.close();
  },

  connect: async (): Promise<Mongoose> => {
    if (db) {
      return db;
    }

    db = await connect(connectionString, options);

    return db;
  },
});
