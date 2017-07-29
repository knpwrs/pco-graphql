import test from 'ava';
import { encrypt, decrypt } from './crypto';

test('encrypt and decrypt', (t) => {
  const key = 'pass';
  const message = 'thequickbrownfoxjumpsoverthelazykeyboardcat';
  const encrypted = encrypt(message, key);
  t.not(encrypted, message);
  const decrypted = decrypt(encrypted, key);
  t.is(decrypted, message);
});
