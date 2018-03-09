const newsModel = require('../models/newsModel');

module.exports = {
    getNewsById,
    getNewsList,
    postNews,
    putNews
}

async function getNewsById(ctx) {
    let id = ctx.params.id;
    let news = await newsModel.findNewsById(id);
    ctx.body = news[0];
}

async function getNewsList(ctx) {
    let news = await newsModel.findAllNews();
	ctx.body = news;
}

async function postNews(ctx) {
    let datetime = new datetime();
    let input = [ctx.params.id, ctx.params.farm_id, datetime, ctx.params.title, ctx.params.description, ctx.params.image_url];
    let news = await newsModel.postNews(input);
}

async function putNews(ctx) {
    
}