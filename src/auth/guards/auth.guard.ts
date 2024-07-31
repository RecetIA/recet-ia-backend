import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
	InternalServerErrorException,
} from '@nestjs/common';

import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtAdapter } from 'src/config/adapters';
import { User } from 'src/data/schemas/user.schema';

interface EmailResponse {
	email: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<User>,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();
		const authorization = request.headers['authorization'];
		console.log('Authorization:', authorization);

		if (!authorization) throw new UnauthorizedException('No token provided');

		if (!authorization.startsWith('Bearer '))
			throw new UnauthorizedException('Invalid Bearer token');

		const token = authorization.split(' ').at(1) || '';

		try {
			const payload = await JwtAdapter.validateToken<EmailResponse>(token);
			if (!payload) throw new UnauthorizedException('Invalid token');

			const user = await this.userModel.findOne({ email: payload.email });
			if (!user) throw new UnauthorizedException('Invalid token - user');

			(request as any).body.user = user;

			return true;
		} catch (error) {
			console.log(error);
			throw new InternalServerErrorException();
		}
	}
}
