import { fiveThousandUsers } from "./common.js";
import * as Fury from '@furyjs/fury';
import { Type } from '@furyjs/fury';

const user = Type.object('example.user', {
  userId: Type.string(),
  username: Type.string(),
  email: Type.string(),
  avatar: Type.string(),
  password: Type.string(),
  birthdate: Type.timestamp(),
  registeredAt: Type.timestamp(),
});

// use an object container as fury doesn't support top level arrays
const userContainer = Type.object('example.container', {
    users: Type.array(user),
});

const fury = new Fury.default.default();
fury.registerSerializer(user);
const { serialize: serializeUserContainer, deserialize: deserializeUserContainer } = fury.registerSerializer(userContainer);

export const furyFiveThousandUsers = () => serializeUserContainer({users: fiveThousandUsers as any});

const encoded = furyFiveThousandUsers();

export const furyFiveThousandUsersDecode = () => deserializeUserContainer(encoded);
