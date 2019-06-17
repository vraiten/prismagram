import "./env";

import passport from "passport";
import "./passport";

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

import {sendSecretMail} from "./utils"; 
import {authenticate, authenticateJwt} from "./passport";


// sendSecretMail ("cac.jpkim@gmail.com", "123");

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ 
	schema,
	context: ({ request}) => ({request})
});

// const server = new GraphQLServer({ typeDefs, resolvers });

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
//server.express.use(passport.authenticate("jwt"));


server.start({ port: PORT }, () =>
    console.log(`Server running on port on http://localhost:${PORT}`)
);
