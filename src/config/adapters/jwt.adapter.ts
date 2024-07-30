import { sign, verify } from 'jsonwebtoken';
import { envs } from '../envs';

const JWT_SEED = envs.JWT_SEED;
export class JwtAdapter {
	static async generateToken(
		payload: any,
		duration: string = '1d',
	): Promise<string> {
		return new Promise((resolve, reject) => {
			sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
				if (err) {
					console.error('Error generating token:', err);
					return reject(err);
				}
				resolve(token);
			});
		});
	}

	static async validateToken<T>(token: string): Promise<T | null> {
		return new Promise((resolve, reject) => {
			verify(token, JWT_SEED, (err, decoded) => {
				if (err) {
					console.error('Error validating token:', err);
					return reject(err);
				}
				resolve(decoded as T);
			});
		});
	}
}
