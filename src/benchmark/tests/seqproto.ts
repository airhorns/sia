import { fiveThousandUsers } from "./common.js";
import { createSer, createDes } from "seqproto";

const ser = createSer();

export const seqprotoFiveThousandUsers = () => {
  ser.reset();
  ser.serializeArray(fiveThousandUsers, (ser, user) => {
    ser.serializeString(user.userId);
    ser.serializeString(user.username);
    ser.serializeString(user.email);
    ser.serializeString(user.avatar);
    ser.serializeString(user.password);
    ser.serializeUInt32(user.birthdate.getTime());
    ser.serializeUInt32(user.registeredAt.getTime());
  });
  return ser.getBuffer();
};

const encoded = seqprotoFiveThousandUsers();

export const seqprotoFiveThousandUsersDecode = () => {
  const des = createDes(encoded);
  return des.deserializeArray((des) => ({
    userId: des.deserializeString(),
    username: des.deserializeString(),
    email: des.deserializeString(),
    avatar: des.deserializeString(),
    password: des.deserializeString(),
    birthdate: new Date(des.deserializeUInt32()),
    registeredAt: new Date(des.deserializeUInt32()),
  }));
};
