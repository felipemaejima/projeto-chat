import { Sequelize } from "sequelize";
import config from "../../../config";

export default class DatabaseConnection {
	private readonly dbInstance: Sequelize;

	public constructor() {
		this.dbInstance = new Sequelize(
			`mysql://${config.dbUser}:${config.dbPass}@${config.dbHost}:3306/${config.dbName}`
		);
	}

	public async connect(): Promise<void> {
		try {
			await this.dbInstance.authenticate();
			console.log("Conexão estabelecida com sucesso.");

			await this.dbInstance.sync();
			console.log("Modelos sincronizados.");
		} catch (err) {
			console.error("Erro ao conectar ou sincronizar modelos:", err);
		}
	}

	public async closeConnection(): Promise<void> {
		try {
			await this.dbInstance.close();
		} catch (err) {
			console.error("Erro ao fechar a conexão:", err);
		}
	}

	public get getInstance(): Sequelize {
		return this.dbInstance;
	}

}
