"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.signInUser = exports.signUpUser = void 0;
const index_js_1 = __importDefault(require("./index.js"));
const date_fns_1 = require("date-fns");
const auth_js_1 = require("../utils/auth.js");
const lodash_1 = require("lodash");
const authService_js_1 = require("../services/authService.js");
const signUpUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield (0, authService_js_1.userExists)(user.email))
            return { error: "A user with this email already exists" };
        const [firstName, lastName] = user.name.split(" ");
        const hashedPassword = (0, auth_js_1.hashPassword)(user.password);
        const [res] = yield index_js_1.default.execute("INSERT INTO users (firstName, lastName, email, password, role, signUpMethod, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)", [
            firstName,
            lastName || "",
            user.email,
            hashedPassword,
            user.role,
            user.signUpMethod,
            (0, date_fns_1.format)(new Date(), "yyyy-MM-dd HH:mm:ss"),
        ]);
        console.log("before create access token", user);
        const token = (0, auth_js_1.createAccessToken)(user);
        console.log("after create access token", token);
        return {
            user: Object.assign(Object.assign({}, (0, lodash_1.omit)(user, ["password", "confirmPassword"])), { token }),
        };
    }
    catch (error) {
        // TODO: add logging
        return { errors: [{ error: "Something went wrong..." }] };
    }
});
exports.signUpUser = signUpUser;
const signInUser = (email, pwd) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [usersWithEmail] = yield index_js_1.default.query("SELECT * FROM users WHERE email = ?", [email]);
        if (usersWithEmail.length !== 0)
            return { errors: [{ error: "Incorrect credentials" }] };
        const hashedPwd = (0, auth_js_1.hashPassword)(pwd);
        const [user] = yield index_js_1.default.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, hashedPwd]);
        if (user.length === 0)
            return { error: "Incorrect credentials" };
        if (user.length > 1)
            return { error: "wtf" }; // :D
        const token = (0, auth_js_1.createAccessToken)(Object.assign(Object.assign({}, user[0]), { name: user[0].firstName + " " + user[0].lastName }));
        return Object.assign(Object.assign({}, user), { token });
    }
    catch (error) {
        return { errors: [{ error: "Something went wrong" }] };
    }
});
exports.signInUser = signInUser;
const authenticateUser = (req, res, next) => {
    try {
        console.log(req.cookies);
        if (req.cookies.accessToken) {
            req.body.user = (0, auth_js_1.verifyJwt)(req.cookies.accessToken);
            next();
        }
        else {
            return res.status(400).json({ error: "No jwt provided" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
};
exports.authenticateUser = authenticateUser;
