import mongoose from "mongoose";

export default async function connect() {
	try {
		await mongoose.connect(
			"mongodb+srv://conkgyt:Anhnam9ce@shopcluter.4kafh.mongodb.net/Shop_DB?retryWrites=true&w=majority",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
				useCreateIndex: true,
			}
		);
		console.log("Successful Connection!");
	} catch (error) {
		console.log("Fail Connection!");
	}
}
