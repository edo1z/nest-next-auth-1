import { gql } from "@apollo/client";
import client from "../apollo-client";
import {signIn, signOut, useSession} from 'next-auth/react'

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
  const {data:session, status} = useSession();
  const loading = status === 'loading';
  console.log('users???', users);

  return (
    <div>
      <h3>HOGE</h3>
      {loading && <p>Loading...</p>}
      {!loading && !session && (
        <>
          <button onClick={e => signIn()}>SignIN</button><br/>
        </>
      )}
       {!loading && session && (
        <>
          <button onClick={e => signOut()}>SignOUT</button>
        </>
      )}
    </div>
  );
}
