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
    // let news = await newsModel.findAllNews();
    // ctx.body = news;
	let keyword = ctx.query.keyword || null;
    console.log(ctx.query.keyword);
	if(keyword)
		keyword = '%' + keyword + '%'
	else
		keyword = '%%'
    
    console.log(keyword);
    let news_list = await newsModel.findAllNews(keyword);
    let result_num = await newsModel.getSearchResult(keyword);
    console.log(news_list);
    ctx.body = {news_list: news_list, result_num:result_num[0].num};
}

async function postNews(ctx) {
    let datetime = new Date();
    let input = [
        ctx.request.body.farm_id, 
        datetime, 
        ctx.request.body.title, 
        ctx.request.body.description, 
        ctx.request.body.image_url
    ];
    let news = await newsModel.postNews(input);
}

async function putNews(ctx) {
    
}