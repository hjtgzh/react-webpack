import { defs as authorizationDefs, authorization } from './authorization';

import { defs as alibabaTestDefs, alibabaTest } from './alibabaTest';

(window as any).defs = {
  authorization: authorizationDefs,
  alibabaTest: alibabaTestDefs,
};
(window as any).API = {
  authorization,
  alibabaTest,
};
