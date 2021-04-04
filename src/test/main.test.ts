import resoureController from '../controller/resource';

describe('main.test', () => {
  it('updateRemoteApiTest controller success test', async () => {
    const response = await resoureController.updateRemoteApiTest();
    expect(response).toBeDefined();

    if (response) {
      const responseData = response.data;
      expect(response.status).toBe(200);
      expect(responseData).toBeDefined();

      const count = resoureController.getCount();
      const count2 = resoureController.getCount2();
      expect(count).toBe(0);
      expect(count2).toBe(0);
    }
  });

  // it('updateRemoteApiTest controller fail test', async () => {
  //   const response = await resoureController.updateRemoteApiTest();
  //   expect(response).toBeDefined();

  //   if (response) {
  //     const count = resoureController.getCount();
  //     const count2 = resoureController.getCount2();
  //     expect(count > 0).toBeTruthy();
  //     expect(count2 > 0).toBeTruthy();
  //   }
  // });
});
