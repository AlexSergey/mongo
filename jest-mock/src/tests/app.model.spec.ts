import { mongoose } from '@typegoose/typegoose';
import { createAppModel, IAppModel } from '../app.model';

describe('Test App model', () => {
  let appModel: IAppModel;

  beforeAll(async () => {
    appModel = createAppModel(mongoose);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('Create app', async () => {
    jest.spyOn(appModel, 'create').mockReturnValueOnce({ name: 'i am super app!' } as any);

    const doc = await appModel.create({
      name: 'i am super app!'
    });

    expect(doc.name).toBe('i am super app!');
  });

  it('Get app', async () => {
    jest.spyOn(appModel, 'findOne').mockReturnValueOnce({ name: 'i am super app!' } as any);

    const doc = await appModel.findOne({ name: 'i am super app!' });

    expect(doc.name).toBe('i am super app!');
  });

  it('Update app', async () => {
    jest.spyOn(appModel, 'findOneAndUpdate').mockReturnValueOnce({ name: 'i am super app 2!' } as any);

    const doc = await appModel.findOneAndUpdate({ name: 'i am super app!' }, { name: 'i am super app 2!' }, { new: true });

    expect(doc?.name).toBe('i am super app 2!');
  });

  it('Delete app', async () => {
    jest.spyOn(appModel, 'findOneAndDelete').mockImplementation();
    jest.spyOn(appModel, 'count').mockReturnValueOnce(0 as any);

    await appModel.findOneAndDelete({ name: 'i am super app 2!' });
    const count = await appModel.count();

    expect(count).toBe(0);
  });
});
