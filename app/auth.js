const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
const db = require('./utils/database');
const config = require('../config');

function init(){
    const JwtStrategy = require('passport-jwt').Strategy,
          ExtractJwt = require('passport-jwt').ExtractJwt;

    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    opts.secretOrKey = config.JWT_SECRET_KEY;

    passport.use(new JwtStrategy(opts, async(jwt_payload, done)=>{
        console.log(jwt_payload);
        let input = [jwt_payload.id, jwt_payload.iat];
        let user = await db.query(`SELECT * FROM users WHERE active = 1 AND id = ? AND iat = ?`, input).catch((err)=>{
            return done(err);
        })
        if(!user[0])
            return done(null, false)
        else
            return done(null, {id: user[0].id, username: user[0].username, identity: user[0].identity});
    }));


    const CustomStrategy = require('passport-custom').Strategy
    passport.use('normal-login', new CustomStrategy(async (ctx, done)=>{
        let username = ctx.body.username;
        let password = ctx.body.password;
        console.log(ctx.body);
        if(!username || !password){
            return done(null, false)
        }
        let user = await db.query('SELECT * FROM users WHERE username = ?', username).catch((err)=>{
            return done(err);
        })
        if(!user[0] || user[0].password != password)
            return done(null, false)
        else
            return done(null, {id: user[0].id, username: user[0].username, identity: user[0].identity});
    }));
}

module.exports = {
    init
}