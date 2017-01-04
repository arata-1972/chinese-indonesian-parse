// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
    databaseURI: databaseUri || 'mongodb://heroku_k1r47gcr:s43jhmssgsueanhjsevi92jifq@ds031965.mlab.com:31965/heroku_k1r47gcr',
    cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
    appId: process.env.APP_ID || 'gvjVVMjL4KI2ucyklbXb5Fcmukh4GMpkwlvVB7tT',
    masterKey: process.env.MASTER_KEY || 'aUkVULyhzhyQnhDGjEdrD7IXtyBYZz8tPHGdw7l6', //Add your master key here. Keep it secret!
    serverURL: process.env.SERVER_URL || 'https://english-tagalog-mongolian.herokuapp.com/parse', // Don't forget to change to https if needed
    liveQuery: {
        classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
    },
    // 以下為新增部分
    push: {
        // 此篇未提到 Android，因此註解掉
        // android: {
        //   senderId: '...',
        //   apiKey: '...'
        // },
        ios: [{
                pfx: __dirname + '/iPhoneP12/com.satoshogoChineseUzbek store.p12',
                bundleId: 'com.satoshogoChineseUzbek',
                production: true
            }, 
              {
                pfx: __dirname + '/iPhoneP12/com.satoshogoChineseKazakh store.p12',
                bundleId: 'com.satoshogoChineseKazakh',
                production: true
            }, 
              {
                pfx: __dirname + '/iPhoneP12/com.satoshogoChineseEstonian store.p12',
                bundleId: 'com.satoshogoChineseEstonian',
                production: true
            }, 
              {
                pfx: __dirname + '/iPhoneP12/com.satoshogoCinesePolish store.p12',
                bundleId: 'com.satoshogoCinesePolish',
                production: true
            }, 
              {
                pfx: __dirname + '/iPhoneP12/com.satoshogoChineseIndonesianEglish store.p12',
                bundleId: 'com.satoshogoChineseIndonesianEglish',
                production: true
            }, 
              {
                pfx: __dirname + '/iPhoneP12/com.satoshogoChineseSwdish store.p12',
                bundleId: 'com.satoshogoChineseSwdish',
                production: true
            }, 
               {//com.satoshogo.ChineseIndonesian.remake
                pfx: __dirname + '/iPhoneP12/com.satoshogo.ChineseIndonesian.remake store.p12',
                bundleId: 'com.satoshogo.ChineseIndonesian.remake',
                production: true
            }, 
              
             {
                pfx: __dirname + '/iPhoneP12/com.satoshogoCinesendoesian store.p12',
                bundleId: 'com.satoshogoCinesendoesian',
                production: true
            }
        ]
    },
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
