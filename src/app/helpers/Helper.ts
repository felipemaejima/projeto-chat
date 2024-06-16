import Security from "../../infrastructure/security/Security";

export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}
export async function checkToken(token: string | null): Promise<boolean> {
	if (!token) return false;

	const sessionToken = token?.split(" ")[1];
	const isValidToken = await Security.verifyTokenValidity(sessionToken);

	return isValidToken ? true : false;
}
