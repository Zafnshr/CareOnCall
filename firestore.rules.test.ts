import { assertFails, assertSucceeds, initializeTestEnvironment, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import * as fs from 'fs';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'demo-careoncall',
    firestore: {
      rules: fs.readFileSync('DRAFT_firestore.rules', 'utf8'),
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

describe('Avatars Rules', () => {
  it('allows anyone to read avatars', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    await assertSucceeds(db.collection('avatars').doc('kareem').get());
  });

  it('denies unauthenticated users from writing avatars', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    await assertFails(db.collection('avatars').doc('kareem').set({ photoData: 'abc', updatedAt: testEnv.firestore.FieldValue.serverTimestamp() }));
  });

  it('allows verified users to update avatars', async () => {
    const db = testEnv.authenticatedContext('user1', { email_verified: true }).firestore();
    await assertSucceeds(db.collection('avatars').doc('kareem').set({ photoData: 'abc', updatedAt: testEnv.firestore.FieldValue.serverTimestamp() }));
  });

  it('denies unverified users from writing', async () => {
    const db = testEnv.authenticatedContext('user1', { email_verified: false }).firestore();
    await assertFails(db.collection('avatars').doc('kareem').set({ photoData: 'abc', updatedAt: testEnv.firestore.FieldValue.serverTimestamp() }));
  });
});
