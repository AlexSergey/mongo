import { createDatabase } from './database';
import { createAppModel } from './app.model';
import { Error } from 'mongoose';

const connectionString = 'mongodb://localhost:27999/test-database?retryWrites=true&w=majority';


const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

const handleValidationError = (err: Error.ValidationError | Error) => {
  let errors = []
  if (err instanceof Error.ValidationError) {
    errors = Object.values(err.errors).map(e => e.message);
  } else {
    errors = [err.message];
  }
  const errorMessages = errors.filter(onlyUnique);
  return errorMessages.join(', ');
}

const init = async () => {
  const mongoose = await createDatabase(connectionString, {
    authSource: 'admin',
    user: 'admin',
    pass: 'admin'
  }).connect();
  const AppModel = createAppModel(mongoose);
  try {
    await AppModel.create({
      name: 'test app 2',
      env: 'test',
      url: 'test'
    });
  } catch (e) {
    const err = handleValidationError(e);
    console.log(err);
  }
}
init();
