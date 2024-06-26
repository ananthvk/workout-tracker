import { FastifyInstance } from "fastify";
import validator from "validator";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import { StatusError, PostgresError, POSTGRES_EEXISTS } from "./utils.js";

const options = {
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
};

zxcvbnOptions.setOptions(options);

const maxPasswordLength = 72;
const minPasswordLength = 8;

// Accept passwords which score >= this value
const PASSWORD_THRESHOLD = 3;

interface User {
  id: string;
  email: string;
  is_admin: boolean;
}

interface AuthTokenDecoded {
  id: string;
  is_admin: boolean;
}

// This function returns the user specified by the ID
const getUserById = async (
  fastify: FastifyInstance,
  id: string,
): Promise<User> => {
  const { rows, rowCount } = await fastify.pg.query(
    "SELECT id, email, is_admin FROM Usr WHERE id=$1;",
    [id],
  );
  if (rowCount == 0) {
    // The user was not found
    const err = new StatusError("User not found");
    err.statusCode = 404;
    throw err;
  }
  return {
    id: rows[0].id,
    email: rows[0].email,
    is_admin: rows[0].is_admin,
  };
};

// This functions adds an user to the database
const createUser = async (
  fastify: FastifyInstance,
  email: string,
  password: string,
): Promise<User> => {
  // Validate email and password to check if they are valid before inserting into database
  if (!validator.isEmail(email)) {
    const e = new StatusError("Invalid email id");
    e.statusCode = 400;
    throw e;
  }
  if (password.length > maxPasswordLength) {
    const e = new StatusError("Password too long");
    e.statusCode = 400;
    throw e;
  }
  if (
    !validator.isStrongPassword(password, {
      minLength: minPasswordLength,
      minSymbols: 0,
      minUppercase: 0,
    })
  ) {
    const e = new StatusError(
      `Password does not meet minimum requirements: at least one lowercase, number and minimum length ${minPasswordLength}`,
    );
    e.statusCode = 400;
    throw e;
  }
  const passwordStrength = zxcvbn(password);
  if (passwordStrength.score < PASSWORD_THRESHOLD) {
    const e = new StatusError(
      passwordStrength.feedback.warning ||
        "Your password is weak, use a better password",
    );
    e.statusCode = 400;
    throw e;
  }

  try {
    const { rows } = await fastify.pg.query(
      "INSERT INTO Usr (email, password) VALUES ($1, $2) RETURNING id",
      [email, await fastify.hash(password)],
    );
    return {
      id: rows[0].id,
      email: email,
      is_admin: false,
    };
  } catch (err) {
    const e = new StatusError();
    e.statusCode = 400;
    e.message = "Error while creating user";
    if ((err as PostgresError).code === POSTGRES_EEXISTS) {
      e.message = "Email has already been registered";
    }
    throw e;
  }
};

// Verifies if the email and password are correct
const verifyUser = async (
  fastify: FastifyInstance,
  email: string,
  password: string,
): Promise<User> => {
  // Do not hit the db if the email is invalid
  if (!validator.isEmail(email)) {
    const e = new StatusError("Invalid email/password");
    e.statusCode = 401;
    throw e;
  }
  if (
    password.length > maxPasswordLength ||
    !validator.isStrongPassword(password, {
      minLength: minPasswordLength,
      minSymbols: 0,
      minUppercase: 0,
    })
  ) {
    const e = new StatusError("Invalid email/password");
    e.statusCode = 401;
    throw e;
  }
  const { rows, rowCount } = await fastify.pg.query(
    "SELECT id, password, is_admin FROM Usr WHERE email=$1;",
    [email],
  );
  if (rowCount == 0 || !(await fastify.check(password, rows[0].password))) {
    const err = new StatusError("Invalid email/password");
    err.statusCode = 401;
    throw err;
  }
  return {
    id: rows[0].id,
    email: email,
    is_admin: rows[0].is_admin,
  };
};

export { getUserById, createUser, verifyUser };
export type { AuthTokenDecoded };
