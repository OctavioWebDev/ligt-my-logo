import { randomBytes } from 'node:crypto';
import type { RequestDeps } from './createRequest';
import { sendCustomerConfirmation, sendOwnerNotification } from './email';
import { countRecentByIp, insertRequest, nextRef, setEmailError } from './requestStore';
import { uploadRequestFile } from './storage';

export const defaultDeps: RequestDeps = {
  nextRef,
  insertRequest,
  countRecentByIp,
  setEmailError,
  uploadFile: uploadRequestFile,
  notifyOwner: sendOwnerNotification,
  confirmCustomer: sendCustomerConfirmation,
  now: () => new Date(),
  newToken: () => randomBytes(16).toString('base64url'),
};
