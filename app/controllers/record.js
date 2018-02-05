module.exports = {
    getChatLogs,
    getChatLogsById,
    getChatLogsBySender,
    postChatLogs
}

async function getChatLogs(ctx){
	let chat_logs = await recordModel.getAllRecords();
	ctx.body = chat_logs;
}

async function getChatLogsById(ctx){
	let id = ctx.params.id;
	let chat_log = await recordModel.getRecordById(id);
	ctx.body = chat_log;
}

async function getChatLogsBySender(ctx){
	let id = ctx.params.id;
	let chat_logs = await recordModel.getRecordById(id);
	ctx.body = chat_logs;
}

async function postChatLogs(ctx) {
    
}






