const newsModel = require('../models/newsModel');
const userModel = require('../models/userModel');
const config = require('../../config');

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
    let id = ctx.state.user.id;
    let news_id = ctx.params.id;
    let result = await userModel.findFarmById(id);
    let farm_id = result[0].farm_id;
    let now = new Date(); 
    let news_imgae_url = null;
    
    if(ctx.req.file)
        news_imgae_urlconfig.SERVER.IP + 'news/' + ctx.req.file.filename;
    
    let news_parms = [
        farm_id,
        ctx.req.body.title,
        ctx.req.body.description,
        now,
    ]
    let news = await newsModel.postNews(news_parms, news_imgae_url);
    ctx.body = {success: news};
}

async function putNews(ctx) {
    let id = ctx.state.user.id;
    let news_id = ctx.params.id;
    let result = await userModel.findFarmById(id);
    let farm_id = result[0].farm_id;
    let now = new Date(); 
    let news_imgae_url = null;

    if(ctx.req.file)
        news_imgae_url = config.SERVER.IP + 'news/' +ctx.req.file.filename;

    let news_parms =[
        ctx.req.body.title,
        ctx.req.body.description
    ]
    news_parms.push(now);
    let update_news = await newsModel.putNews(news_parms, news_imgae_url, news_id, farm_id);
    ctx.body = {success: update_news};
}

async function deleteNews(ctx){
    console.log('hello');
    let news_id = ctx.params.id;
    await newsModel.delNews(news_id);
    ctx.body = { success: "succes" }
}