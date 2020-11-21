# Computes.io functions

This NPM module allows developers to easily add common supercomputer functions to their computes.io apps.

## Getting Started

> npm install functions

> var functions = require("functions");

## How to use functions

> functions.list

returns: [ 'sentiment', 'md5cracker', "nextprime" ]

> functions.sentiment

returns: sentiment function

> functions.md5cracker

returns: MD5 cracker function

> functions.nextprime

returns: Next Prime function


## Computes.io Example

```
var computes = require("computes");
var functions = require("functions");

var options = {
  domain: "{{user.domainKey}}",
  priority: "normal",  //'low', 'normal' & 'high'
  ttl: 60000,  // milliseconds
  delay: 0 //milliseconds
}

var job = computes.connect();

job.on("ready", function (){
  var data = "i love skynet";
  job.compute(functions.sentiment, data, options);
});

job.on("result", function (result){
  console.log(result);
  job.disconnect();
});
```
