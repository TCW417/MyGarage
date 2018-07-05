import 'babel-polyfill';
import faker from 'faker';
import { createAccountMockPromise } from './account-mock';
import Image from '../../model/image';
import Account from '../../model/account';

const createImageMockPromise = async () => {
  const mockData = {};
  // mockAcctResponse will equal:
  /*
    {
      originalRequest: {},
      token: some token,
      account: { mongDb account}
    }
  */
  const mockAcctResponse = await createAccountMockPromise();
  // console.log(mockAcctResponse, 'inside async await');
  mockData.account = mockAcctResponse.account;
  mockData.token = mockAcctResponse.token;
  const image = await new Image({
    title: faker.lorem.words(2),
    url: faker.random.image(),
    fileName: faker.system.fileName(),
    accountId: mockData.account._id,
  }).save();
  // console.log(COVER, cover);
  mockData.image = image;
  return mockData;
};

const removeImagesAndAccounts = () => {
  return Promise.all([
    Image.remove({}),
    Account.remove({}),
  ]);
};


export { createImageMockPromise, removeImagesAndAccounts };
