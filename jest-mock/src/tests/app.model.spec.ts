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

  it('Get app', async () => {
    jest.spyOn(appModel, 'findOne').mockReturnValueOnce({ name: 'i am super app!' } as any);

    const doc = await appModel.findOne({ name: 'i am super app!' });

    expect(doc?.name).toBe('i am super app!');
  });
});
