import { MongoMemoryServer} from 'mongodb-memory-server';

let mongo: MongoMemoryServer;
let uri: string;

export const createMemoryServer = async (): Promise<{ getUrl: () => string, mongo: MongoMemoryServer }> => {
  mongo = await MongoMemoryServer.create();

  return {
    mongo,
    getUrl: () => {
      if (!uri) {
        uri = mongo.getUri();
        return uri;
      }
      return uri;
    }
  }
};
