module.exports = errHandle

function errHandle(ctx, err) {
    ctx.body = err.message
    ctx.status = err.status || 400
}