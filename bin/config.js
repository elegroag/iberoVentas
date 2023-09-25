module.exports = {
	mongoURI: "mongodb://127.0.0.1:27017/iberoVentas",
	jwtOpt: {
		secretOrKey: "io898hhnioksn%682++*...9$",
		expiresIn: 7200,
		type: "Bearer",
		issuer: "iberoVentas.com.co",
		audience: "ibero.net"
	},
	corsOpt: {
		origin: "*",
		methods: ["GET", "PATCH", "PUT", "POST", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization", "Content-Length", "X-Requested-With", "X-HTTP-Method-Override"],
		optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
	}
};
