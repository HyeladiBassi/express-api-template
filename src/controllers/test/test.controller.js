import { generateToken } from '../../services/token.service';
import ApiError from '../../utils/ApiError';
import catchAsync from '../../utils/catchAsync';
import pick from '../../utils/pick';
import { success } from '../../utils/responseApi';

export const produce200 = catchAsync(async (req, res) => {
  res.send(success());
});

export const produce400 = catchAsync(async (req, res) => {
  throw new ApiError(400);
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
  const { email, password } = pick(req.body, ['email', 'password']);
  //   Login Logic
  const token = generateToken(email);
  res.send(success({ token: token }));
});

export const produceAuthRegister = catchAsync(async (req, res) => {
  const { email, password } = pick(req.body, ['email', 'password']);
  //   Login Logic
  const token = generateToken(email);
  res.send(success({ token: token }));
});
