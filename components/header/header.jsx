import Navbar from "./navbar";
import UserDefaultValueSetter from "./UserDefaultValueSetter";
import { getServerSession } from "next-auth";

//get userData from DB
const getData = async (mail) => {
  const data = await fetch(`${process.env.SERVER_URL}/api/users/header`, {
    cache: "no-store",
    headers: {
      email: mail,
    },
  });
  return data.json();
};

const Header = async () => {
  const session = await getServerSession()
  const data = await getData(session?.user?.email);
  return (
    <header className="bg-zinc-900">
      <Navbar />
      <UserDefaultValueSetter setter={data} />
    </header>
  );
};

export default Header;
