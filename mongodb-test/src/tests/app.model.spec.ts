import { Mongoose } from 'mongoose';
import { createDatabase } from '../database';
import { createAppModel, IAppModel } from '../app.model';

describe('Test App model', () => {
  let mongoose: Mongoose;
  const db = createDatabase(process.env.MONGO_URL as string);
  let appModel: IAppModel;

  beforeAll(async () => {
    mongoose = await db.connect();
    appModel = createAppModel(mongoose);
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await db.close();
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
