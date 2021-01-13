module.exports.handler = (event, context, callback) => {
    console.log(event).body;
    callback(false, {
        statusCode: 200,
        body: "ok"
    });
}