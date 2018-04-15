const newsModel = require('../models/newsModel');
module.exports = {
    getNewsById,
    getNewsList,
    postNews,
    putNews,
    deleteNews,
}

async function getNewsById(ctx) {
    let id = ctx.params.id;
    let news = await newsModel.findNewsById(id);
    ctx.body = news[0];
}

async function getNewsList(ctx) {
	let keyword = ctx.query.keyword || null;
	if(keyword)
		keyword = '%' + keyword + '%'
	else
		keyword = '%%'
    
    let news_list = await newsModel.findAllNews(keyword);
    let result_num = await newsModel.getSearchResult(keyword);
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

async function deleteNews(ctx){
    let id = ctx.params.id;
    await newsModel.deleteNews(id);
    ctx.body = { success: "succes" }
}