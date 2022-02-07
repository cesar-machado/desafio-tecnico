import Realm from 'realm';

import {TaskSchema} from '../db/Schema';

export function getRealm() {
  return Realm.open({
    schema: [TaskSchema],
    schemaVersion: 3,
  });
}
