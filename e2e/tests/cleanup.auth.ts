import { test as teardown } from '@playwright/test';
import { readFile, writeFile } from 'fs/promises';

const AuthFile = "auth.json";

teardown('Cleanup the auth file', async ({ }) => {
  const authContent = await readFile(AuthFile, 'utf-8');
  const auth = JSON.parse(authContent);
  delete auth.origins;
  await writeFile(AuthFile, JSON.stringify(auth, null, 2), 'utf-8');
});