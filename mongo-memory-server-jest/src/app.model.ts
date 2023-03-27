import { prop, buildSchema, addModelToTypegoose, ReturnModelType, modelOptions } from '@typegoose/typegoose';
import { model, Mongoose, HydratedDocument } from 'mongoose';

@modelOptions({ schemaOptions: { timestamps: { createdAt: true, updatedAt: true } } })
class App {
  @prop({ maxlength: 256, required: true })
  public name!: string;
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
