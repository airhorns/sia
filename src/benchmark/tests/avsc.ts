import { fiveThousandUsers } from "./common.js";
import avro from 'avsc';

/**
 * Custom logical type used to encode native Date objects as longs.
 */
class DateType extends avro.types.LogicalType {
    _fromValue(val: any) {
      return new Date(val);
    }
    _toValue(date: any) {
      return date instanceof Date ? +date : undefined;
    }
    _resolve(type: any) {
      if (avro.Type.isType(type, 'long', 'string', 'logical:timestamp-millis')) {
        return this._fromValue;
      }
    }
  }

const user = avro.Type.forSchema({
    type: 'record',
    name: 'User',
    fields: [
        { name: 'userId', type: 'string' },
        { name: 'username', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'avatar', type: 'string' },
        { name: 'password', type: 'string' },
        { name: 'birthdate', type: {type: 'long', logicalType: 'timestamp-millis' } },
        { name: 'registeredAt', type: {type: 'long', logicalType: 'timestamp-millis' } }
      ]
  },
  {logicalTypes: {'timestamp-millis': DateType}}
);

const userArray = avro.Type.forSchema({
    type: 'array',
    items: user
});

export const avscFiveThousandUsers = () => userArray.toBuffer(fiveThousandUsers);

const encoded = avscFiveThousandUsers();

export const avscFiveThousandUsersDecode = () => userArray.fromBuffer(encoded);
