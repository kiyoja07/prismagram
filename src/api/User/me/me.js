import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const userProfile = await prisma.user({ id: user.id }); // user 테이블에서 id가 user.id인 데이터를 1개 가져온다. Fetching single records
      const posts = await prisma.user({ id: user.id }).posts(); // user 테이블에서 id가 user.id인 데이터 1개의 모든 post를 가져온다. Fetch all the posts of a single user
      return {
        user: userProfile,
        posts,
      };
    },
  },
};
