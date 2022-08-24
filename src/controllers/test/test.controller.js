import { generateToken } from '../../services/token.service';
import { ApiError, catchAsync, success } from '../../utils';

export const produce200 = catchAsync(async (req, res) => {
  res.send(success());
});

export const produce400 = catchAsync(async (req, res) => {
  throw new ApiError(400, req.t('notFound'));
});

export const produce401 = catchAsync(async (req, res) => {
  throw new ApiError(401);
});

export const produce403 = catchAsync(async (req, res) => {
  throw new ApiError(403);
});

export const produce404 = catchAsync(async (req, res) => {
  throw new ApiError(404);
});

export const produce500 = catchAsync(async (req, res) => {
  throw new ApiError(500);
});

export const produceAuthLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  //   Login Logic
  const token = generateToken(email);
  res.send(success({ token: token }));
});

export const produceAuthRegister = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  //   Login Logic
  const token = generateToken(email);
  res.send(success({ token: token }));
});
