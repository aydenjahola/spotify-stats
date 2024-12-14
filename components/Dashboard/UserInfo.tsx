interface UserInfoProps {
  user: {
    name: string;
    email: string;
  };
}

export default function UserInfo({ user }: UserInfoProps) {
  return (
    <section className="text-center py-8">
      <h1 className="text-5xl font-bold">
        <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Welcome
        </span>
        , {user.name}
      </h1>
    </section>
  );
}
