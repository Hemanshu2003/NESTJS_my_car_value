import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    // console.log(
    //   'curretn user decorator ',
    //   request.session.UserID,
    //   'this is sesion curruser : ',
    //   request.currentUser,
    // );
    return request.currentUser;
  },
);
