import { Mongoose } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createDatabase, IDatabase } from '../database';
import { createAppModel, IAppModel } from '../app.model';
import { createMemoryServer } from './mongo-memory-server.instance';

describe('Test App model', () => {
  let mongoose: Mongoose;
  let appModel: IAppModel;
  let db: IDatabase;
  let mongo: MongoMemoryServer;

  beforeAll(async () => {
    const server = await createMemoryServer();
    db = createDatabase(server.getUrl());
    mongoose = await db.connect();
    appModel = createAppModel(mongoose);
    mongo = server.mongo;
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await db.close();
    await mongo.stop();
  });

  it('Create app', async () => {
    const doc = await appModel.create({
      name: 'i am super app!'
    });

    expect(doc.name).toBe('i am super app!');
  });

  it('Get app', async () => {
    const doc = await appModel.findOne({ name: 'i am super app!' });

    expect(doc?.name).toBe('i am super app!');
  });

  it('Update app', async () => {
    const doc = await appModel.findOneAndUpdate({ name: 'i am super app!' }, { name: 'i am super app 2!' }, { new: true });

    expect(doc?.name).toBe('i am super app 2!');
  });

  it('Delete app', async () => {
    await appModel.findOneAndDelete({ name: 'i am super app 2!' });
    const count = await appModel.count();

    expect(count).toBe(0);
  });
});
