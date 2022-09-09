import { prop, plugin, index, buildSchema, addModelToTypegoose, ReturnModelType, modelOptions } from '@typegoose/typegoose';
import { model, Mongoose } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

@plugin(uniqueValidator, { message: 'Fields: "name", "env", "url" must be unique!' })
@index({ name: 1, env: 1, url: 1 }, { unique: true })
@modelOptions({ schemaOptions: { timestamps: { createdAt: true, updatedAt: true } } })
class App {
  @prop({ maxlength: 256, required: true })
  public name!: string;

  @prop({ maxlength: 256, required: true })
  public env!: string;

  @prop({ maxlength: 256, required: true })
  public url!: string;
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
