import { prop, plugin, index, buildSchema, addModelToTypegoose, ReturnModelType, modelOptions } from '@typegoose/typegoose';
import { model, Mongoose, HydratedDocument } from 'mongoose';
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
export type IAppDocument = HydratedDocument<App>;

let AppModel: IAppModel;

export const createAppModel = (mongoose: Mongoose): IAppModel => {
  if (AppModel) {
    return AppModel;
  }

  AppModel = addModelToTypegoose(
    model(
      'App',
      buildSchema(App, {
        timestamps: {
          createdAt: 'created',
          updatedAt: 'updated',
        },
      }),
      'app-collection'
    ),
    App,
    {
      existingMongoose: mongoose,
    },
  );

  return AppModel;
};
