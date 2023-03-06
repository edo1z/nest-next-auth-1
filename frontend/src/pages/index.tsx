import { gql } from "@apollo/client";
import client from "../apollo-client";

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        users {
          id
          name
        }
      }
    `,
  });
  return {
    props: {
      users: data.users,
    },
  };
}

export default function Index({ users }: any) {
  console.log(users);
  return (
    <div>
      hello world!
    </div>
  );
}
