import type { NextApiRequest, NextApiResponse } from "next";
import { getToken, encode } from "next-auth/jwt";
import { gql } from "@apollo/client";
import client from "../../apollo-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  if (!token) return res.status(400).json({ message: "jwt is none" });
  const secret: string = process.env.NEXTAUTH_SECRET ?? "";
  if (secret === "") return res.status(500).json({ message: "token error" });
  const jwtEncoded: string = await encode({ token, secret });
  const users = await getUsers(jwtEncoded).catch((e) => {
    console.error(e);
    return res.status(500).json({ message: e });
  });
  res.status(200).json({ users });
}

async function getUsers(token: string) {
  const query = gql`
    query {
      users {
        id
        name
      }
    }
  `;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { data } = await client.query({
    query,
    context: { headers },
  });
  return data.users;
}
