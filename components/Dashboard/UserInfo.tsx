interface UserInfoProps {
  user: {
    name: string;
    email: string;
  };
}

const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <section>
      <h1 className="text-4xl font-bold">Welcome, {user.name}</h1>
    </section>
  );
};

export default UserInfo;
