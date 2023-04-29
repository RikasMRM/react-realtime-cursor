import a from "./a.png";
import b from "./b.png";
import c from "./c.png";
import d from "./d.png";

const userIcons: Record<string, string> & {
  user1: string;
  user2: string;
  user3: string;
  user4: string;
} = {
  user1: a,
  user2: b,
  user3: c,
  user4: d,
};

export default userIcons;