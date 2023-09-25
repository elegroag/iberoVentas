

module.exports = {
	port: (val) => {
		var port = parseInt(val, 10);
		if (isNaN(port)) {
			return val;
		}
		if (port >= 0) {
			return port;
		}
		return false;
	},
	mongoURI: "mongodb://127.0.0.1:27017/iberoVentas",
	jwtOpt: {
		secretOrKey: "io898hhnioksn%682++*...9$",
		expiresIn: 120,
		type: "Bearer",
		issuer: "iberoVentas.com.co",
		audience: "ibero.net"
	},
	corsOpt: {
		origin: "*",
		methods: "GET,PATCH,PUT,POST,DELETE",
		allowedHeaders: ["Content-Type", "Authorization", "Content-Length", "X-Requested-With", "X-HTTP-Method-Override"]
	}
};
