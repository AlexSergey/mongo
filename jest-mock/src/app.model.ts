import { prop, buildSchema, addModelToTypegoose, ReturnModelType, modelOptions } from '@typegoose/typegoose';
import { model, Mongoose } from 'mongoose';

@modelOptions({ schemaOptions: { timestamps: { createdAt: true, updatedAt: true } } })
class App {
  @prop({ maxlength: 256, required: true })
  public name!: string;
}

export type IAppModel = ReturnModelType<typeof App>;

let AppModel: IAppModel;

export const createAppModel = (mongoose: Mongoose): IAppModel => {
  if (AppModel) {
    return AppModel;
  }

  const webhookSchema = buildSchema(App, {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  });
  AppModel = addModelToTypegoose(
    model('App', webhookSchema, 'app-collection'),
    App,
    {
      existingMongoose: mongoose,
    },
  );

  return AppModel;
};
