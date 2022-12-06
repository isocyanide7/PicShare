import React from "react";
import UserList from "../Components/UserList/UserList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Nilesh Chandra",
      postCount: "1",
      image:
        "https://scontent.frdp4-1.fna.fbcdn.net/v/t39.30808-6/242842746_1239365226546351_8414520356236944090_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=rmJSadq5iccAX-U8yY9&tn=sOFkBB2hwp_dGN8H&_nc_ht=scontent.frdp4-1.fna&oh=00_AfAK998n-NeJC1IVF_2xEHJUjHuCBjSqk1VO2x23We73Gg&oe=6391F73A",
    },
    {
      id: "u2",
      name: "Misti Chandra",
      postCount: "1",
      image:
        "https://scontent.frdp4-1.fna.fbcdn.net/v/t39.30808-6/245515372_1251243848691822_7606620405833905839_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=730e14&_nc_ohc=OLFj3NiSHo8AX9zhedo&_nc_ht=scontent.frdp4-1.fna&oh=00_AfAjcu022rK3fPlnKdXsY9ELQS5uxT3OygAPjRUvqRWHHA&oe=63931A83",
    },
    {
      id: "u3",
      name: "Moly Chandra",
      postCount: "1",
      image:
        "https://scontent.frdp4-1.fna.fbcdn.net/v/t39.30808-6/310658276_1489536318195906_5132866141000348160_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=z26za139QjwAX87s0MR&_nc_ht=scontent.frdp4-1.fna&oh=00_AfCUF4j8Ybt8cANbRPlrNb5iOyZguah4O-B15J8MVYtpnA&oe=6392774B",
    },
    {
      id: "u4",
      name: "Nirmalendu Chandra",
      postCount: "1",
      image:
        "https://scontent.frdp4-1.fna.fbcdn.net/v/t1.6435-9/33491356_104142177143212_2011842864190849024_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=cGCuVx2wp4YAX_U1bF7&_nc_ht=scontent.frdp4-1.fna&oh=00_AfAyjYDsZ1yoSNKB4W33Mac6BAkTOgakTgAG6sYcEsxoaw&oe=63B4F784",
    }
  ];
  return <UserList items={USERS} />;
};

export default Users;
