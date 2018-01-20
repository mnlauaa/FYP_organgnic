const passport = require('koa-passport');
const db = require('./utils/database')

function init(){
    const CustomStrategy = require('passport-custom').Strategy
    passport.use('normal-login', new CustomStrategy((ctx, done)=>{
        let username = ctx.body.username;
        let password = ctx.body.password;
        let identity = ctx.body.identity;

        //not input identity to query(?identity=buyers / ?identity=sellers)
        if(!identity){
            let err = new Error('identity missing');
            err.status = 400;
            throw err;
        }

        return db.query("SELECT * FROM ?? WHERE username = ?", [identity, username]).then((user)=>{
            if(!user[0] || user[0].password != password){
                return done(null, false)
            }
            else{
                return done(null, {id: user[0].id, username: user[0].username});
            }
        })
        .catch((err)=>{
            return done(err.message, false);
        })
    }));
}

module.exports = {
    init
}