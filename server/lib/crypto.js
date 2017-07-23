import crypto from 'crypto';

const algorithm = 'AES-256-CTR';

export const encrypt = (input, key) => {
  const cipher = crypto.createCipher(algorithm, key);
  let output = cipher.update(input, 'utf8', 'hex');
  output += cipher.final('hex');
  return output;
};

export const decrypt = (input, key) => {
  const decipher = crypto.createDecipher(algorithm, key);
  let output = decipher.update(input, 'hex', 'utf8');
  output += decipher.final('utf8');
  return output;
};
