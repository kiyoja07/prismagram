export const isAuthenticated = (request) => {
  if (!request.user) {
    throw Error("You need to log in to perform this action");
  }
  return;
};

// {"Authorization": "Bearer 토큰"} 을 http header창에 넣기
