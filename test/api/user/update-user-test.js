let should;
let agent;
let mockData;

before(() => {
  should = require('should');
  agent = require('test/lib/agent');
  mockData = require('test/lib/mock-data');
});

describe('api', () => {
  describe('user', () => {
    describe('update permissions', () => {
      let userA, userB;
      let authA, authB;

      before(async () => {
        // Create User A
        const emailA = `${mockData.uuid()}@test.com`;
        const passwordA = mockData.uuid();
        userA = await mockData.mockAuthAndUser({
          email: emailA,
          password: await mockData.hash(passwordA),
        });
        authA = await agent.client().post('/auth/login').send({ email: emailA, password: passwordA }).expect(200).promise();

        // Create User B
        const emailB = `${mockData.uuid()}@test.com`;
        const passwordB = mockData.uuid();
        userB = await mockData.mockAuthAndUser({
          email: emailB,
          password: await mockData.hash(passwordB),
        });
        authB = await agent.client().post('/auth/login').send({ email: emailB, password: passwordB }).expect(200).promise();
      });

      it('should not allow userA to update userB\'s data', async () => {
        const update = { email: 'unauthorized@attempt.com' };

        await agent
          .client(authA.auth)
          .put(`/dev/user/${authB.user.id}`)
          .send(update)
          .expect(403)
          .promise();
      });

      it('should allow userB to update their own data', async () => {
        const update = { email: 'updated_b@example.com' };

        const { body: updatedUser } = await agent
          .client(authB.auth)
          .put(`/dev/user/${authB.user.id}`)
          .send(update)
          .expect(200)
          .promise();

        should.exist(updatedUser);
        updatedUser.email.should.equal(update.email);
      });
    });
  });
});
