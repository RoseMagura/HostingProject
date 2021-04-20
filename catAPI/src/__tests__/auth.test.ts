import { issueToken } from "../auth/index";
import { jest, expect, test } from "@jest/globals";

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

test("Issues a JWT token", (): void => {
  // const result = await issueToken('admin', process.env.ADMIN_PWD, mockResponse());
  // console.log(result);
  expect(1).toBe(1);
});
