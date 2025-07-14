import { UserSchema } from "../../src/models/UserSchema";
import { SaveUser } from "../../src/models/SaveUserSchema";

export const UsersMockPlaceHolder: UserSchema | SaveUser = {
  name: "Jean Pierre",
  username: "jeanp",
  email: "jean@example.com",
  address: {
    street: "Main St",
    suite: "Apt. 101",
    city: "Quito",
    zipcode: "170123",
    geo: {
      lat: "-0.1807",
      lng: "-78.4678",
    },
  },
  phone: "123-456-7890",
  website: "jean.dev",
  company: {
    name: "OpenAI",
    catchPhrase: "AI for everyone",
    bs: "deep learning research",
  },
};
