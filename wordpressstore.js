var MongoClient = require('mongodb').MongoClient;

var insertDocument = function(db, data, callback) {
    var bv = db          .collection('blogsummary');


    bv.insertOne({
        PostTitle: data.PostTitle,
        PostUrl: data.PostUrl,
        PostPublished: data.PostPublished},
                 function(err,result) {
                     console.log('data inserted.');
                     callback();

                 });
};

module.exports = function(context, done) {
    console.log('incoming request... ');
  
    MongoClient.connect(context.data.MONGO_URL, function (err, db) {
        if(err) return done(err);

        console.log('saving to db...');

        insertDocument(db, context.data, function() {
            console.log('closing db connection');
            db.close();

            done(null, 'Success.');
        });

    });


};

