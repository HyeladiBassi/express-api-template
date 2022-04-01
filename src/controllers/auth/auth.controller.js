import { generateToken } from '../../services/token.service';
import catchAsync from '../../utils/catchAsync';
import { success } from '../../utils/responseApi';
import pick from '../../utils/pick';

export const login = catchAsync(async (req, res) => {
  const { email } = pick(req.body, ['email', 'password']);
  //   Login Logic
  const token = generateToken(email);
  res.send(success({ token: token }));
});

export const register = catchAsync(async (req, res) => {
  const body = req.body;
  //   Register Logic
  const token = generateToken(body.email);
  res.send(success({ token: token }));
});
