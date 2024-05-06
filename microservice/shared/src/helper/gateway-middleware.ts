import { Request, Response, NextFunction } from 'express';
import { InternalServerErrorException, UnauthorizedException, BadRequestException } from "./error-handler"
import jwt from "jsonwebtoken"

interface Payload {
  id: string;
}

const tokens: string[] = ['auth', 'seller', 'gig', 'search', 'buyer', 'message', 'order', 'review'];

export const validateGatewayRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.headers?.gatewayToken) {
      throw new UnauthorizedException("Invalid request", "validateGatewayRequest(): Request didn't come from api gateway");
    }

    const gatewayToken: string = req.headers?.gatewayToken as string;
    const decodedToken: Payload = jwt.verify(gatewayToken, "06a4217820be9650404f6c7765661002") as Payload;

    if (Object.keys(decodedToken).length || !decodedToken) {
      throw new BadRequestException('Invalid token', "validateGatewayRequest(): Couldn't verify token");
    }
    if (!tokens.includes(decodedToken.id)) {
      throw new UnauthorizedException("Invalid request", "validateGatewayRequest(): Request didn't come from api gateway");
    }
    next();
  } catch (error: any) {
    throw new InternalServerErrorException("Something went wrong while validating request", `validateGatewayRequest(): ${error.message}`);
  }
};
