import { hash, compare } from 'bcrypt';

import { BCRYPT_SALT } from '../../environments';

/**
 * Returns hashed password by hash password.
 *
 * @remarks
 * This method is part of the {@link utils/password}.
 *
 * @param password - 1st input number
 * @returns The hashed password mean of `password`
 *
 * @beta
 */
export const hashInput = async (input: string): Promise<string> => {
  return await hash(input, BCRYPT_SALT);
};

/**
 * Returns boolean by compare password.
 *
 * @remarks
 * This method is part of the {@link utils/password}.
 *
 * @param password - 1st input number
 * @param hash - The second input number
 * @returns The boolean mean of `password` and `hash`
 *
 * @beta
 */
export const compareInput = async (
  input: string,
  hash: string,
): Promise<boolean> => {
  return await compare(input, hash);
};
