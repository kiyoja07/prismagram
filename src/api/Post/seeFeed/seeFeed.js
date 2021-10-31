import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFeed: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const following = await prisma.user({ id: user.id }).following(); // user.id가 following하는 user list를 가져옴.
      return prisma.posts({
        where: {
          user: {
            id_in: [...following.map((user) => user.id), user.id], // following user list와 나의 user.id의 post를 가져옴.
          },
        },
        orderBy: "createdAt_DESC", // 최신순 적용
      });
    },
  },
};
